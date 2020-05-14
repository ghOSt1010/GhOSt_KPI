/**
 * @description Returns {String} of HTTP path requests
 */
const MAIN_PATH = '/api/projects';

export default class PROJECTS {
   /**
    * @description HTTP GET
    */
   static GET_PROJECTS = MAIN_PATH + '/';

   /**
    * @description HTTP GET
    */
   static GET_PROJECT_BY_NAME = MAIN_PATH + '/name/';

   /**
    * @description HTTP GET
    */
   static GET_PROJECT_BY_ID = MAIN_PATH + '/id/';

   /**
    * @description HTTP POST
    */
   static CREATE_NEW_PROEJCT = MAIN_PATH + '/';

   /**
    * @description HTTP PUT
    */
   static UPDATE_PROJECT = MAIN_PATH + '/';

   /**
    * @description HTTP DELETE => +PROJECT.ID
    */
   static DELETE_PROJECT_BY_ID = MAIN_PATH + '/';
}
