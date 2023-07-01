export const GET_TEMPLATE_BY_SITE_SCRIPT = `
import BigDaddyContract from 0x8bcea0856b99b24b

pub fun main(siteId :String): BigDaddyContract.Template? {

    return BigDaddyContract.getTemplate(siteID: siteId)
  
}
`;
