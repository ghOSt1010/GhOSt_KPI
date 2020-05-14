import axios from 'axios';
import API from '../../API';
import Auth from '../../Auth/Auth';

export default class AuthService {
   static getLoginItem(username, password) {
      return {
         user: {
            email: username,
            password: password
         }
      };
   }

   static async login(username, password) {
      return await axios
         .post(API.ROUTES.AUTH.LOGIN, this.getLoginItem(username, password))
         .then(result => {
            let authorized = Auth.authenticateUser(result.data.user);
            //============================
            //reload local storage HOTFIX
            if (authorized) {
               window.location.reload()
            }
            //============================
            return authorized;
         })
         .catch(error => {
            throw error;
         });
   }

   static isAuthenticated() {
      return Auth.isUserAuthenticated();
   }

   static async logout() {
      return await Auth.deauthenticateUser();
   }
}
