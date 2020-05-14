import API from '../../API';
import Request from '../../Requests/Request';
import Report from './DTO/Report';

/**
 * @author Rafal Cymbalsita
 * @class ReportsService
 * @description ReportsService : HTTP communication layer
 * @static
 */
export default class ReportsService {
   /**
    * @public
    * @param {String} Name
    * @param {ObjectID} Manager
    *
    */
   static createReportDTO(
      kpi,
      reportedBy,
      result,
      completed,
      status,
      reportedAt
   ) {
      return new Report(
         kpi,
         reportedBy,
         result,
         completed,
         status,
         reportedAt
      ).getReportDTO();
   }

   /**
    * @public
    * @param {Report} Report
    * @returns - HTTP Response
    */
   static async saveReport(Report) {
      return await Request.post(API.ROUTES.REPORTS.CREATE_REPORT, Report)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @param {Report} Report
    * @returns - HTTP Response
    */
   static async updateReport(Report) {
      return await Request.put(API.ROUTES.REPORTS.UPDATE_REPORT, Report)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @param {id} Report._id
    * @returns - HTTP Response
    */
   static async deleteReportByID(id) {
      return await Request.delete(API.ROUTES.REPORTS.DELETE_REPORT_BY_ID + id)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @returns - HTTP Response
    * @throws - HTTP Axios Error
    */
   static async getReports() {
      return await Request.get(API.ROUTES.REPORTS.GET_REPORTS)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @param {id} Report._id
    * @returns - HTTP Response
    */
   static async getReportById(id) {
      return await Request.get(API.ROUTES.REPORTS.GET_REPORT_BY_ID + id)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   static async getReportByKPIID(kpiID) {
      return await Request.get(API.ROUTES.REPORTS.GET_REPORT_BY_KPI_ID + kpiID)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   static async getReportByProjectID(id) {
      return await Request.get(API.ROUTES.REPORTS.GET_REPORT_BY_PROJECT_ID + id)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }
}
