import {
  FetchTournamentsRequest,
  SaveTournamentRequest,
  FetchTournamentsResponse,
  SaveTournamentResponse,
  UpdateTournamentRequest,
  UpdateTournamentResponse,
  TournamentError,
} from '../../@common/models/tournament.model';
import { createAsyncAction, createAction } from 'typesafe-actions';
import { defaultAsyncParams, defaultParam, PurgeResponse, PURGE_STORE_ACTION } from './constants';
import { TournamentDTO } from '../../@common/dto';

const actionName = '[Tournament]';

export const TournamentAction = {
  // fetch tournaments
  fetch: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Tournaments'))<
    FetchTournamentsRequest,
    FetchTournamentsResponse,
    Error
  >(),
  // set selected tournament
  setTournament: createAction(...defaultParam(actionName, 'Set Tournament'))<TournamentDTO | null>(),
  // save a new tournament
  save: createAsyncAction(...defaultAsyncParams(actionName, 'Save Tournament'))<
    SaveTournamentRequest,
    SaveTournamentResponse,
    TournamentError
  >(),
  // save a new tournament
  update: createAsyncAction(...defaultAsyncParams(actionName, 'Update Tournament'))<
    UpdateTournamentRequest,
    UpdateTournamentResponse,
    TournamentError
  >(),
  purge: createAction(PURGE_STORE_ACTION)<PurgeResponse>(),
};
