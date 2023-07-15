export const GET_PERSONNAL_NFT_LIST_SCRIPT = `import BigDaddyContract from 0xd75dc7fd8d3cd8f4

pub fun main(address: Address, siteId :String): [UInt32] {
    let account = getAccount(address)
  
    let ref = account.getCapability<&{BigDaddyContract.CollectionPublic}>(BigDaddyContract.CollectionPublicPath).borrow()
    
     if let accountRef = ref {
      return accountRef.getNFTsBySiteID(siteID: siteId)
    } else {
      return []
    }
  }
`;