export const GET_USDC_BALANCE = `import FungibleToken from 0x9a0766d93b6608b7
import FiatToken from 0xa983fecbed621163

pub fun main(account: Address): UFix64 {
    let acct = getAccount(account)
    let vaultRef = acct.getCapability(FiatToken.VaultBalancePubPath)
        .borrow<&FiatToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}
`;