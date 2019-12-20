// React
import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
// Router
import { withRouter } from 'react-router';

const formStyle = { width: 'fit-content', margin: 'auto' };

class LoginClass extends Component {
   constructor(props) {
      super(props);
      this.state = { username: '', password: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   componentDidMount() {
      console.log('Login.componentDidMount : props -> ', this.props);
   }

   handleChange(event) {
      this.setState({ [event.currentTarget.name]: event.currentTarget.value });
   }

   // chiamare API autenticazione
   async handleSubmit(event) {
      event.preventDefault();
      // Test Auth
      const { username, password } = this.state;
      console.log('Login.handleSubmit.userId', username);
      console.log('Login.handleSubmit.password', password);

      const response = await fetch('/api/alfresco/auth', {
         method: 'POST',
         headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
         body: JSON.stringify({ username, password })
      });
      const result = await response.json();
      const { handleLogin } = this.props;
      handleLogin(result.userId, result.id);
      // https://reacttraining.com/react-router/web/example/auth-workflow
      const { history } = this.props;
      const { location } = this.props;
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
      // this.props.history.push("/");
   }

   // Render form username/password
   render() {
      const message = this.props.location?.state?.message ?? 'Effettua il login per continuare';
      return (
         <>
            {message ? (
               <Alert key={1} variant="danger">
                  {message}
               </Alert>
            ) : null}
            <Form style={formStyle} onSubmit={this.handleSubmit}>
               <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="username" type="text" placeholder="username" onChange={this.handleChange} />
               </Form.Group>

               <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange} />
               </Form.Group>
               <Button variant="warning" type="submit">
                  {' '}
                  Login{' '}
               </Button>
            </Form>
         </>
      );
   }
}

const Login = withRouter(LoginClass);
export default Login;
