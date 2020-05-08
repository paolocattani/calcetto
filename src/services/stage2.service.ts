import { FetchPairsResponse, FetchStage2Response, FetchStage2Request } from 'models';

export const fetchStage2 = async ({ count, tournamentId }: FetchStage2Request): Promise<FetchStage2Response> => {
  try {
    const response = await fetch('/api/v1/stage2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tournamentId, count }),
    });
    const cells = await response.json();
    console.log('response : ', cells);

    return { cells };
  } catch (e) {
    handleError(e);
    return { cells: [] };
  }
};

const handleError = (errorMessage: string): FetchPairsResponse => {
  console.warn('Pair Error : ', errorMessage);
  throw new Error('Something went wrong');
};
