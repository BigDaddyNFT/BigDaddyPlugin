export const GET_TEMPLATE_BY_SITE_SCRIPT = `
import BigDaddyContract from 0xd75dc7fd8d3cd8f4

pub fun main(siteId :String): BigDaddyContract.Template? {

    return BigDaddyContract.getTemplate(siteID: siteId)
  
}
`;
