// https://github.com/openscript/react-example-authentication-redirection

import * as React from 'react';
import { Route } from 'react-router';
import { routeType } from './Routes';
import { SessionContext } from './SessionContext';
import { Redirect } from 'react-router-dom';

export const ProtectedRoute: React.FC<routeType> = props => (
  <SessionContext.Consumer>
    {([session]) => {
      return (
        <Route
          {...props}
          render={innerProps => {
            const { location } = innerProps;
            // Se non è una rotta protetta
            if (!props.private) {
              console.log('ProtectedRoute => public route : ', { ...props });
              return <props.ComponentToRender {...props} />;
            }
            // Se è una rotta privata e non sono autenticato devo andare alla login
            if (!session.isAuthenticated) {
              console.log('ProtectedRoute => redirect to Login : ', { ...session });
              return <Redirect {...props} to={{ pathname: '/login', state: { from: location } }} />;
            }
            // Se sono gia autenticato e sto chiedendo la login, reindirizzo alla home
            if (location.pathname === '/login') {
              console.log('ProtectedRoute => redirect to Home');
              return <Redirect {...props} to={{ pathname: '/', state: { from: location } }} />;
            }
            /**
             * Se sono arrivato qui vuol dire che è una rotta protetta, che sono autenticato
             * e che non sto chiedendo di andare alla login. Quindi direi che posso andare dove voglio...
             */
            console.log('ProtectedRoute => render component : ');
            return <props.ComponentToRender {...props} />;
          }}
        />
      );
    }}
  </SessionContext.Consumer>
);

export default ProtectedRoute;
