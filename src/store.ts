import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers, ReducersMapObject } from 'redux';
import { all } from 'redux-saga/effects';
import { RootState } from 'models';
import { TournamentReducer, PlayerReducer, PairReducer } from 'reducers';
import { TournamentsSagas, PlayersSagas, PairsSagas } from 'sagas';

// https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
// custom compose for the redux devtool extension
const composeEnhancer = (() => {
  if (process.env.NODE_ENV === 'development') {
    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    const key = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
    if (window && typeof (window as any)[key] !== 'undefined') {
      // custom compose
      return (window as any)[key];
    }
  }
  // default compose
  return compose;
})();

const sagaMiddleware = createSagaMiddleware();

const commonReducers: ReducersMapObject<RootState> = {
  tournamentState: TournamentReducer,
  playerState: PlayerReducer,
  pairState: PairReducer,
};

// Meet the Store
export const store = createStore(combineReducers(commonReducers), composeEnhancer(applyMiddleware(sagaMiddleware)));

// Exec all sagas ( watcher )
function* rootSagas() {
  yield all([...TournamentsSagas, ...PlayersSagas, ...PairsSagas]);
}

sagaMiddleware.run(rootSagas);
