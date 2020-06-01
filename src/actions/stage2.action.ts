import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  FetchStage2Response,
  FetchStage2Request,
  UpdateStage2CellResponse,
  UpdateStage2CellRequest,
  ICell,
  DeleteStage2Request,
  DeleteStage2Response,
} from 'models';
import { Success, Failure } from './constants';

const ActionName = '[Stage2]';

export const Stage2Action = {
  // get selected tournament
  fetchStage2: createAsyncAction(
    `${ActionName} Fetch Stage2 ${Request}`,
    `${ActionName} Fetch Stage2 ${Success}`,
    `${ActionName} Fetch Stage2 ${Failure}`
  )<FetchStage2Request, FetchStage2Response, Error>(),
  updateCell: createAsyncAction(
    `${ActionName} Update Stage2 Cell ${Request}`,
    `${ActionName} Update Stage2 Cell ${Success}`,
    `${ActionName} Update Stage2 Cell ${Failure}`
  )<UpdateStage2CellRequest, UpdateStage2CellResponse, Error>(),
  delete: createAsyncAction(
    `${ActionName} Delete Stage2 ${Request}`,
    `${ActionName} Delete Stage2 ${Success}`,
    `${ActionName} Delete Stage2 ${Failure}`
  )<DeleteStage2Request, DeleteStage2Response, Error>(),
  setCells: createAction(`${ActionName} Set Cells`)<ICell[][]>(),
};
