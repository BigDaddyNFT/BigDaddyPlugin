import React from "react";
import '../BigDaddyCSS.css';

function BigDaddyLoginPage({ bigdaddyhandleLogIn}) {
  return (
    <div className="bigDaddyContainer">
      <div class="title">BigDaddy NFT</div>
      <h1>Welcome to your NFT securised website</h1>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
          <button class="glow-on-hover" onClick={bigdaddyhandleLogIn}>Log In</button>
      </div>
    </div>
  );
}

export default BigDaddyLoginPage;