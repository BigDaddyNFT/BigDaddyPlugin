export const SELL_BIG_DADDY_NFT_TX = `import BigDaddyContract from 0xd75dc7fd8d3cd8f4
transaction(siteID: String, templateNumber: UInt32, price: UFix64) {
    let seller: AuthAccount
  
    prepare(acct: AuthAccount) {
        self.seller = acct
    }
  
    execute {
      BigDaddyContract.sellNFT(account: self.seller, siteID: siteID, templateNumber: templateNumber, price: price)
    }
  }
`;