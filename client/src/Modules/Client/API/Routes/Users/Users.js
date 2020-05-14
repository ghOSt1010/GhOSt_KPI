/**
 * @description Returns {String} of HTTP path requests
 */
const MAIN_PATH = '/api/users';

export default class Users {
   static UPDATE_USER = MAIN_PATH + '/';
   static CREATE_NEW_USER = MAIN_PATH + '/create/';
   static DELETE_USER = MAIN_PATH + '/';
   static LOGIN = MAIN_PATH + '/login/';
   static GET_CURRENT_USER = MAIN_PATH + '/current/';
   static GET_ALL_USERS = MAIN_PATH + '/';
}
