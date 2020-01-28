import React from 'react';
import { useLocation } from 'react-router-dom';

// 404 Page
export function NoMatch(): JSX.Element {
  const location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export function RedirectionControl(props: any): JSX.Element {
  const location = useLocation();
  return (
    <div>
      <h1>
        Current Ruote : <code>{location.pathname}</code>
      </h1>
    </div>
  );
}

export function Home(props: any): JSX.Element {
  return (
    <div>
      <h1> HOME PAGE </h1>
      <h2>Welcome </h2>
    </div>
  );
}

export function About(): JSX.Element {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}
