export const HAS_BIGDADDY_COLLECTION_SCRIPT = `import BigDaddyContractv1 from 0x8bcea0856b99b24b

pub fun main(addr: Address): Bool {
    
   if let myref = getAccount(addr).getCapability(BigDaddyContractv1.CollectionPublicPath).borrow<&{BigDaddyContractv1.CollectionPublic}>()
   {
    return true
   }
   
   return false
        
}`;