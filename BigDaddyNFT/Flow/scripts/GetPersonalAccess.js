export const GET_PERSONNAL_ACCESS_SCRIPT = `import BigDaddyContract from 0x8bcea0856b99b24b

pub fun main(address: Address, siteId :String): Bool? {
  let account = getAccount(address)

  let ref = account.getCapability<&{BigDaddyContract.CollectionPublic}>(BigDaddyContract.CollectionPublicPath).borrow()
  
   if let vaultRef = ref {
    return vaultRef.getPersonalAccess(siteID: siteId)
  } else {
    return nil
  }
}
`;