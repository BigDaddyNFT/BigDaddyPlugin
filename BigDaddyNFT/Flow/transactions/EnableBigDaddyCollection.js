export const ENABLE_BIGDADDY_COLLECTION_TX = `import BigDaddyContractv1 from 0x8bcea0856b99b24b
import FUSD from 0xe223d8a629e49c68
import FungibleToken from 0x9a0766d93b6608b7

transaction {
  prepare(acct: AuthAccount) {

    if(acct.borrow<&BigDaddyContractv1.Collection>(from: BigDaddyContractv1.CollectionStoragePath) != nil) {
      return 
    }

    let collection <- BigDaddyContractv1.createEmptyCollection()
    acct.save<@BigDaddyContractv1.Collection>(<-collection, to: BigDaddyContractv1.CollectionStoragePath)
    acct.link<&{BigDaddyContractv1.CollectionPublic}>(BigDaddyContractv1.CollectionPublicPath, target: BigDaddyContractv1.CollectionStoragePath)
    acct.link<&{BigDaddyContractv1.MinterCollectionPublic}>(BigDaddyContractv1.MinterCollectionPublicPath, target: BigDaddyContractv1.CollectionStoragePath)
    acct.link<&{BigDaddyContractv1.Receiver}>(BigDaddyContractv1.ReceiverPublicPath, target: BigDaddyContractv1.CollectionStoragePath)

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