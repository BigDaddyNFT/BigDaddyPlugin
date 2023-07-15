import React, { useState, useEffect } from "react";
import "../BigDaddyCSS.css";

function BigDaddyNFTBuyerPage({
  handleBuyNFT,
  nftTemplate,
  handleLogOut,
  hasPersonnalAccess,
  redirectAfterAuth,
  nftimagePath,
  nftList,
  saleList,
  fusdBalance,
  handleSellNFT,
  handleBuySecondHandNFT,
  user,
  needRefresh,
  finishRefresh,
  isCreator,
  redirectCreatorAfterAuth,
  logoimagePath
}) {
  const [collectionName, setCollectionName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [selectedNft, setSelectedNft] = useState(null);
  const [selectedSaleNft, setSelectedSaleNft] = useState(null);
  const [sellPrice, setSellPrice] = useState(0.0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [limit, setLimit] = useState(0);
  const [bigdaddySaleList, setbigdaddySaleList] = useState({});
  const [bigdaddyNftList, setbigdaddyNftList] = useState([]);

  useEffect(() => {
    if (nftTemplate) {
      setCollectionName(nftTemplate.name);
      setPrice(nftTemplate.price);
      setLimit(nftTemplate.limit);
      setIsLimitReached(nftTemplate.minted === nftTemplate.limit);
      setbigdaddySaleList(saleList);
      let saleIds = new Set(Object.keys(bigdaddySaleList).map(Number));
      let unsoldNfts = [];
      for (let nft of nftList) {
        if (!saleIds.has(Number(nft))) {
          unsoldNfts.push(nft);
        }
      }
      setbigdaddyNftList(unsoldNfts);
    }

    if (needRefresh) {
      setbigdaddySaleList(saleList);
      let saleIds = new Set(Object.keys(bigdaddySaleList).map(Number));
      let unsoldNfts = [];
      for (let nft of nftList) {
        if (!saleIds.has(nft)) {
          unsoldNfts.push(nft);
        }
      }
      setbigdaddyNftList(unsoldNfts);
      finishRefresh();
      setSelectedNft(null);
      setSelectedSaleNft(null);
    }
  }, [nftTemplate, nftList, saleList, needRefresh]);

  return (
    <div className="bigDaddyContainer">
      <div className="activePage-header activePage-header-BuyerPage">
        <div className="userProfile">
          <p>Address: {user?.addr}</p>
          <p>FUSD Balance: {fusdBalance}</p>
          <button onClick={handleLogOut} className="bigdaddy-button logOut-AP">
            Log Out
          </button>
        </div>

        {hasPersonnalAccess && (
          <button
            onClick={redirectAfterAuth}
            className="bigdaddy-button websitePanel-btn">
            Go to my private Website
          </button>
        )}
        {isCreator && (
          <button
            onClick={redirectCreatorAfterAuth}
            className="bigdaddy-button websitePanel-btn">
            Go to my creator Page
          </button>
        )}
      </div>
      <div className="logo-wrapper-BP">
        <img
          src={logoimagePath}
          width={"300px"}
          height={"150px"}
        />
      </div>

      <h1 className="collectionName">{collectionName}</h1>

      <div className="contentContainer">
        <div className="left-container">
          <div className="bgdaddycolumn left leftcard-wrapper">
            <div>
              <div className={"nft-item selected"}>My personnal NFTs</div>
              {bigdaddyNftList.map((nft) => (
                <div
                  key={nft}
                  onClick={() => setSelectedNft(nft)}
                  className={`nft-item ${
                    selectedNft === nft ? "selected" : ""
                  }`}>
                  {"#" + nft.toString() + "/" + limit.toString()}
                </div>
              ))}
            </div>
          </div>
          {selectedNft && isLimitReached && (
            <div className="bigdaddy-left-table-footer">
              <div className="bigdaddy-label">
                <label htmlFor=""> Price (in FUSD): </label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  min={0}
                  className="bigdaddy-input"
                  style={{ width: "100 px" }}
                />
              </div>
              <button
                onClick={() => handleSellNFT(selectedNft, sellPrice)}
                className="bigdaddy-button  sell-Nfp-Btn">
                Sell NFT
              </button>
            </div>
          )}
        </div>

        <div className="bigdaddycolumn">
          <div className="helpCard">
            <img src={nftimagePath} alt="NFT" className="cardContent" />
          </div>
        </div>

        {isLimitReached && (
          <div className="left-container">
            <div className="bgdaddycolumn left leftcard-wrapper">
              <div>
                <div className={"nft-item selected"}>Buy NFT</div>
                {isLimitReached &&
                  Object.entries(bigdaddySaleList).map(([id, price]) => (
                    <div
                      key={id}
                      onClick={() => setSelectedSaleNft(id)}
                      className={`nft-item ${
                        selectedSaleNft === id ? "selected" : ""
                      }`}>
                      #{id}/{limit} : {price} FUSD
                    </div>
                  ))}
              </div>
            </div>
            {isLimitReached && selectedSaleNft && (
              <div className="bigdaddy-right-table-footer footer-right">
                <button
                  onClick={() => handleBuySecondHandNFT(selectedSaleNft)}
                  className="bigdaddy-button sell-Nfp-Btn">
                  Buy NFT
                </button>
              </div>
            )}
          </div>
        )}

            {!isLimitReached && (
              <div className="bigdaddy-right-table-footer footer-right">
                <button
                  onClick={() => handleBuyNFT()}
                  className="bigdaddy-button sell-Nfp-Btn">
                  Buy ${price} FUSD
                </button>
              </div>
            )}
      </div>
    </div>
  );
}

export default BigDaddyNFTBuyerPage;
