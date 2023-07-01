import React from 'react';
import '../BigDaddyCSS.css';

function BigDaddyNFTBuyerPage({ handleBuyNFT, nftTemplate, handleLogOut, hasPersonnalAccess, redirectAfterAuth, nftImagePath }) {
  
  const handleButtonClick = () => {
    if (hasPersonnalAccess) {
      redirectAfterAuth();
    } else {
      handleBuyNFT();
    }
  };

  return (
    <div className="bigDaddyContainer">
      <div className="title">BigDaddy NFT</div>
      <button onClick={handleLogOut} className="glow-on-hover logout">Log Out</button>
      <h1>{nftTemplate.name}</h1>

      <div className="contentContainer">
        <div className="helpCard">
          <img src={nftImagePath} alt="NFT" className="cardContent" />
        </div>
        
        <button onClick={handleButtonClick} className="glow-on-hover buy">
          {hasPersonnalAccess ? "Go to my private Website" : `Buy ${nftTemplate.price} FUSD`}
        </button>
      </div>
    </div>
  );
}

export default BigDaddyNFTBuyerPage;