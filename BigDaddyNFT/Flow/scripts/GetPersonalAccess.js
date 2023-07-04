export const GET_PERSONNAL_ACCESS_SCRIPT = `import BigDaddyContractv1 from 0x8bcea0856b99b24b

pub fun main(address: Address, siteId :String): Bool? {
  let account = getAccount(address)

  let ref = account.getCapability<&{BigDaddyContractv1.CollectionPublic}>(BigDaddyContractv1.CollectionPublicPath).borrow()
  
   if let vaultRef = ref {
    return vaultRef.getPersonalAccess(siteID: siteId)
  } else {
    return nil
  }
}
`;