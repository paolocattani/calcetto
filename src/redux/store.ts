import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers, ReducersMapObject } from 'redux';
import { all } from 'redux-saga/effects';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import { RootState } from 'redux/models';
import {
  TournamentReducer,
  PlayerReducer,
  PairReducer,
  SessionReducer,
  Stage1Reducer,
  Stage2Reducer,
} from 'redux/reducers';
import { TournamentsSagas, PlayersSagas, PairsSagas, SessionSagas, Stage2Sagas, Stage1Sagas } from 'redux/sagas';

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

const commonReducers: ReducersMapObject<RootState> = {
  tournamentState: TournamentReducer,
  playerState: PlayerReducer,
  pairState: PairReducer,
  sessionState: SessionReducer,
  stage1State: Stage1Reducer,
  stage2State: Stage2Reducer,
};

// Meet the Store
export const store = createStore(
  persistReducer(
    {
      key: 'app',
      storage: localForage,
    },
    combineReducers(commonReducers)
  ),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export const persistor = persistStore(store);

// Exec all sagas
function* rootSagas() {
  yield all([...TournamentsSagas, ...PlayersSagas, ...PairsSagas, ...SessionSagas, ...Stage2Sagas, ...Stage1Sagas]);
}

sagaMiddleware.run(rootSagas);
