// https://www.carlrippon.com/building-super-simple-react-form-component-typescript-basics/
// https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d


// https://github.com/palantir/blueprint/issues/3372

import React, { Component, ChangeEvent, FormEvent, ChangeEventHandler } from 'react';
import logo from './logo.svg';
import './App.css';
import { inspect } from 'util';
import GenericForm from 'components/core/GenericForm';

type appProps = { name: string, greeting: string }
type appState = {
  name: string,
  surname: string,
  alias: string,
  role: string
}

export default class App extends Component<appProps, appState> {

  constructor(props: Readonly<appProps>) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      alias: '',
      role: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ name: event.target.value });
  }

  handleChange2: React.FormEventHandler<HTMLInputElement> = (event) => {
    console.log(`handleChange2 : ${inspect({ [event.currentTarget.name]: event.currentTarget.value })}`);
    this.setState({ [event.currentTarget.name]: event.currentTarget.value } as appState);
  };

  handleChange3 = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value } as appState);
  };

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`/ api / greeting ? name = ${encodeURIComponent(this.state.name)} `)
      .then(response => response.json())
      .then(state => this.setState(state));
  }

  async handleAnotherSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`/ player`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    })
    console.log(await response.json())
  }

  public render() {
    // TODO: Convert to map
    const names = ['i1', 'i2', 'i3', 'i4', 'i5']
    return (
      <div className="App" >
        <header className="App-header">
          <form onSubmit={this.handleAnotherSubmit}>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input type="text" name="firstName"
              onChange={e => this.setState({ ...this.state, [e.currentTarget.name]: e.currentTarget.value })} />
            <label htmlFor="name">Enter your name: </label>
            <input id="name" type="text" value={this.state.name} onChange={e => this.setState({ ...this.state, [e.currentTarget.name]: e.currentTarget.value })} placeholder="name" />
            <br />
            <label htmlFor="surname">surname: </label>
            <input id="surname" type="text" value={this.state.surname} onChange={this.handleChange2} placeholder="surname" />
            <br />
            <label htmlFor="alias">alias: </label>
            <input id="alias" type="text" value={this.state.alias} onChange={this.handleChange} placeholder="alias" />
            <br />
            <label htmlFor="role">role: </label>
            <input id="role" type="text" value={this.state.role} onChange={this.handleChange} placeholder="role" />
            <br />
            <button type="submit">Submit Another Form</button>
          </form>

          <GenericForm inputFieldsNames={names} onSubmit={this.handleAnotherSubmit}></GenericForm>
        </header>
      </div>
    );
  }
}
