//import User from './API/User/User';
import API from './API/API';
import Notifications from './Notifications/Notifications';
import User from './API/User/User';
var info = require('./info/info.json');

export default class Client {
   /**
    * @public
    * @description Give access to client basic information
    * @returns {JSON} ./info/info.json
    */
   static info = info;

   /**
    * @public
    * @description API Object
    */
   static API = API;

   /**
    * @public
    * @description API.Services
    */
   static Services = API.SERVICES;

   /**
    * @public
    * @description React Client Notifications / Toasts
    */
   static Notifications = Notifications;

   /**
    * @public
    * @description User Object
    */
   static User = User;

   /**
    * @public
    * @description testing Authentication API route
    * @returns {Object} user.username
    *                   user.role
    */
   static async testingCurrentUserAuth() {
      var data = await API.REQUEST.get(API.ROUTES.USERS.GET_CURRENT_USER)
         .then(data => {
            return data;
         })
         .catch(err => {
            console.log(err);
            return err;
         });
      if (data.err) {
         return '';
      }
      return data.data.username + ' is ' + data.data.usertype;
   }

   /**
    * @public
    * @description Login user with username and password and save USER (JWT) in localStorage
    * @param {String} username
    * @param {String} password
    * @return {Boolean} TRUE - if successfull, FALSE othervise
    */
   static async login(username, password) {
      return await API.SERVICES.AuthService.login(username, password);
   }

   /**
    * @public
    * @returns {Boolean} if user is Authenticated
    */
   static isAuthenticated() {
      return API.SERVICES.AuthService.isAuthenticated();
   }

   /**
    * @public
    * @return {boolean} - TRUE once operation is completed, FALSE - if error
    */
   static async logout() {
      return await API.SERVICES.AuthService.logout(); //this.Auth.deauthenticateUser()
   }
}
