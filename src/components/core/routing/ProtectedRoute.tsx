// https://github.com/openscript/react-example-authentication-redirection

import * as React from 'react';
import { Route, RouteComponentProps, StaticContext } from 'react-router';
import { ProtectedRouteProps, getLabelByPathname } from './Routes';
import { Redirect } from 'react-router-dom';
import { useSelector, connect, useDispatch } from 'react-redux';
import { AuthSelector } from '../../../redux/selectors/auth.selector';
import { TournamentAction } from '../../../redux/actions';

// HOC gestisce la visibilità dei componenti ed eventualmente reindirizza alla login
export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(AuthSelector.isAuthenticated);

	// FIXME: RouteComponentProps<any, StaticContext, any>
	return (
		<Route
			{...props}
			render={(innerProps: RouteComponentProps<any, StaticContext, any>) => {
				const { location } = innerProps;
				console.log('ProtectedRoute : ', location);

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
					console.log('ProtectedRoute => redirect to Login ');
					return <Redirect {...props} to={{ pathname: '/login', state: { from: location } }} />;
				}
				/**
				 * Se sono arrivato qui vuol dire che è una rotta protetta, che sono autenticato
				 * e che non sto chiedendo di andare alla login. Quindi direi che posso andare dove voglio...
				 *
				 * Se sto andando alla home ricarico i tornei.
				 */
				if (location.pathname === '/') {
					console.log('ProtectedRoute : ', location.state);
					dispatch(TournamentAction.fetch.request({}));
				}
				console.log('ProtectedRoute => render component : ', getLabelByPathname(location.pathname));
				return <props.componentToRender {...props} />;
			}}
		/>
	);
};
export default connect(ProtectedRoute);
