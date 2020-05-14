export default class User {
   constructor(username, email, password, usertype, active = true) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.usertype = usertype;
      this.active = active;
   }

   getUserDTO() {
      return {
         user: {
            username: this.username,
            email: this.email,
            password: this.password,
            usertype: this.usertype,
            active: this.active,
            createdAt: new Date()
         }
      };
   }
}
