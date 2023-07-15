export const HAS_BIGDADDY_COLLECTION_SCRIPT = `import BigDaddyContract from 0xd75dc7fd8d3cd8f4

pub fun main(addr: Address): Bool {
    
   if let myref = getAccount(addr).getCapability(BigDaddyContract.CollectionPublicPath).borrow<&{BigDaddyContract.CollectionPublic}>()
   {
    return true
   }
   
   return false
        
}`;