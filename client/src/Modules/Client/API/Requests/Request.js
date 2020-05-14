import axios from 'axios';
import Auth from '../Auth/Auth';

/**
 * @returns {Object} axios custom instance with Authorization JWT token header
 * @description Requests are modified with Authorization header (JWT)
 */
var Request = axios.create({
   headers: {
      Authorization: 'Token ' + Auth.getToken()
   }
});

export default Request;
//JSON.parse(localStorage.getItem('user')).token
//axios.defaults.headers.common['Authorization'] = 'Token ' + Auth.getToken();
