import { createReducer, Action } from 'typesafe-actions';
import { TournamentAction } from '../actions/tournament.action';
import { TournamentState } from 'redux/models/tournament.model';

export const initialTournamentState: TournamentState = {
  tournament: null,
  tournamentsList: [],
  isLoading: false,
};

export const TournamentReducer = createReducer<TournamentState, Action>(initialTournamentState)
  // Request
  .handleAction(
    [TournamentAction.fetch.request, TournamentAction.save.request, TournamentAction.update.request],
    (state) => ({
      ...state,
      isLoading: true,
    })
  )
  // Failure
  .handleAction(
    [TournamentAction.fetch.failure, TournamentAction.save.failure, TournamentAction.update.failure],
    (state) => ({ ...state, isLoading: false })
  )
  // SUCCESS
  // Fetch Tournament
  .handleAction(TournamentAction.fetch.success, (state, { payload: { results } }) => ({
    tournament: results && results.length > 0 ? results[0] : null,
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
    [TournamentAction.save.success, TournamentAction.update.success],
    (state, { payload: { tournament } }) => ({
      ...state,
      tournament,
      isLoading: false,
    })
  )
  .handleAction(TournamentAction.purge, () => initialTournamentState);
