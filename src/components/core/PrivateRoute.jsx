
import React from "react";
import { Redirect, Route } from 'react-router-dom';

/** TODO: add popup on redirect */
export default function PrivateRoute({ children, ...rest }) {
    // Se verrò reindirizzato aggiungo un messaggio
    console.log(`PrivateRoute.rest : `, rest)
    if (!(rest.username !== '' && rest.token !== '')) {
        Object.assign(rest, { message: `Per continuare devi eseguire l'accesso` })
    }
    console.log(`PrivateRoute.props : `, rest)
    return (
        <Route
            {...rest}
            render={({ location }) => (rest.username !== '' && rest.token !== '') ?
                (children) :
                (< Redirect
                    to={{
                        pathname: "/login",
                        state: { from: location }
                    }}
                    {...rest}
                />)
            }
        />
    );
}

//export default withAlert()(PrivateRoute)
