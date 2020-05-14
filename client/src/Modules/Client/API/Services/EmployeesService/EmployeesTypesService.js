import API from '../../API';
import Request from '../../Requests/Request';
import EmployeeTypeDTO from './DTO/EmployeeType';

export default class EmployeesTypesService {
   static createEmployeeTypeDTO(type) {
      return new EmployeeTypeDTO(type).getEmployeeDTO();
   }
   static async createEmployeeType(Type) {
      return Request.post(
         API.ROUTES.EMPLOYEES_TYPES.CREATE_EMPLOYEES_TYPE,
         Type
      )
         .then(res => {
            return res;
         })
         .catch(err => {
            throw err;
         });
   }
   static async getEmployeeTypes() {
      return Request.get(API.ROUTES.EMPLOYEES_TYPES.GET_EMPLOYEES_TYPES)
         .then(res => {
            return res;
         })
         .catch(err => {
            throw err;
         });
   }
   static async getEmployeeTypeByID(id) {
      return Request.get(API.ROUTES.EMPLOYEES_TYPES.getEmployeeTypeByID + id)
         .then(res => {
            return res;
         })
         .catch(err => {
            throw err;
         });
   }
   static async deleteEmployeeTypeByID(id) {
      return Request.delete(
         API.ROUTES.EMPLOYEES_TYPES.DELETE_EMPLOYEES_TYPE_BY_ID + id
      )
         .then(res => {
            return res;
         })
         .catch(err => {
            throw err;
         });
   }
}
