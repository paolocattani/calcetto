import { eventChannel, END, buffers } from 'redux-saga';
import { SessionStatus, Message } from './session.service';
import {
  FetchStage1Request,
  FetchStage1Response,
  UpdateCellRequest,
  UpdateCellResponse,
  UpdatePlacementRequest,
  UpdateSelectedPairsRequest,
} from '../../@common/models';
import { rowsGenerator } from '../../components/Stage1/helper';
import { DEFAULT_HEADERS } from '../../@common/utils/fetch.utils';

export const fetchStage1 = async ({ pairsList, stageName }: FetchStage1Request): Promise<FetchStage1Response> => {
  try {
    const template = rowsGenerator(pairsList);
    const response = await fetch('/api/v1/stage1', {
      method: 'POST',
      ...DEFAULT_HEADERS,
      body: JSON.stringify({ rows: template, stageName }),
    });
    const rows = await response.json();
    return { pairsList, stageName, rows };
  } catch (e) {
    return { pairsList, stageName, rows: [] };
  }
};

export const updatePlacement = async ({ rows }: UpdatePlacementRequest): Promise<void> => {
  try {
    const response = await fetch('/api/v1/stage1/placement', {
      method: 'POST',
      ...DEFAULT_HEADERS,
      body: JSON.stringify({ rows }),
    });
    await response.json();
  } catch (e) {
    console.error('Error stage1 update placement');
  }
};

export const updateSelectedPairs = async ({ rows, stageName }: UpdateSelectedPairsRequest): Promise<void> => {
  try {
    const response = await fetch('/api/v1/pair/selected', {
      method: 'PUT',
      ...DEFAULT_HEADERS,
      body: JSON.stringify({ pairs: rows.map((e) => e.pair), stage1Name: stageName }),
    });
    await response.json();
  } catch (e) {
    console.error('Error stage1 update selections');
  }
};

export const updateCellStage1 = async (model: UpdateCellRequest): Promise<UpdateCellResponse> => {
  try {
    const response = await fetch('/api/v1/stage1/cell', {
      method: 'POST',
      ...DEFAULT_HEADERS,
      body: JSON.stringify(model),
    });
    await response.json();
    return {};
  } catch (e) {
    return {};
  }
};
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
