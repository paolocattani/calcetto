import { createAction } from 'typesafe-actions';
import { Stage1Row } from 'models';

const ActionName = '[Stage1]';

export const Stage1Action = {
  // get selected tournament
  setSelectedPairs: createAction(`${ActionName} Set Selected Pairs`)<{ stageName: string; rows: Stage1Row[] }>(),
};
