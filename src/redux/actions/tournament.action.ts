import {
  FetchTournamentsRequest,
  TournamentDTO,
  PostTournamentRequest,
  FetchTournamentsResponse,
  PostTournamentResponse,
  UpdateTournamentRequest,
  UpdateTournamentResponse,
} from '../models/tournament.model';
import { createAsyncAction, createAction } from 'typesafe-actions';
import { defaultAsyncParams, defaultParam, PurgeResponse } from './constants';

const actionName = '[Tournament]';

export const TournamentAction = {
  // fetch tournaments
  fetchTournaments: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Tournaments'))<
    FetchTournamentsRequest,
    FetchTournamentsResponse,
    Error
  >(),
  // set selected tournament
  setTournament: createAction(...defaultParam(actionName, 'Set Tournament'))<TournamentDTO | null>(),
  // save a new tournament
  saveTournament: createAsyncAction(...defaultAsyncParams(actionName, 'Save Tournament'))<
    PostTournamentRequest,
    PostTournamentResponse,
    Error
  >(),
  // save a new tournament
  updateTournament: createAsyncAction(...defaultAsyncParams(actionName, 'Update Tournament'))<
    UpdateTournamentRequest,
    UpdateTournamentResponse,
    Error
  >(),
  purge: createAction('persist/PURGE')<PurgeResponse>(),
};
