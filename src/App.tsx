// https://www.carlrippon.com/building-super-simple-react-form-component-typescript-basics/
// https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d


// https://github.com/palantir/blueprint/issues/3372

import React, { Component, FormEvent } from 'react';
import './App.css';
import { inspect } from 'util';
import GenericForm from 'components/core/GenericForm';
import TournamentForm from 'components/tournament';
import { IInputOptions } from 'components/core/InputOptions';

type appProps = { name: string, greeting: string }

export default class App extends Component<appProps, {}> {

  constructor(props: Readonly<appProps>) {
    super(props);
  }

  public render() {
    return (
      <div className="App" >
        <header className="App-header">
          <TournamentForm />
        </header>
      </div>
    );
  }
}
