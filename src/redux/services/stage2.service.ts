import { FetchStage2Response, FetchStage2Request, ICell } from 'redux/models';
import { generateStructure } from 'components/Stage2/helper';
import { handleError } from './common';

export const deleteStage2 = async (tId: number) => {
  const response = await fetch('/api/v1/stage2', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tId }),
  });
  await response.json();
};

export const updateCells = async (cell1: ICell, cell2: ICell) => {
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

export const fetchStage2 = async ({
  count: rowsNumber,
  tournamentId,
}: FetchStage2Request): Promise<FetchStage2Response> => {
  if (rowsNumber === 0) {
    rowsNumber = await countStage2Step0(tournamentId);
  }
  const structure = generateStructure(rowsNumber);
  try {
    const response = await fetch('/api/v1/stage2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tournamentId, structure }),
    });
    const cells = await response.json();
    return { cells, rowsNumber };
  } catch (e) {
    handleError(e, 'Error stage2 fetch');
    return { cells: structure, rowsNumber };
  }
};

const countStage2Step0 = async (tournamentId: number): Promise<number> => {
  let count = 0;
  try {
    const response = await fetch('/api/v1/stage2/count', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tournamentId }),
    });
    const result = await response.json();
    return result.count;
  } catch (e) {
    handleError(e, 'Error stage2 count');
  } finally {
    return count;
  }
};
