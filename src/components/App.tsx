// https://www.carlrippon.com/building-super-simple-react-form-component-typescript-basics/
// https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d


// https://github.com/palantir/blueprint/issues/3372

import React, { Component, FormEvent } from 'react';
import './App.css';
import TournamentForm from 'components/tournament';
import TournamentSelection from './TournamentSelection';
import { Route, Link, Switch } from 'react-router-dom'

type appProps = { name: string, greeting: string }

const applicationName = `webapp`; //`calcetto C.S.M`;

export default class App extends Component<appProps, {}> {

  constructor(props: Readonly<appProps>) {
    super(props);
  }

  public render() {
    return (
      <div className="App" >
        {/** Header */}
        <header className="App-header">
          <p>{applicationName}</p>
        </header>
        <br></br>

        {/** Body */}
        <Switch>
          <Route exact path="/" component={TournamentSelection} />

          <br></br>
        </Switch>


      </div>
    );
  }
}
