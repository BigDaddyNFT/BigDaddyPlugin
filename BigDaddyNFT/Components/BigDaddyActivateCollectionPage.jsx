import React from "react";
import '../BigDaddyCSS.css';

function BigDaddyActivateAccountPage({ handleActivateBigDaddyCollection, fusdBalance, handleLogOut, user, logoimagePath}) {
  return (
    <div className="bigDaddyContainer">
      <div className="userProfile">
        <p>Address: {user.addr}</p>
        <p>FUSD Balance: {fusdBalance}</p>
        <button onClick={handleLogOut} className="bigdaddy-button">Log Out</button>
      </div>
      <img src={logoimagePath} width={"300px"} height={"150px"}/>
      <h1>Activate your NFT Collection</h1>
      <h2>In order to buy andd use your NFT you have to create a collection in your blockchain Account.</h2>
      <h2>If it is not allready done, this will also create you a FUSD Wallet in order to make payments.</h2>
      <div>
          <button className="bigdaddy-button" onClick={handleActivateBigDaddyCollection}>Activate BigDaddyCollection</button>
        </div>
    </div>
  );
}

export default BigDaddyActivateAccountPage;
