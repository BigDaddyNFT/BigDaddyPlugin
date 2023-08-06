export const GET_PERSONNAL_NFT_LIST_SCRIPT = `import BigDaddyContract from 0xe3fc00107f99cc50

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