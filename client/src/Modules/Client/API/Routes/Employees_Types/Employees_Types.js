/**
 * @description Returns {String} of HTTP path requests
 */
const MAIN_PATH = '/api/employeesTypes';

export default class Employees_TYPES {
   static GET_EMPLOYEES_TYPES = MAIN_PATH + '/';
   static GET_EMPLOYEES_TYPE_BY_ID = MAIN_PATH + '/id/';
   static CREATE_EMPLOYEES_TYPE = MAIN_PATH + '/';
   static DELETE_EMPLOYEES_TYPE_BY_ID = MAIN_PATH + '/';
}
