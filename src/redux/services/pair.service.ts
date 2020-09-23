import { FetchPairsRequest, FetchPairsResponse, PostPairsResponse, PostPairsRequest } from '@common/models';
import { UnexpectedServerError, UserMessageType } from '@common/models/common.models';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';
import { DEFAULT_HEADERS } from '../../@common/utils/fetch.utils';

export const fetchPairs = async ({ tId }: FetchPairsRequest): Promise<FetchPairsResponse> => {
  try {
    console.log('fetchPairs : ', tId);
    const response = await fetch(`/api/v1/pair/list/?tId=${tId}`, {
      method: 'GET',
      ...DEFAULT_HEADERS,
    });
    const results = await response.json();
    console.log('fetchPairs : ', tId, results);
    return {
      results,
      code: HTTPStatusCode.OK,
      message: 'ok',
      userMessage: {
        type: UserMessageType.Success,
        message: 'Caricamento completato',
      },
    };
  } catch (e) {
    return { results: [], ...UnexpectedServerError };
  }
};

export const postPair = async ({ models }: PostPairsRequest): Promise<PostPairsResponse> => {
  try {
    const response = await fetch('/api/v1/pair', {
      method: 'POST',
      ...DEFAULT_HEADERS,
      body: JSON.stringify(models),
    });
    const results = await response.json();
    return { results };
  } catch (e) {
    return { results: [] };
  }
};
