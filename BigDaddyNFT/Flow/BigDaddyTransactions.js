import * as fcl from "@onflow/fcl"

// Importez vos transactions Cadence
import { ENABLE_BIGDADDY_COLLECTION_TX } from './transactions/EnableBigDaddyCollection'
import { BUY_NFT_TX } from "./transactions/BuyNFT"
import { BUY_2ND_Hand_NFT_TX } from "./transactions/BuySecondHandNFT"
import { SELL_BIG_DADDY_NFT_TX } from "./transactions/SellNFT"

class BigDaddyTransactions {

  async sendTransaction(cadenceCode, args) {
    const response = await fcl.send([
      fcl.transaction(cadenceCode),
      args,
      fcl.proposer(fcl.currentUser().authorization),
      fcl.payer(fcl.currentUser().authorization),
      fcl.limit(9999),
      fcl.authorizations([               // add this
        fcl.currentUser().authorization  // add this
      ]),
    ])

    const transactionId = await fcl.decode(response)

    await fcl.tx(transactionId).onceSealed()

    return transactionId
  }

  // Créez des fonctions distinctes pour chaque transaction
  async enableBigDaddyCollection() {
    let args = fcl.args([])
    return this.sendTransaction(ENABLE_BIGDADDY_COLLECTION_TX, args)
  }

  async buyBigDaddyNFT(siteId) {
    let args = fcl.args([
      fcl.arg(siteId, fcl.t.String)
    ])
    return this.sendTransaction(BUY_NFT_TX, args)
  }

  async sellBigDaddyNFT(siteId, sellTemplateNumber, sellPrice) {
    let args = fcl.args([
      fcl.arg(siteId, fcl.t.String),
      fcl.arg(sellTemplateNumber, fcl.t.UInt32),
      fcl.arg(sellPrice, fcl.t.UFix64)
    ])
    return this.sendTransaction(SELL_BIG_DADDY_NFT_TX, args)
  }

  async buySecondHandBigDaddyNFT(siteId, templateNumber, price) {
    let args = fcl.args([
      fcl.arg(siteId, fcl.t.String),
      fcl.arg(templateNumber, fcl.t.UInt32),
      fcl.arg(price, fcl.t.UFix64)
    ])
    return this.sendTransaction(BUY_2ND_Hand_NFT_TX, args)
  }

}

export default BigDaddyTransactions
