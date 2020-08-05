import { createReducer, Action } from 'typesafe-actions';
import { TournamentAction } from '../actions/tournament.action';
import { TournamentState } from 'redux/models/tournament.model';

const initialState: TournamentState = {
  tournament: null,
  tournamentsList: [],
  isLoading: false,
};

export const TournamentReducer = createReducer<TournamentState, Action>(initialState)
  // Request
  .handleAction(
    [
      TournamentAction.getTournaments.request,
      TournamentAction.saveTournament.request,
      TournamentAction.updateTournament.request,
    ],
    (state) => ({
      ...state,
      isLoading: true,
      errorMessage: undefined,
    })
  )
  // Failure
  .handleAction(
    [
      TournamentAction.getTournaments.failure,
      TournamentAction.saveTournament.failure,
      TournamentAction.updateTournament.failure,
    ],
    (state, { payload: { message } }) => ({
      ...state,
      errorMessage: message,
      isLoading: false,
    })
  )
  // SUCCESS
  // Fetch Tournament
  .handleAction(TournamentAction.getTournaments.success, (state, { payload: { results } }) => ({
    ...state,
    tournament: results && results.length > 0 ? results[0] : state.tournament,
    tournamentsList: results,
    isLoading: false,
  }))
  // Set selected tournament
  .handleAction(TournamentAction.setTournament, (state, { payload }) => ({
    ...state,
    tournament: payload,
    isLoading: false,
  }))
  // Create/Update a new tournament
  .handleAction(
    [TournamentAction.saveTournament.success, TournamentAction.updateTournament.success],
    (state, { payload: { result } }) => ({
      ...state,
      tournament: result,
      isLoading: false,
    })
  );
