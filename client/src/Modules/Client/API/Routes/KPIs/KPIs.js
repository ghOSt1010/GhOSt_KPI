/**
 * @description Returns {String} of HTTP path requests
 */
const MAIN_PATH = '/api/kpi';

export default class KPI {
   /**
    * @description HTTP GET
    */
   static GET_KPIS = MAIN_PATH + '/';

   /**
    * @description HTTP GET
    */
   static GET_KPI_BY_ID = MAIN_PATH + '/id/';
   static GET_KPI_BY_PROJECT_ID = MAIN_PATH + '/project/';

   /**
    * @description HTTP POST
    */
   static CREATE_NEW_KPI = MAIN_PATH + '/';

   /**
    * @description HTTP PUT
    */
   static UPDATE_KPI = MAIN_PATH + '/';

   /**
    * @description HTTP DELETE => +KPI.ID
    */
   static DELETE_KPI_BY_ID = MAIN_PATH + '/';
}
