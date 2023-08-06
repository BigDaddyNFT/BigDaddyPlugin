export const ENABLE_BIGDADDY_COLLECTION_TX = `import BigDaddyContract from 0xe3fc00107f99cc50
import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7
import FiatToken from 0xa983fecbed621163

transaction {
  prepare(signer: AuthAccount) {

    if(signer.borrow<&BigDaddyContract.Collection>(from: BigDaddyContract.CollectionStoragePath) == nil) {
        
      let collection <- BigDaddyContract.createEmptyCollection()
      signer.save<@BigDaddyContract.Collection>(<-collection, to: BigDaddyContract.CollectionStoragePath)
      signer.link<&{BigDaddyContract.CollectionPublic}>(BigDaddyContract.CollectionPublicPath, target: BigDaddyContract.CollectionStoragePath)
      signer.link<&{BigDaddyContract.MinterCollectionPublic}>(BigDaddyContract.MinterCollectionPublicPath, target: BigDaddyContract.CollectionStoragePath)
      signer.link<&{BigDaddyContract.Receiver}>(BigDaddyContract.ReceiverPublicPath, target: BigDaddyContract.CollectionStoragePath)
      signer.link<&{BigDaddyContract.Provider}>(BigDaddyContract.ProviderPublicPath, target: BigDaddyContract.CollectionStoragePath)
    
    }

    if signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) == nil {
      // Create a new flowToken Vault and put it in storage
      signer.save(<-FlowToken.createEmptyVault(), to: /storage/flowTokenVault)

      // Create a public capability to the Vault that only exposes
      // the deposit function through the Receiver interface
      signer.link<&FlowToken.Vault{FungibleToken.Receiver}>(
          /public/flowTokenReceiver,
          target: /storage/flowTokenVault
      )

      // Create a public capability to the Vault that only exposes
      // the balance field through the Balance interface
      signer.link<&FlowToken.Vault{FungibleToken.Balance}>(
          /public/flowTokenBalance,
          target: /storage/flowTokenVault
      )
    }

    // Return early if the account already stores a FiatToken Vault
    if signer.borrow<&FiatToken.Vault>(from: FiatToken.VaultStoragePath) == nil {

      // Create a new ExampleToken Vault and put it in storage
      signer.save(
          <-FiatToken.createEmptyVault(),
          to: FiatToken.VaultStoragePath
      )

      // Create a public capability to the Vault that only exposes
      // the deposit function through the Receiver interface
      signer.link<&FiatToken.Vault{FungibleToken.Receiver}>(
          FiatToken.VaultReceiverPubPath,
          target: FiatToken.VaultStoragePath
      )

      // Create a public capability to the Vault that only exposes
      // the UUID() function through the VaultUUID interface
      signer.link<&FiatToken.Vault{FiatToken.ResourceId}>(
          FiatToken.VaultUUIDPubPath,
          target: FiatToken.VaultStoragePath
      )

      // Create a public capability to the Vault that only exposes
      // the balance field through the Balance interface
      signer.link<&FiatToken.Vault{FungibleToken.Balance}>(
          FiatToken.VaultBalancePubPath,
          target: FiatToken.VaultStoragePath
      )

    }

  }
}`;