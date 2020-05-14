import AuthService from './AuthService/AuthService';
import EmployeesService from './EmployeesService/EmployeesService';
import EmployeesTypesService from './EmployeesService/EmployeesTypesService';
import KPIsService from './KPIsService/KPIsService';
import ReportingService from './ReportingService/ReportingService';
import TeamsService from './TeamsService/TeamsService';
import ProjectsService from './ProjectsService/ProjectsService';
import UsersService from './UsersService/UserService';

export default class Services {
   static AuthService = AuthService;
   static EmployeesService = EmployeesService;
   static EmployeesTypesService = EmployeesTypesService;
   static KPIsService = KPIsService;
   static ReportingService = ReportingService;
   static TeamsService = TeamsService;
   static ProjectsService = ProjectsService;
   static UsersService = UsersService;
}
