export const HAS_BIGDADDY_COLLECTION_SCRIPT = `import BigDaddyContract from 0x8bcea0856b99b24b

pub fun main(addr: Address): Bool {
    
   if let myref = getAccount(addr).getCapability(BigDaddyContract.CollectionPublicPath).borrow<&{BigDaddyContract.CollectionPublic}>()
   {
    return true
   }
   
   return false
        
}`;