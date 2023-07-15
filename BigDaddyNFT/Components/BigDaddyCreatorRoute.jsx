import React from 'react';
import { Navigate } from 'react-router-dom';
import { useBigDaddyContext } from '../Provider/BigDaddyContext.jsx';
import { BIGDADDY_PATH } from '../BigDaddy-config'

const BigDaddyCreatorRoute = ({ children }) => {
const { isCreator } = useBigDaddyContext();

  if (isCreator) {
    return children;
  } else {
    return <Navigate to={BIGDADDY_PATH} />;
  }
};

export default BigDaddyCreatorRoute;