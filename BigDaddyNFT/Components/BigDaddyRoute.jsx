import React from 'react';
import { Navigate } from 'react-router-dom';
import { useBigDaddyContext } from '../Provider/BigDaddyContext.jsx';
import { BIGDADDY_PATH } from '../BigDaddy-config'

const BigDaddyRoute = ({ children }) => {
const { hasPersonnalAccess } = useBigDaddyContext();

  if (hasPersonnalAccess) {
    return children;
  } else {
    return <Navigate to={BIGDADDY_PATH} />;
  }
};

export default BigDaddyRoute;
