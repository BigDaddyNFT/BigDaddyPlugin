export const BUY_NFT_TX = `import BigDaddyContract from 0xe3fc00107f99cc50
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import FiatToken from 0xa983fecbed621163

transaction(siteId: String) {
  let receiverReference: &BigDaddyContract.Collection{BigDaddyContract.Receiver}
  let template : BigDaddyContract.Template
  let sentVault: @FungibleToken.Vault

  prepare(signer: AuthAccount) {
    self.template = BigDaddyContract.getTemplate(siteID: siteId) ?? panic("No way to find template to buy")

    self.receiverReference = signer.borrow<&BigDaddyContract.Collection{BigDaddyContract.Receiver}>(from: BigDaddyContract.CollectionStoragePath) 
          ?? panic("Cannot borrow")

    if (self.template.token == "USDC"){
      // Get a reference to the signer's stored vault
      let vaultRef = signer.borrow<&FiatToken.Vault>(from: FiatToken.VaultStoragePath)
          ?? panic("Could not borrow reference to the owner's Vault!")
      self.sentVault <- vaultRef.withdraw(amount: self.template.price)
    }
    else {
      // Get a reference to the signer's stored vault
      let vaultRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
          ?? panic("Could not borrow reference to the owner's Vault!")
      self.sentVault <- vaultRef.withdraw(amount: self.template.price)
    }
  }

  execute {
    let newNFT <- BigDaddyContract.buyBigDaddyNFT(siteID: siteId, sentVault: <-self.sentVault)
    self.receiverReference.deposit(token: <- newNFT)
  }
}`;
