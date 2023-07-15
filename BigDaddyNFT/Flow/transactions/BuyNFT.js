export const BUY_NFT_TX = `import BigDaddyContract from 0xd75dc7fd8d3cd8f4

transaction(siteID: String) {
  let receiverReference: &BigDaddyContract.Collection{BigDaddyContract.Receiver}
  let buyer: AuthAccount

  prepare(acct: AuthAccount) {
    self.receiverReference = acct.borrow<&BigDaddyContract.Collection{BigDaddyContract.Receiver}>(from: BigDaddyContract.CollectionStoragePath) 
        ?? panic("Cannot borrow")
      self.buyer = acct
  }

  execute {
    let newNFT <- BigDaddyContract.buyBigDaddyNFT(siteID: siteID, buyer: self.buyer)
    if newNFT == nil {
        panic("Could not buy the NFT")
   }
      self.receiverReference.deposit(token: <- newNFT!)
  }
}`;