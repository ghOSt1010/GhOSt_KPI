import API from '../../API';
import Request from '../../Requests/Request';
import Project from './DTO/Project';

/**
 * @author Rafal Cymbalsita
 * @class ProjectsService
 * @description ProjectsService : HTTP communication layer
 * @static
 */
export default class ProjectsService {
   /**
    * @public
    * @param {String} Name
    * @param {ObjectID} Manager
    *
    */
   static createProjectDTO(name, manager) {
      return new Project(name, manager).getProjectDTO();
   }

   /**
    * @public
    * @param {Project} project
    * @returns - HTTP Response
    */
   static async saveProject(project) {
      return await Request.post(API.ROUTES.PROJECTS.CREATE_NEW_PROEJCT, project)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @param {Project} project
    * @returns - HTTP Response
    */
   static async updateProject(project) {
      return await Request.put(API.ROUTES.PROJECTS.UPDATE_PROJECT, project)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @param {id} project._id
    * @returns - HTTP Response
    */
   static async deleteProjectByID(id) {
      return await Request.delete(API.ROUTES.PROJECTS.DELETE_PROJECT_BY_ID + id)
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
   static async getProjects() {
      return await Request.get(API.ROUTES.PROJECTS.GET_PROJECTS)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @param {id} project._id
    * @returns - HTTP Response
    */
   static async getProjectById(id) {
      return await Request.get(API.ROUTES.PROJECTS.GET_PROJECT_BY_ID + id)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @param {name} project.name
    * @returns - HTTP Response
    */
   static async getProjectByName(name) {
      return await Request.get(API.ROUTES.PROJECTS.GET_PROJECT_BY_NAME + name)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }
}
