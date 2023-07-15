export const GET_SALE_LIST_SCRIPT = `import BigDaddyContract from 0xd75dc7fd8d3cd8f4

pub fun main(siteId :String): {UInt32 : UFix64?} {

    return BigDaddyContract.listNFTsToSell(siteID: siteId)
  
}
`;