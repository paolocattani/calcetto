import { FetchPairsRequest, FetchPairsResponse, PostPairsResponse, PostPairsRequest } from 'models';

export const fetchPairs = async ({ tId }: FetchPairsRequest): Promise<FetchPairsResponse> => {
  try {
    const response = await fetch(`/api/v1/pair/list/?tId=${tId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const results = await response.json();
    return { results };
  } catch (e) {
    handleError(e);
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
    handleError(e);
    return { results: [] };
  }
};

const handleError = (errorMessage: string): FetchPairsResponse => {
  console.warn('Pair Error : ', errorMessage);
  throw new Error('Something went wrong');
};
