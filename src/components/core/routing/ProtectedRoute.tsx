// https://github.com/openscript/react-example-authentication-redirection

import * as React from 'react';
import { Route } from 'react-router';
import { routeType, getLabelByPathname } from './Routes';
import { Redirect } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import { SessionSelector } from 'redux/selectors/session.selector';
import { TournamentSelector } from 'redux/selectors';

// HOC gestisce la visibilità dei componenti ed eventualmente reindirizza alla login
export const ProtectedRoute: React.FC<routeType> = (props) => {
  const isAuthenticated = useSelector(SessionSelector.isAuthenticated);
  const session = useSelector(SessionSelector.getSession);
  const tournament = useSelector(TournamentSelector.getTournament);
  return (
    <Route
      {...props}
      render={(innerProps) => {
        const { location } = innerProps;
        console.log('ProtectedRoute : ', session, tournament, location);
        // Se sono gia autenticato e sto chiedendo la login, reindirizzo alla home
        if (isAuthenticated && location.pathname === '/login') {
          console.log('ProtectedRoute => redirect to Home');
          return <Redirect {...props} to={{ pathname: '/', state: { from: location } }} />;
        }

        // Se non è una rotta protetta
        if (!props.private) {
          console.log('ProtectedRoute => public route : ', { ...props });
          return <props.componentToRender {...props} />;
        }

        // Se è una rotta privata e non sono autenticato devo andare alla login
        if (!isAuthenticated) {
          console.log('ProtectedRoute => redirect to Login : ', { ...session });
          return <Redirect {...props} to={{ pathname: '/login', state: { from: location } }} />;
        }
        /**
         * Se sono arrivato qui vuol dire che è una rotta protetta, che sono autenticato
         * e che non sto chiedendo di andare alla login. Quindi direi che posso andare dove voglio...
         */
        console.log('ProtectedRoute => render component : ', getLabelByPathname(location.pathname));
        return <props.componentToRender {...props} />;
      }}
    />
  );
};
export default connect(ProtectedRoute);
