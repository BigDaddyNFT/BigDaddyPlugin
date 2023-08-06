import React from "react";
import '../BigDaddyCSS.css';
import { useBigDaddyContext } from '../Provider/BigDaddyContext.jsx';
import UserProfile from "./BigDaddyAccountDetails";


function BigDaddyActivateAccountPage() {
  const { 
    handleActivateBigDaddyCollection,
    logoimagePath} = useBigDaddyContext();

  return (
    <div className="bigDaddyContainer">
    <UserProfile/>
      <img src={logoimagePath} width={"300px"} height={"150px"} alt={"logo"}/>
      <h1 style={{color : 'white'}}>Activate your NFT Collection</h1>
      <h2 style={{color : 'white'}}>In order to buy and use your NFT you have to create a collection in your blockchain Account.</h2>
      <h2 style={{color : 'white'}}>If it is not already done, this will also create you a FLOW and USDC Account in order to make payments.</h2>
      <div>
          <button className="bigdaddy-button" onClick={handleActivateBigDaddyCollection}>Activate BigDaddyCollection</button>
        </div>
    </div>
  );
}

export default BigDaddyActivateAccountPage;
