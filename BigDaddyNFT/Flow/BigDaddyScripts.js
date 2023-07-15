import * as fcl from "@onflow/fcl"

// Importez vos scripts Cadence
import { HAS_BIGDADDY_COLLECTION_SCRIPT } from "./scripts/HasBigDaddyCollection"
import { GET_PERSONNAL_ACCESS_SCRIPT } from "./scripts/GetPersonalAccess"
import { GET_TEMPLATE_BY_SITE_SCRIPT } from "./scripts/GetTemplatebySite"
import { GET_PERSONNAL_NFT_LIST_SCRIPT } from "./scripts/GetNFTList"
import { GET_SALE_LIST_SCRIPT } from "./scripts/GetSaleList"
import { GET_FUSD_BALANCE } from "./scripts/GetFUSDBalance"

// import { YOUR_SECOND_SCRIPT } from './path_to_your_second_script'
// import { YOUR_THIRD_SCRIPT } from './path_to_your_third_script'

class BigDaddyScripts {

  async executeScript(cadenceCode, args = []) {
    const response = await fcl.send([
      fcl.script(cadenceCode),
      args,
    ])

    return fcl.decode(response)
  }

  async getPersonnalAccess(siteId, addr) {
    let args = fcl.args([
      fcl.arg(addr, fcl.t.Address),
      fcl.arg(siteId, fcl.t.String)
    ])
    return this.executeScript(GET_PERSONNAL_ACCESS_SCRIPT, args)
  }

  async getTemplatebySiteId(siteId) {
    let args = fcl.args([
      fcl.arg(siteId, fcl.t.String)
    ])
    return this.executeScript(GET_TEMPLATE_BY_SITE_SCRIPT, args)
  }

  async hasBigDaddyCollection(addr) {
    let args = fcl.args([
      fcl.arg(addr, fcl.t.Address)
    ])
    return this.executeScript(HAS_BIGDADDY_COLLECTION_SCRIPT, args)
  }

  async getFUSDBalance(addr) {
    let args = fcl.args([
      fcl.arg(addr, fcl.t.Address)
    ])
    return this.executeScript(GET_FUSD_BALANCE, args)
  }

  async getPersonnalBigDaddyNFTList(siteId, addr) {
    let args = fcl.args([
      fcl.arg(addr, fcl.t.Address),
      fcl.arg(siteId, fcl.t.String)
    ])
    return this.executeScript(GET_PERSONNAL_NFT_LIST_SCRIPT, args)
  }

  async getBigDaddySaleList(siteId) {
    let args = fcl.args([
      fcl.arg(siteId, fcl.t.String)
    ])
    return this.executeScript(GET_SALE_LIST_SCRIPT, args)
  }

}

export default BigDaddyScripts
