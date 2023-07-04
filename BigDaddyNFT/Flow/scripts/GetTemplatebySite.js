export const GET_TEMPLATE_BY_SITE_SCRIPT = `
import BigDaddyContractv1 from 0x8bcea0856b99b24b

pub fun main(siteId :String): BigDaddyContractv1.Template? {

    return BigDaddyContractv1.getTemplate(siteID: siteId)
  
}
`;
