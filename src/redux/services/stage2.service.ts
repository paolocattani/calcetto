import { FetchStage2Response, FetchStage2Request, ICell } from 'redux/models';
import { handleError } from './common';
import { getEmptyRowModel } from 'components/Pair/helper';

export const deleteStage2 = async (tId: number) => {
  const response = await fetch('/api/v1/stage2', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tId }),
  });
  await response.json();
};

export const updateCells = async (cell1: ICell, cell2: ICell | null) => {
  try {
    const response = await fetch('/api/v1/stage2/cells', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cell1, cell2 }),
    });
    await response.json();
  } catch (e) {
    handleError(e, 'Error stage2 update');
  }
};

export const fetchPairsStage2 = async (tId: number) => {
  try {
    const response = await fetch(`/api/v1/stage2/pairs/${tId}`);
    const result = await response.json();
    return { pairs: [getEmptyRowModel('-'), ...result.pairs] };
  } catch (e) {
    handleError(e, 'Error stage2 fetching pairs');
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tournamentId, rowsNumber }),
    });
    const cells = await response.json();
    return { cells, rowsNumber };
  } catch (e) {
    handleError(e, 'Error stage2 fetch');
    return { cells: [], rowsNumber };
  }
};
