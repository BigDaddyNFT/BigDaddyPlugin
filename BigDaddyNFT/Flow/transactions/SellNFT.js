export const SELL_BIG_DADDY_NFT_TX = `import BigDaddyContract from 0xe3fc00107f99cc50
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