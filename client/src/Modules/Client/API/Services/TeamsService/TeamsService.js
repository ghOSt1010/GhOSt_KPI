import API from '../../API';
import Request from '../../Requests/Request';
import Team from './DTO/Team';

/**
 * @author Rafal Cymbalsita
 * @class TeamsService
 * @description TeamsService : HTTP communication layer
 * @static
 */
export default class TeamsService {
   /**
    * @public
    * @param {String} Name
    * @param {ObjectID} Manager
    *
    */
   static createTeamDTO(name, manager) {
      return new Team(name, manager).getTeamDTO();
   }

   /**
    * @public
    * @param {Team} Team
    * @returns - HTTP Response
    */
   static async saveTeam(Team) {
      return await Request.post(API.ROUTES.TEAMS.CREATE_NEW_TEAM, Team)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @param {Team} Team
    * @returns - HTTP Response
    */
   static async updateTeam(Team) {
      return await Request.put(API.ROUTES.TEAMS.UPDATE_TEAM, Team)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @param {id} Team._id
    * @returns - HTTP Response
    */
   static async deleteTeamByID(id) {
      return await Request.delete(API.ROUTES.TEAMS.DELETE_TEAM_BY_ID + id)
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
   static async getTeams() {
      return await Request.get(API.ROUTES.TEAMS.GET_TEAMS)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @param {id} Team._id
    * @returns - HTTP Response
    */
   static async getTeamById(id) {
      return await Request.get(API.ROUTES.TEAMS.GET_TEAM_BY_ID + id)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @param {name} Team.name
    * @returns - HTTP Response
    */
   static async getTeamByName(name) {
      return await Request.get(API.ROUTES.TEAMS.GET_TEAM_BY_NAME + name)
         .then(result => {
            return result;
         })
         .catch(err => {
            throw err;
         });
   }
}
