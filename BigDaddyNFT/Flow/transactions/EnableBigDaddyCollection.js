export const ENABLE_BIGDADDY_COLLECTION_TX = `import BigDaddyContract from 0xd75dc7fd8d3cd8f4
import FUSD from 0xe223d8a629e49c68
import FungibleToken from 0x9a0766d93b6608b7

transaction {
  prepare(acct: AuthAccount) {

    if(acct.borrow<&BigDaddyContract.Collection>(from: BigDaddyContract.CollectionStoragePath) != nil) {
      return 
    }

    let collection <- BigDaddyContract.createEmptyCollection()
    acct.save<@BigDaddyContract.Collection>(<-collection, to: BigDaddyContract.CollectionStoragePath)
    acct.link<&{BigDaddyContract.CollectionPublic}>(BigDaddyContract.CollectionPublicPath, target: BigDaddyContract.CollectionStoragePath)
    acct.link<&{BigDaddyContract.MinterCollectionPublic}>(BigDaddyContract.MinterCollectionPublicPath, target: BigDaddyContract.CollectionStoragePath)
    acct.link<&{BigDaddyContract.Receiver}>(BigDaddyContract.ReceiverPublicPath, target: BigDaddyContract.CollectionStoragePath)
    acct.link<&{BigDaddyContract.Provider}>(BigDaddyContract.ProviderPublicPath, target: BigDaddyContract.CollectionStoragePath)
    
    if(acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) != nil) {
      return
    }
  
    acct.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

    acct.link<&FUSD.Vault{FungibleToken.Receiver}>(
      /public/fusdReceiver,
      target: /storage/fusdVault
    )

    acct.link<&FUSD.Vault{FungibleToken.Balance}>(
      /public/fusdBalance,
      target: /storage/fusdVault
    )

    acct.link<&FUSD.Vault{FungibleToken.Provider}>(
      /public/fusdProvider,
      target: /storage/fusdVault
    )

  }
}`;