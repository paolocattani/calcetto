import { useLocation } from 'react-router-dom';
import React from 'react';

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
