// https://www.carlrippon.com/building-super-simple-react-form-component-typescript-basics/
// https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d

import React, { Component, ChangeEvent, FormEvent } from 'react';
import logo from './logo.svg';
import './App.css';

type appProps = { name: string, greeting: string }
type appState = { name: string, greeting: string }

export default class App extends Component<appProps, appState> {

  constructor(props: appProps) {
    super(props);
    this.state = { name: '', greeting: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
      .then(response => response.json())
      .then(state => this.setState(state));
  }

  public render() {
    return (
      <div className="App" >
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.greeting}</p>
        </header>
      </div>
    );
  }
}
