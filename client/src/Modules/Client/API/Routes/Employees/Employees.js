/**
 * @description Returns {String} of HTTP path requests
 */
const MAIN_PATH = '/api/employees';

export default class Employees {
   static GET_EMPLOYEES = MAIN_PATH + '/';
   static GET_EMPLOYEE_BY_ID = MAIN_PATH + '/id/';
   static GET_EMPLOYEE_BY_NAME = MAIN_PATH + '/name/';
   static GET_EMPLOYEE_BY_TYPE = MAIN_PATH + '/type/';
   static GET_EMPLOYEE_BY_USER_ID = MAIN_PATH + '/user/';
   static CREATE_EMPLOYEE = MAIN_PATH + '/';
   static UPDATE_EMPLOYEE = MAIN_PATH + '/';
   static DELETE_EMPLOYEE_BY_ID = MAIN_PATH + '/';
}
