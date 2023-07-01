// BigDaddyContext.js

import { useState, createContext, useContext, useEffect } from 'react';
import BigDaddyTransactions from '../Flow/BigDaddyTransactions';
import BigDaddyScripts from '../Flow/BigDaddyScripts';
import { useNavigate } from 'react-router-dom';

const BigDaddyContext = createContext();

export function useBigDaddyContext() {
  return useContext(BigDaddyContext);
}

export function BigDaddyProvider({ children, siteId, pathAfterAuth, imagePath }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPersonnalAccess, setHasPersonnalAccess] = useState(false);
  const [isCollectionEnabled, setIsCollectionEnabled] = useState(false);
  const [nftTemplate, setNFTTemplate] = useState(null);
  const [user, setUser] = useState(null);
  const [isBigDaddyLoading, setIsBigDaddyLoading] = useState(false);
  const [isBigDaddyErrorModalOpen, setIsBigDaddyErrorModalOpen] = useState(false);
  const [bigDaddyErrorMessage, setBigDaddyErrorMessage] = useState("");
  const nftImagePath = imagePath;

  const bigDaddyScripts = new BigDaddyScripts();
  const bigDaddyTransactions = new BigDaddyTransactions();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      hasBigDaddyCollection();
      getBigDaddyTemplate();
      getPersonnalAccess();
    }
  }, [user]);

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
      setBigDaddyErrorMessage(error);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
    }
  };

  const getBigDaddyTemplate = async () => {
    setIsBigDaddyLoading(true);
    try {
      const template = await bigDaddyScripts.getTemplatebySiteId(siteId);
      setNFTTemplate(template);
    } catch (error) {
      setBigDaddyErrorMessage(error);
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
      setBigDaddyErrorMessage(error);
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
      setBigDaddyErrorMessage(error);
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
      setBigDaddyErrorMessage(error);
      setIsBigDaddyErrorModalOpen(true);
    } finally {
      setIsBigDaddyLoading(false);
    }
  };

  const closeBigDaddyErrorModal = () => {
    setIsBigDaddyErrorModalOpen(false);
    setBigDaddyErrorMessage("");
  };
  
  const redirectAfterAuth = () => {
  navigate(pathAfterAuth);
};

  return (
    <BigDaddyContext.Provider value={{ bigDaddyErrorMessage, 
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
                                      closeBigDaddyErrorModal }}>
      {children}
    </BigDaddyContext.Provider>
  );
}
