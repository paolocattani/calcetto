import React, { CSSProperties } from 'react';
import { Badge } from 'react-bootstrap';

interface AppBadgeProps {}
const AppBadge: React.FC<AppBadgeProps> = () => {
  const appVersion = process.env.REACT_APP_CLIENT_VERSION;
  const commitHash = process.env.REACT_APP_CLIENT_COMMIT_HASH;

  const style: CSSProperties = {
    position: 'absolute',
    top: '0.1em',
    right: '0.1em',
  };
  return (
    <h4 style={style}>
      <Badge variant="info">
        <span>v.</span>
        <strong>{appVersion}</strong>
        <span>
          <i>
            <small> @ {commitHash}</small>
          </i>
        </span>
      </Badge>
    </h4>
  );
};

export default AppBadge;
