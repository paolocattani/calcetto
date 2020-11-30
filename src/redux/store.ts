import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers, ReducersMapObject } from 'redux';
import { all } from 'redux-saga/effects';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import { RootState } from '../@common/models';
import {
  TournamentReducer,
  PlayerReducer,
  PairReducer,
  SessionReducer,
  Stage1Reducer,
  Stage2Reducer,
  initialTournamentState,
  initialPairState,
  initialPlayerState,
  initialStage1State,
  initialStage2State,
  initialSessionState,
} from './reducers';
import { TournamentSagas, PlayersSagas, PairsSagas, SessionSagas, Stage2Sagas, Stage1Sagas } from './sagas';
import { initialState } from '../@common/models/common.models';

// TODO: https://manukyan.dev/posts/2019-04-15-code-splitting-for-redux-and-optional-redux-saga/#:~:text=Redux%20Saga%20Code%20Splitting,whenever%20those%20actions%20are%20dispatched.

// https://github.com/rt2zz/redux-persist
// https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
// custom compose for the redux devtool extension
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

export const rootReducers: ReducersMapObject<RootState> = {
  tournamentState: TournamentReducer,
  playerState: PlayerReducer,
  pairState: PairReducer,
  authState: SessionReducer,
  stage1State: Stage1Reducer,
  stage2State: Stage2Reducer,
};

export const initialStoreState: RootState = {
  tournamentState: initialTournamentState,
  pairState: initialPairState,
  playerState: initialPlayerState,
  stage1State: initialStage1State,
  stage2State: initialStage2State,
  authState: initialSessionState,
};

// Meet the Store
export const store = createStore(
  persistReducer(
    {
      key: 'app',
      storage: localForage,
    },
    combineReducers(rootReducers)
  ),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export const storeWithState = (preloaded: RootState = initialState) =>
  createStore(
    persistReducer(
      {
        key: 'app',
        storage: localForage,
      },

      combineReducers(rootReducers)
    ),
    preloaded,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

export const persistor = persistStore(store);

// expose store when run in Cypress
// https://www.cypress.io/blog/2018/11/14/testing-redux-store/
// FIXME:
if ((<any> window).Cypress) {
	(<any> window).store = store;
}

// Exec all sagas
function* rootSagas() {
  yield all([...TournamentSagas, ...PlayersSagas, ...PairsSagas, ...SessionSagas, ...Stage2Sagas, ...Stage1Sagas]);
}

sagaMiddleware.run(rootSagas);


