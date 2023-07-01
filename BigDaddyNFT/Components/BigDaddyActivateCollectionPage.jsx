import React from "react";
import '../BigDaddyCSS.css';

function BigDaddyActivateAccountPage({ handleActivateBigDaddyCollection}) {
  return (
    <div className="bigDaddyContainer">
    <div class="title">BigDaddy NFT</div>
      <h1>Activate your NFT Collection</h1>
      <h2>In order to buy andd use your NFT you have to create a collection in your blockchain Account.</h2>
      <h2>If it is not allready done, this will also create you a FUSD Wallet in order to make payments.</h2>
      <div>
          <button class="glow-on-hover" onClick={handleActivateBigDaddyCollection}>Activate BigDaddyCollection</button>
        </div>
    </div>
  );
}

export default BigDaddyActivateAccountPage;
