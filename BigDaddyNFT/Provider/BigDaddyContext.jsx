// BigDaddyContext.js

import { useState, createContext, useContext, useEffect } from 'react';
import BigDaddyTransactions from '../Flow/BigDaddyTransactions';
import BigDaddyScripts from '../Flow/BigDaddyScripts';
import { useNavigate } from 'react-router-dom';

const BigDaddyContext = createContext();

export function useBigDaddyContext() {
  return useContext(BigDaddyContext);
}

export function BigDaddyProvider({ children, siteId, pathAfterAuth, nftImagePath, logoImagePath, creatorPathAfterAuth }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPersonnalAccess, setHasPersonnalAccess] = useState(false);
  const [isCollectionEnabled, setIsCollectionEnabled] = useState(false);
  const [nftTemplate, setNFTTemplate] = useState(null);
  const [user, setUser] = useState(null);
  const [isBigDaddyLoading, setIsBigDaddyLoading] = useState(false);
  const [isBigDaddyErrorModalOpen, setIsBigDaddyErrorModalOpen] = useState(false);
  const [bigDaddyErrorMessage, setBigDaddyErrorMessage] = useState("");
  const [flowBalance, setFlowBalance] = useState(0.0);
  const [usdcBalance, setUsdcBalance] = useState(0.0);
  const [nftList, setNFTList] = useState([]);
  const [saleList, setSaleList] = useState({});
  const [needRefresh, setNeedRefresh] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  const nftimagePath = nftImagePath;
  const logoimagePath = logoImagePath;

  const bigDaddyScripts = new BigDaddyScripts();
  const bigDaddyTransactions = new BigDaddyTransactions();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      hasBigDaddyCollection();
      getBigDaddyTemplate();
      getPersonnalAccess();
      getBalance();
      getPersonnalBigDaddyNFTList();
      getSaleList();
      }

  }, [user,needRefresh]);

  const validateLoggedIn = (myuser) => {

    if (user == null) {
      setUser(myuser);
      setIsLoggedIn(true);
    }
  };

  const disconnect = () => {
    if (user !== null) {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const hasBigDaddyCollection = async () => {
    setIsBigDaddyLoading(true);
    try {
      const collectionExists = await bigDaddyScripts.hasBigDaddyCollection(user.addr);
      setIsCollectionEnabled(collectionExists);
    } catch (error) {
      setBigDaddyErrorMessage(error.message);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
    }
  };

  const getBalance = async () => {
    setIsBigDaddyLoading(true);
    try {
      const flowBalance = await bigDaddyScripts.getFLOWBalance(user.addr);
      const usdcBalance = await bigDaddyScripts.getUSDCBalance(user.addr);
      setFlowBalance(flowBalance);
      setUsdcBalance(usdcBalance);
    } catch (error) {
      setBigDaddyErrorMessage(error.message);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
    }
  };

  const getPersonnalBigDaddyNFTList = async () => {
    setIsBigDaddyLoading(true);
    try {
      const nftList = await bigDaddyScripts.getPersonnalBigDaddyNFTList(siteId, user.addr);
      setNFTList(nftList);
    } catch (error) {
      setBigDaddyErrorMessage(error.message);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
    }
  };

  const getSaleList = async () => {
    setIsBigDaddyLoading(true);
    try {
      const NFTList = await bigDaddyScripts.getBigDaddySaleList(siteId);
      setSaleList(NFTList);
    } catch (error) {
      setBigDaddyErrorMessage(error.message);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
    }
  };

  const getBigDaddyTemplate = async () => {
    setIsBigDaddyLoading(true);
    try {
      const template = await bigDaddyScripts.getTemplatebySiteId(siteId);
      if (user.addr === template.creator) {
        setIsCreator(true);
      }
      else{
        setIsCreator(false);
      }
      setNFTTemplate(template);
    } catch (error) {
      setBigDaddyErrorMessage(error.message);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
    }
  };

  const getPersonnalAccess = async () => {
    setIsBigDaddyLoading(true);
    try {
      const personalAccess = await bigDaddyScripts.getPersonnalAccess(siteId, user.addr);
      setHasPersonnalAccess(personalAccess);
    } catch (error) {
      setBigDaddyErrorMessage(error.message);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
    }
  };

  const handleActivateBigDaddyCollection = async () => {
    setIsBigDaddyLoading(true);
    try {
      await bigDaddyTransactions.enableBigDaddyCollection();
      setIsCollectionEnabled(hasBigDaddyCollection);
    } catch (error) {
      setBigDaddyErrorMessage(error.message);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
    }
  };

  const handleBuyNFT = async () => {
    setIsBigDaddyLoading(true);
    try {
      await bigDaddyTransactions.buyBigDaddyNFT(siteId);
      getPersonnalAccess();
    } catch (error) {
      setBigDaddyErrorMessage(error.message);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
      setNeedRefresh(true);
    }
  };

  const handleBuySecondHandNFT = async (sellTemplateNumber, price) => {
    setIsBigDaddyLoading(true);
    try {
      await bigDaddyTransactions.buySecondHandBigDaddyNFT(siteId, sellTemplateNumber, price);
      getPersonnalAccess();
    } catch (error) {
      setBigDaddyErrorMessage(error.message);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
      setNeedRefresh(true);
    }
  };

  const handleSellNFT = async (sellTemplateNumber, sellPrice) => {
    setIsBigDaddyLoading(true);
    try {
      await bigDaddyTransactions.sellBigDaddyNFT(siteId, sellTemplateNumber, sellPrice);
      getPersonnalAccess();
    } catch (error) {
      setBigDaddyErrorMessage(error.message);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
      setNeedRefresh(true);
    }
  };

  const closeBigDaddyErrorModal = () => {
    setIsBigDaddyErrorModalOpen(false);
    setBigDaddyErrorMessage("");
  };
  
  const redirectAfterAuth = () => {
  navigate(pathAfterAuth);
};

const redirectCreatorAfterAuth = () => {
  navigate(creatorPathAfterAuth);
};

const finishRefresh = () => {
  setNeedRefresh(false);
};



  return (
    <BigDaddyContext.Provider value={{ bigDaddyErrorMessage,
                                      logoimagePath, 
                                      isBigDaddyLoading, 
                                      isBigDaddyErrorModalOpen, 
                                      isLoggedIn, 
                                      hasPersonnalAccess, 
                                      isCollectionEnabled,
                                      nftTemplate, 
                                      nftimagePath,
                                      nftList,
                                      saleList,
                                      flowBalance,
                                      usdcBalance,
                                      user,
                                      needRefresh,
                                      isCreator,
                                      validateLoggedIn, 
                                      disconnect, 
                                      handleBuyNFT, 
                                      handleActivateBigDaddyCollection, 
                                      redirectAfterAuth,
                                      redirectCreatorAfterAuth,
                                      closeBigDaddyErrorModal,
                                      handleSellNFT,
                                      handleBuySecondHandNFT,
                                      finishRefresh }}>
      {children}
    </BigDaddyContext.Provider>
  );
}
