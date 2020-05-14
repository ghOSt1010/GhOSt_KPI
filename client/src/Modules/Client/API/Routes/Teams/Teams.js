/**
 * @description Returns {String} of HTTP path requests
 */
const MAIN_PATH = '/api/teams';

export default class teamS {
   /**
    * @description HTTP GET
    */
   static GET_TEAMS = MAIN_PATH + '/';

   /**
    * @description HTTP GET
    */
   static GET_TEAM_BY_NAME = MAIN_PATH + '/name/';

   /**
    * @description HTTP GET
    */
   static GET_TEAM_BY_ID = MAIN_PATH + '/id/';

   /**
    * @description HTTP POST
    */
   static CREATE_NEW_TEAM = MAIN_PATH + '/';

   /**
    * @description HTTP PUT
    */
   static UPDATE_TEAM = MAIN_PATH + '/';

   /**
    * @description HTTP DELETE => +team.ID
    */
   static DELETE_TEAM_BY_ID = MAIN_PATH + '/';
}
