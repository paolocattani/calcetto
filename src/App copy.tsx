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
    this.handleSubmit.bind(this);
  }

  async handleSubmit(event: FormEvent<HTMLFormElement>, state: any) {
    console.log(inspect(state));
    event.preventDefault();
    const response = await fetch(`/api/player`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });
    console.log(await response.json());
  }

  public render() {
    let fields = new Map<string, IInputOptions>();
    fields.set('name', {
      label: 'Nome',
      inputType: 'text',
      placeholder: 'nome'
    } as IInputOptions);

    fields.set('surname', {
      label: 'Cognome',
      inputType: 'text',
      placeholder: 'cognome'
    } as IInputOptions);

    fields.set('alias', {
      label: 'Alias',
      inputType: 'text',
      placeholder: 'alias'
    } as IInputOptions);
    fields.set('role', {
      label: 'Ruolo',
      inputType: 'text',
      placeholder: 'roulo'
    } as IInputOptions);

    return (
      <div className="App" >
        <header className="App-header">
          <TournamentForm />
          <GenericForm
            inputFields={fields}
            submitMessage={'Conferma'}
            onSubmit={this.handleSubmit}>
          </GenericForm>
        </header>
      </div>
    );
  }
}
