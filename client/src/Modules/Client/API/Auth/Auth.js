import User from '../User/User';

class Auth {
   /**
    * Authenticate a user. Save a token string in Local Storage
    *
    * @param {object} user
    */
   static authenticateUser(user) {
      localStorage.setItem('user', JSON.stringify(user));
      return this.isUserAuthenticated();
   }

   /**
    * Check if a user is authenticated - check if a token is saved in Local Storage
    * @async
    * @returns {boolean}
    */
   static isUserAuthenticated() {
      return localStorage.getItem('user') !== null;
   }

   /**
    * Deauthenticate a user. Remove a token from Local Storage.
    * @return {boolean}
    */
   static deauthenticateUser() {
      localStorage.removeItem('user');
      return localStorage.getItem('user') === null;
   }

   /**
    * Get a token value.
    *
    * @returns {string}
    */
   static getToken(whoCall = '') {
      var user = localStorage.getItem('user') || null;
      if (!user) {
         return null;
      }
      user = JSON.parse(user);
      return user.token;
   }

   /**
    *  @returns {Boolean} Authorized : ['root','admin','ops manager', 'general manager']
    */
   static isAuthorizedToRemove() {
      var userType = User.getUserType();

      if (
         userType === 'root' ||
         userType === 'admin' ||
         userType === 'operations manager' ||
         userType === 'general manager'
      ) {
         return true;
      }
      return false;
   }

   /**
    * @returns {Boolean} Admin or Root : ['root','admin']
    */
   static isAdminOrRoot() {
      var userType = User.getUserType();

      if (userType === 'root' || userType === 'admin') {
         return true;
      }
      return false;
   }
}
export default Auth;
