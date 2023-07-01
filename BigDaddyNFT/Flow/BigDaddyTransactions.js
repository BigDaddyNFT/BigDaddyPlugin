import * as fcl from "@onflow/fcl"

// Importez vos transactions Cadence
import { ENABLE_BIGDADDY_COLLECTION_TX } from './transactions/EnableBigDaddyCollection'
import { BUY_NFT_TX } from "./transactions/BuyNFT"

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

}

export default BigDaddyTransactions
