export const GET_SALE_LIST_SCRIPT = `import BigDaddyContract from 0xe3fc00107f99cc50

pub fun main(siteId :String): {UInt32 : UFix64?} {

    return BigDaddyContract.listNFTsToSell(siteID: siteId)
  
}
`;