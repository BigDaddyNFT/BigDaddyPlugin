import React from "react";
import '../BigDaddyCSS.css';
import { useBigDaddyContext } from '../Provider/BigDaddyContext.jsx';
import * as fcl from '@onflow/fcl'

function BigDaddyLoginPage() {
  const { logoimagePath } = useBigDaddyContext();

  const bigdaddyhandleLogIn = () => {
    fcl.logIn();
  };

  return (
    <div className="bigDaddyContainer">
    <img src={logoimagePath} width={"300px"} height={"150px"} alt={"logo"}/>
      <h1 style={{color : 'white', paddingTop:'150px'}}>Welcome to your NFT secured website</h1>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
          <button className="bigdaddy-button" onClick={bigdaddyhandleLogIn}>Log In</button>
      </div>
    </div>
  );
}

export default BigDaddyLoginPage;