import {
  FetchTournamentsRequest,
  TournamentDTO,
  PostTournamentRequest,
  FetchTournamentsResponse,
  PostTournamentResponse,
} from '../models/tournament.model';
import { createAsyncAction, createAction } from 'typesafe-actions';
import { Failure, Success, Request } from './constants';

const ActionName = '[Tournament]';

export const TournamentAction = {
  // fetch tournaments
  getTournaments: createAsyncAction(
    `${ActionName} Get Tournament ${Request}`,
    `${ActionName} Get Tournament ${Success}`,
    `${ActionName} Get Tournament ${Failure}`
  )<FetchTournamentsRequest, FetchTournamentsResponse, Error>(),
  // set selected tournament
  setTournament: createAction(`${ActionName} Set Tournament`)<TournamentDTO | null>(),
  // save a new tournament
  saveTournament: createAsyncAction(
    `${ActionName} Save Tournament ${Request}`,
    `${ActionName} Save Tournament ${Success}`,
    `${ActionName} Save Tournament ${Failure}`
  )<PostTournamentRequest, PostTournamentResponse, Error>(),
};
