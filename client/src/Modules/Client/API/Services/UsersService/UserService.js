import API from '../../API';
import Request from '../../Requests/Request';
import User from './DTO/User';

/**
 * @class UserService
 * @description UserService HTTP communication layer
 */
export default class UserService {
   static createUserDTO(username, email, password, usertype, active = true) {
      return new User(username, email, password, usertype, active).getUserDTO();
   }
   /**
    * @public
    * @param {User} user DTO
    * @returns HTTP Response
    */
   static async saveNewUser(user) {
      return await Request.post(API.ROUTES.USERS.CREATE_NEW_USER, user)
         .then(res => {
            return res;
         })
         .catch(err => {
            throw err;
         });
   }
   /**
    * @public
    * @param {User} user DTO
    * @returns HTTP Response
    */
   static async updateUser(user) {
      return await Request.put(API.ROUTES.USERS.UPDATE_USER, user)
         .then(res => {
            return res;
         })
         .catch(err => {
            throw err;
         });
   }
   /**
    * @public
    * @returns HTTP Response
    */
   static async deleteUser(id) {
      return await Request.delete(API.ROUTES.USERS.DELETE_USER + id)
         .then(res => {
            return res;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @returns HHTP response
    */
   static async getUsers() {
      return await Request.get(API.ROUTES.USERS.GET_ALL_USERS)
         .then(res => {
            return res;
         })
         .catch(err => {
            throw err;
         });
   }

   /**
    * @public
    * @returns HTTP Response
    */
   static async getUserTypes() {
      return await Request.get(API.ROUTES.USERS.USER_TYPES.GET_USER_TYPES)
         .then(res => {
            return res;
         })
         .catch(err => {
            throw err;
         });
   }
}
