export const BUY_2ND_Hand_NFT_TX = `import BigDaddyContract from 0xd75dc7fd8d3cd8f4

transaction(siteID: String, templateNumber: UInt32) {
    let receiverReference: &BigDaddyContract.Collection{BigDaddyContract.Receiver}
    let buyer: AuthAccount
  
    prepare(acct: AuthAccount) {
      self.receiverReference = acct.borrow<&BigDaddyContract.Collection{BigDaddyContract.Receiver}>(from: BigDaddyContract.CollectionStoragePath) 
          ?? panic("Cannot borrow")
        self.buyer = acct
    }
  
    execute {
      BigDaddyContract.buyNFTSecondHand(buyerAccount: self.buyer, siteID: siteID, templateNumber: templateNumber)
    }
  }`;