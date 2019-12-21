// https://www.carlrippon.com/building-super-simple-react-form-component-typescript-basics/
// https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d

// https://github.com/palantir/blueprint/issues/3372

import React, { Component } from 'react';
import './App.css';
import TournamentSelection from './TournamentSelection';
import { Route, Switch } from 'react-router-dom';
import * as Todo from './Todo';

type appProps = { name: string; greeting: string };

const applicationName = 'webapp'; //`calcetto C.S.M`;

// Mappatura route
const routes = [
  { path: '/', label: 'Home', exact: true, component: TournamentSelection, visible: true, index: 0 },
  // TODO: creare pagina per route not found
  { path: '*', label: 'Not Found', exact: false, component: Todo.NoMatch, visible: false, index: 100 }
];

export default class App extends Component<appProps, {}> {
  constructor(props: Readonly<appProps>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="App">
        {/** Header */}
        <header className="App-header">
          <p>{applicationName}</p>
        </header>
        <br></br>
        {/** Body */}
        <Switch>
          {/* Carica dinamicamente le route a partire dall'oggetto routes ( vedi sopra ) */
          routes.map(route => (
            <Route key={route.index} path={route.path} exact={route.exact} component={route.component}></Route>
          ))}
          <br></br>
        </Switch>
      </div>
    );
  }
}
