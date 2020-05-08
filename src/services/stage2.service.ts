import { FetchStage2Response, FetchStage2Request } from 'models';
import { generateStructure } from 'components/Stage2/helper';

export const fetchStage2 = async ({
  count: rowsNumber,
  tournamentId,
}: FetchStage2Request): Promise<FetchStage2Response> => {
  const structure = generateStructure(rowsNumber);
  try {
    const response = await fetch('/api/v1/stage2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tournamentId, structure }),
    });
    const cells = await response.json();
    // console.log('response : ', cells);
    return { cells, rowsNumber };
  } catch (e) {
    handleError(e);
    return { cells: structure, rowsNumber };
  }
};

const handleError = (errorMessage: string): FetchStage2Request => {
  console.warn('Stage2 Error : ', errorMessage);
  throw new Error('Something went wrong');
};
