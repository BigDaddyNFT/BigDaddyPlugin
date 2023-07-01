export const BUY_NFT_TX = `import BigDaddyContract from 0x8bcea0856b99b24b
import FUSD from 0xe223d8a629e49c68
import FungibleToken from 0x9a0766d93b6608b7

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