import API from '../../API';
import Request from '../../Requests/Request';
import KPIDTO from './DTO/KPIDTO';

export default class KPIService {
   static async createKPIDTO(
      name,
      time_from,
      time_to,
      target,
      project,
      manager
   ) {
      return new KPIDTO(
         name,
         time_from,
         time_to,
         target,
         project,
         manager
      ).getKPIDTO();
   }

   static async getKPIs() {
      return await Request.get(API.ROUTES.KPI.GET_KPIS)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }
   static async getKPIById(id) {
      return await Request.get(API.ROUTES.KPI.GET_KPI_BY_ID + id)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   static async getKPIByProjectId(id) {
      return await Request.get(API.ROUTES.KPI.GET_KPI_BY_PROJECT_ID + id)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   static async saveKPI(KPI) {
      return await Request.post(API.ROUTES.KPI.CREATE_NEW_KPI, KPI)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   static async updateKPI(KPI) {
      return await Request.put(API.ROUTES.KPI.UPDATE_KPI, KPI)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   static async deleteKPIById(id) {
      return await Request.delete(API.ROUTES.KPI.DELETE_KPI_BY_ID + id)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }
}
