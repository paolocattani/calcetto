import { createReducer, Action } from 'typesafe-actions';
import { TournamentAction } from '../actions/tournament.action';
import { TournamentState } from '../../@common/models/tournament.model';

export const initialTournamentState: TournamentState = {
	tournament: null,
	tournamentsList: [],
	isLoading: false,
};

export const TournamentReducer = createReducer<TournamentState, Action>(initialTournamentState)
	// Request
	.handleAction(
		[
			TournamentAction.fetch.request,
			TournamentAction.save.request,
			TournamentAction.update.request,
			TournamentAction.reload.request,
		],
		(state) => ({
			...state,
			isLoading: true,
		})
	)
	// Failure
	.handleAction(
		[
			TournamentAction.fetch.failure,
			TournamentAction.save.failure,
			TournamentAction.update.failure,
			TournamentAction.reload.failure,
		],
		(state) => ({ ...state, isLoading: false })
	)
	// SUCCESS
	// Fetch Tournament
	.handleAction(TournamentAction.fetch.success, (state, { payload: { tournamentsList } }) => {
		return {
			tournament:
				state.tournament && tournamentsList && !tournamentsList.includes(state.tournament)
					? tournamentsList[0]
					: state.tournament,
			tournamentsList: tournamentsList || [],
			isLoading: false,
		};
	})
	// Set selected tournament
	.handleAction(TournamentAction.setTournament, (state, { payload }) => ({
		...state,
		tournament: payload,
		isLoading: false,
	}))
	// Create/Update a new tournament
	.handleAction(
		[TournamentAction.save.success, TournamentAction.update.success, TournamentAction.reload.success],
		(state, { payload: { tournament } }) => ({
			...state,
			tournament,
			isLoading: false,
		})
	)
	.handleAction(TournamentAction.reset, () => initialTournamentState)
	.handleAction(TournamentAction.purge, () => initialTournamentState);
