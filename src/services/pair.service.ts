import { FetchPairsRequest, FetchPairsResponse, PostPairsResponse, PostPairsRequest } from 'models';
import { handleError } from './common';

export const fetchPairs = async ({ tId }: FetchPairsRequest): Promise<FetchPairsResponse> => {
  try {
    console.log('fetchPairs : ', tId);
    const response = await fetch(`/api/v1/pair/list/?tId=${tId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(models),
    });
    const results = await response.json();
    return { results };
  } catch (e) {
    handleError(e, 'Error pairs update');
    return { results: [] };
  }
};
