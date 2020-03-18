// https://github.com/openscript/react-example-authentication-redirection

import * as React from 'react';
import { Route, RouteProps } from 'react-router';

export const ProtectedRoute: React.FC<any> = props => {
  /**
   *
   * Per ora non voglio obbligare l'utente a fare la login.
   * Gestisco nelle singole pagine che se l'utente non è autenticato non può modificare
   */
  const { component: ComponentToRender } = props;

  return <Route {...props} render={() => <ComponentToRender />} />;

  /*
  const currentLocation = useLocation();
  // console.log('Current Location ', currentLocation);
  let redirectPath = props.redirectPathOnAuthentication;




  // FIXME:
  // console.log('ProtectedRoute....');
  if (process.env.NODE_ENV === 'development') return <Route {...props} />;

  if (!props.isAuthenticated) {
    // console.log('Not Authenticated');
    props.setRedirectPathOnAuthentication(currentLocation.pathname);
    redirectPath = props.authenticationPath;
  }

  if (redirectPath !== currentLocation.pathname && !props.isAuthenticated) {
    // console.log('Redirecting to : ' + redirectPath);
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    // console.log('Render component', props);
    return <Route {...props} />;
  }
  */
};

export default ProtectedRoute;
