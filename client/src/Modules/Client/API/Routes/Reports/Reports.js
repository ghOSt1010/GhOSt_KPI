/**
 * @description Returns {String} of HTTP path requests
 */
const MAIN_PATH = '/api/reports';

export default class Reports {
   static GET_REPORTS = MAIN_PATH + '/';
   static GET_REPORT_BY_ID = MAIN_PATH + '/id/';
   static GET_REPORT_BY_KPI_ID = MAIN_PATH + '/kpi/';
   static GET_REPORT_BY_PROJECT_ID = MAIN_PATH + '/project/';
   static CREATE_REPORT = MAIN_PATH + '/';
   static UPDATE_REPORT = MAIN_PATH + '/';
   static DELETE_REPORT_BY_ID = MAIN_PATH + '/';
}
