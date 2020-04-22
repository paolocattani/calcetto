import { createReducer, Action } from 'typesafe-actions';
import { TournamentAction } from '../actions/tournament.action';
import { TournamentState } from 'models/tournament.model';

const initialState: TournamentState = {
  tournament: null,
  tournamentsList: [],
  isLoading: false,
};

export const TournamentReducer = createReducer<TournamentState, Action>(initialState)
  // Fetch Tournament
  .handleAction(TournamentAction.getTournaments.request, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  }))
  .handleAction(TournamentAction.getTournaments.success, (state, { payload: { results } }) => ({
    ...state,
    tournament: results && results.length > 0 ? results[0] : state.tournament,
    tournamentsList: results,
    isLoading: false,
  }))
  .handleAction(TournamentAction.getTournaments.failure, (state, { payload: { message } }) => ({
    ...state,
    errorMessage: message,
    isLoading: false,
  }))
  // Set selected tournament
  .handleAction(TournamentAction.setTournament, (state, { payload }) => ({
    ...state,
    tournament: payload,
    isLoading: false,
  }))
  // Create a new tournament
  .handleAction(TournamentAction.saveTournament.request, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  }))
  .handleAction(TournamentAction.saveTournament.success, (state, { payload: { result } }) => ({
    ...state,
    tournament: result,
    isLoading: false,
  }))
  .handleAction(TournamentAction.saveTournament.failure, (state, { payload: { message } }) => ({
    ...state,
    errorMessage: message,
    isLoading: false,
  }));
