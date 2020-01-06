// https://github.com/openscript/react-example-authentication-redirection

import * as React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  redirectPathOnAuthentication: string;
  setRedirectPathOnAuthentication: (path: string) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  const currentLocation = useLocation();
  console.log('Current Location ', currentLocation);
  let redirectPath = props.redirectPathOnAuthentication;
  if (!props.isAuthenticated) {
    console.log('Not Authenticated');
    props.setRedirectPathOnAuthentication(currentLocation.pathname);
    redirectPath = props.authenticationPath;
  }

  if (redirectPath !== currentLocation.pathname && !props.isAuthenticated) {
    console.log('Redirecting to : ' + redirectPath);
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    console.log('Render component', props);
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
