// BigDaddyComponent.js

import { useBigDaddyContext } from '../Provider/BigDaddyContext.jsx';
import React, { useEffect } from 'react';
import * as fcl from "@onflow/fcl";
import BigDaddyNFTBuyerPage from './BigDaddyNFTBuyerPage.jsx';
import BigDaddyActivateCollectionPage from './BigDaddyActivateCollectionPage.jsx';
import BigDaddyLoginPage from './BigDaddyLoginPage.jsx';


const BigDaddyComponent = () => {
  const { bigDaddyErrorMessage,
          isBigDaddyLoading,
          isBigDaddyErrorModalOpen,
          isLoggedIn,
          hasPersonnalAccess,
          isCollectionEnabled,
          nftTemplate,
          nftImagePath,
          validateLoggedIn,
          disconnect,
          handleBuyNFT,
          handleActivateBigDaddyCollection,
          redirectAfterAuth,
          closeBigDaddyErrorModal } = useBigDaddyContext();

  useEffect(() => {
    const userSubscription = fcl.currentUser.subscribe((currentUser) => {
      if (currentUser.cid) {

        validateLoggedIn(currentUser);

      } else {
        disconnect();
      }
    });

  }, [validateLoggedIn, disconnect]);

  const handleLogOut = () => {
    fcl.unauthenticate();
  };

  const bigdaddyhandleLogIn = () => {
    fcl.logIn();
  };

  const bigDaddyLoadingStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)", // Plus sombre pour faire ressortir le texte
    zIndex: 1000, // Pour être sûr que le modal est bien au-dessus du reste
  };

  return (
    <div>
      <div>
        {isBigDaddyLoading ? (
          <div style={bigDaddyLoadingStyle}>
            <div class="waviy">
              <span style={{ "--i": 1 }}>L</span>
              <span style={{ "--i": 2 }}>o</span>
              <span style={{ "--i": 3 }}>a</span>
              <span style={{ "--i": 4 }}>d</span>
              <span style={{ "--i": 5 }}>i</span>
              <span style={{ "--i": 6 }}>n</span>
              <span style={{ "--i": 7 }}>g</span>
              <span style={{ "--i": 8 }}>.</span>
              <span style={{ "--i": 8 }}>.</span>
              <span style={{ "--i": 8 }}>.</span>
            </div>
          </div>
        ) : null}

        {isBigDaddyErrorModalOpen ? (
          <div style={bigDaddyLoadingStyle}>
            <div className="modal">
              <div className="modal__content">
                <h1>Error</h1>
                <p>{bigDaddyErrorMessage}</p>
                <button onClick={closeBigDaddyErrorModal} className="modal__close">&times;</button>
              </div>
            </div>
          </div>
        ) : null}

      </div>
      <div>
      {isLoggedIn ? (!isCollectionEnabled ? (
        <BigDaddyActivateCollectionPage
          handleActivateBigDaddyCollection={handleActivateBigDaddyCollection} />
      ) :
        (
          <BigDaddyNFTBuyerPage
            handleBuyNFT={handleBuyNFT}
            nftTemplate={nftTemplate}
            handleLogOut={handleLogOut}
            hasPersonnalAccess={hasPersonnalAccess} 
            redirectAfterAuth = {redirectAfterAuth}
            nftImagePath = {nftImagePath}/>
        )
      ) : (
        <BigDaddyLoginPage
          bigdaddyhandleLogIn={bigdaddyhandleLogIn}
        />
      )}
    </div>
    </div>
  );
};


export default BigDaddyComponent;