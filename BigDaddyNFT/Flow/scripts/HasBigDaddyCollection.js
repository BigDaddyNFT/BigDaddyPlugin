export const HAS_BIGDADDY_COLLECTION_SCRIPT = `import BigDaddyContract from 0xe3fc00107f99cc50

pub fun main(addr: Address): Bool {
    
   if let myref = getAccount(addr).getCapability(BigDaddyContract.CollectionPublicPath).borrow<&{BigDaddyContract.CollectionPublic}>()
   {
    return true
   }
   
   return false
        
}`;