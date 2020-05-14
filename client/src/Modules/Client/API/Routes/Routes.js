import Auth from './Auth/Auth';
import Employees from './Employees/Employees';
import EmployeesTypes from './Employees_Types/Employees_Types';
import Projects from './Projects/Projects';
import Teams from './Teams/Teams';
import KPIs from './KPIs/KPIs';
import Reports from './Reports/Reports';
import Users from './Users/Users';

export default class ROUTES {
   constructor() {
      return this;
   }

   static AUTH = Auth;
   static EMPLOYEES = Employees;
   static EMPLOYEES_TYPES = EmployeesTypes;
   static PROJECTS = Projects;
   static TEAMS = Teams;
   static KPI = KPIs;
   static REPORTS = Reports;
   static USERS = Users;
}
