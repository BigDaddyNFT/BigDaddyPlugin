export const GET_TEMPLATE_BY_SITE_SCRIPT = `
import BigDaddyContract from 0xe3fc00107f99cc50

pub fun main(siteId :String): BigDaddyContract.Template? {

return BigDaddyContract.getTemplate(siteID: siteId)
  
}
`;
