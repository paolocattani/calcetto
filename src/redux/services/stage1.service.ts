import { eventChannel, END, buffers } from 'redux-saga';
import { SessionStatus, Message } from './auth.service';
import {
  FetchStage1Request,
  FetchStage1Response,
  UpdateCellRequest,
  UpdateCellResponse,
  UpdatePlacementRequest,
  UpdatePlacementResponse,
} from '../../@common/models';
import { rowsGenerator } from '../../components/Stage1/helper';
import { postWrapper, putWrapper } from '../../@common/utils/fetch.utils';

export const fetchStage1 = async ({ pairsList, stageName }: FetchStage1Request) =>
  postWrapper<FetchStage1Request, FetchStage1Response>('/api/v1/stage1', {
    // FIXME:
    rows: rowsGenerator(pairsList),
    stageName,
    pairsList,
  });

export const updatePlacement = async (request: UpdatePlacementRequest): Promise<UpdatePlacementResponse> =>
  putWrapper<UpdatePlacementRequest, UpdatePlacementResponse>('/api/v1/stage1/update/placement', request);

export const updateCellStage1 = async (request: UpdateCellRequest): Promise<UpdateCellResponse> =>
  putWrapper<UpdateCellRequest, UpdateCellResponse>('/api/v1/stage1/update/cell', request);

export const createStage1Channel = (channel: EventSource) =>
  eventChannel<Message>((emitter) => {
    // Listen for open channel
    const openListener = (event: Event) => console.log('Stage1 Channel is now open.');

    // Listen for new message
    const messageListener = (messageEvent: MessageEvent) => {
      if (messageEvent) {
        const message = JSON.parse(messageEvent.data) as Message;
        if (message.status === SessionStatus.NEED_REFRESH) {
          emitter(message);
          closeConnection();
        }
      }
    };
    // Listen for error
    const errorListener = (event: Event) => {
      console.error('An Error Occur: ', event);
      emitter(END);
      closeConnection();
    };
    channel.addEventListener('open', openListener);
    channel.addEventListener('message', messageListener);
    channel.addEventListener('error', errorListener);
    // Cleanup function
    const closeConnection = () => {
      channel.removeEventListener('open', openListener);
      channel.removeEventListener('message', messageListener);
      channel.removeEventListener('error', errorListener);
      channel.close();
    };
    return closeConnection;
  }, buffers.expanding());
