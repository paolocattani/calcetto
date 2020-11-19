import { FetchStage2Response, FetchStage2Request } from '../../@common/models';
import { ICell } from '../../@common/dto';
import { DEFAULT_HEADERS } from '../../@common/utils/fetch.utils';
import { getEmptyPair } from './pair.service';

export const deleteStage2 = async (tId: number) => {
  const response = await fetch('/api/v1/stage2', {
    method: 'DELETE',
    ...DEFAULT_HEADERS,
    body: JSON.stringify({ tId }),
  });
  await response.json();
};

export const updateCells = async (cell1: ICell, cell2: ICell | null) => {
  try {
    const response = await fetch('/api/v1/stage2/cells', {
      method: 'POST',
      ...DEFAULT_HEADERS,
      body: JSON.stringify({ cell1, cell2 }),
    });
    await response.json();
  } catch (e) {
    console.error('Error stage2 update');
  }
};

export const fetchPairsStage2 = async (tId: number) => {
  try {
    const response = await fetch(`/api/v1/stage2/pairs/${tId}`);
    const result = await response.json();
    return { pairs: [getEmptyPair('-'), ...result.pairs] };
  } catch (e) {
    console.error('Error stage2 fetching pairs');
  }
  return { pairs: [] };
};

export const fetchStage2 = async ({
  count: rowsNumber,
  tournamentId,
}: FetchStage2Request): Promise<FetchStage2Response> => {
  try {
    const response = await fetch('/api/v1/stage2', {
      method: 'POST',
      ...DEFAULT_HEADERS,
      body: JSON.stringify({ tournamentId, rowsNumber }),
    });
    const cells = await response.json();
    return { cells, rowsNumber };
  } catch (e) {
    return { cells: [], rowsNumber };
  }
};
