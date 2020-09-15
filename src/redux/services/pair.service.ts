import { FetchPairsRequest, FetchPairsResponse, PostPairsResponse, PostPairsRequest } from '@common/models';
import { handleError, DEFAULT_HEADERS } from './common';

export const fetchPairs = async ({ tId }: FetchPairsRequest): Promise<FetchPairsResponse> => {
  try {
    console.log('fetchPairs : ', tId);
    const response = await fetch(`/api/v1/pair/list/?tId=${tId}`, {
      method: 'GET',
      ...DEFAULT_HEADERS,
    });
    const results = await response.json();
    console.log('fetchPairs : ', tId, results);
    return { results };
  } catch (e) {
    handleError(e, 'Error pairs fetch');
    return { results: [] };
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
    handleError(e, 'Error pairs update');
    return { results: [] };
  }
};
