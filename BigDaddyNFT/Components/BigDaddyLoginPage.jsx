import React from "react";
import '../BigDaddyCSS.css';

function BigDaddyLoginPage({ bigdaddyhandleLogIn, logoimagePath}) {
  return (
    <div className="bigDaddyContainer">
    <img src={logoimagePath} width={"300px"} height={"150px"}/>
      <h1>Welcome to your NFT securised website</h1>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
          <button className="bigdaddy-button" onClick={bigdaddyhandleLogIn}>Log In</button>
      </div>
    </div>
  );
}

export default BigDaddyLoginPage;