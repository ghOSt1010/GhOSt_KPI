import API from '../../API';
import Request from '../../Requests/Request';
import Employee from './DTO/Employee';

export default class EmployeesService {
   static async createEmployeeDTO(name, email, user, type, project, team) {
      return new Employee(
         name,
         email,
         user,
         type,
         project,
         team
      ).getEmployeeDTO();
   }

   static async getEmployeeUpdateDTO(
      id,
      name,
      email,
      user,
      type,
      project,
      team
   ) {
      var emp = await this.createEmployeeDTO(
         name,
         email,
         user,
         type,
         project,
         team
      );
      emp.employee._id = id;
      return emp;
   }

   static async getEmployees() {
      return await Request.get(API.ROUTES.EMPLOYEES.GET_EMPLOYEES)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }
   static async getEmployeeById(id) {
      return await Request.get(API.ROUTES.EMPLOYEES.GET_EMPLOYEE_BY_ID + id)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   static async getEmployeeByName(name) {
      return await Request.get(API.ROUTES.EMPLOYEES.GET_EMPLOYEE_BY_NAME + name)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   static async getEmployeeByUserID(id) {
      return await Request.get(
         API.ROUTES.EMPLOYEES.GET_EMPLOYEE_BY_USER_ID + id
      )
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   static async saveEmployee(employee) {
      return await Request.post(API.ROUTES.EMPLOYEES.CREATE_EMPLOYEE, employee)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   static async updateEmployee(employee) {
      return await Request.put(API.ROUTES.EMPLOYEES.UPDATE_EMPLOYEE, employee)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   static async deleteEmployeeById(id) {
      return await Request.delete(
         API.ROUTES.EMPLOYEES.DELETE_EMPLOYEE_BY_ID + id
      )
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }
}
