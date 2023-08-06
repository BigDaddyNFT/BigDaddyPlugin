export const BUY_2ND_Hand_NFT_TX = `import BigDaddyContract from 0xe3fc00107f99cc50
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import FiatToken from 0xa983fecbed621163

transaction(siteID: String, templateNumber: UInt32, price: UFix64) {
    let receiverReference: &BigDaddyContract.Collection{BigDaddyContract.Receiver}
    let buyer: AuthAccount
    let template : BigDaddyContract.getTemplate(siteID: siteId)
    let sentVault: @FungibleToken.Vault
  
      prepare(signer: AuthAccount) {
        self.template = BigDaddyContract.getTemplate(siteID: siteId) ?? panic("No way to find template to buy")

        self.receiverReference = signer.borrow<&BigDaddyContract.Collection{BigDaddyContract.Receiver}>(from: BigDaddyContract.CollectionStoragePath) 
              ?? panic("Cannot borrow")
    
        if (self.template.token == "USDC"){
          // Get a reference to the signer's stored vault
          let vaultRef = signer.borrow<&FiatToken.Vault>(from: FiatToken.VaultStoragePath)
              ?? panic("Could not borrow reference to the owner's Vault!")
          self.sentVault <- vaultRef.withdraw(amount: price)
        }
        else {
          // Get a reference to the signer's stored vault
          let vaultRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
              ?? panic("Could not borrow reference to the owner's Vault!")
          self.sentVault <- vaultRef.withdraw(amount: price)
        }
      }
  
  
    execute {
      let nFT <- BigDaddyContract.buyNFTSecondHand(sentVault: <-self.sentVault, siteID: siteID, templateNumber: templateNumber)
      self.receiverReference.deposit(token: <- nFT)
    }
  }`;