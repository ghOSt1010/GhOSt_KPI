class User {
   /**
    * @returns {Object} User
    */
   static getUser() {
      var user = localStorage.getItem('user') || null;
      if (!user) {
         return null;
      }
      user = JSON.parse(user);
      return user;
   }

   /**
    * @returns {String} User Object.Id
    */
   static getUserId() {
      return this.getUser()._id;
   }

   /**
    * @returns {String} Username
    */
   static getName() {
      return this.getUser().employeeInfo.name;
   }

   /**
    * @returns {String} UserType ['user','team leader','service manager','operations manager','general manager','admin','root']
    */
   static getUserType() {
      return this.getUser().usertype;
   }

   /**
    * @returns {String} UserType ['user','team leader','service manager','operations manager','general manager','admin','root']
    *          AS Object.Id
    */
   static getUserTypeId() {
      return this.getUser().userType._id;
   }

   /**
    * @returns {String} User JWT token
    */
   static getUserJWTToken() {
      if (this.getUser() != null) {
         return this.getUser().token;
      }
      return '';
   }

   /**
    * @returns {String} User SAP ID Number
    */
   static getSAP() {
      return this.getUser().employeeInfo.sap;
   }

   /**
    * @returns {String} User Role
    */
   static getRole() {
      return this.getUserType();
   }

   /**
    * @returns {String} User Employee Role Object.Id
    */
   static getRoleId() {
      return this.getUser().employeeInfo.role._id;
   }

   /**
    * @returns {String} User Employee Email address
    */
   static getEmployeeEmail() {
      return this.getUser().employeeInfo.email;
   }

   /**
    * @returns {String} User Email address
    */
   static getUserEmail() {
      return this.getUser().email;
   }

   /**
    * @returns {String} User Employee Project Name
    */
   static getProject() {
      return this.getUser().employeeInfo.project.name;
   }

   /**
    * @returns {String} User Employee Project Object.id
    */
   static getProjectID() {
      return this.getUser().employeeInfo.project._id;
   }

   /**
    * @returns {String} User Employee RM name
    */
   static getRMName() {
      return this.getUser().employeeInfo.rm.name;
   }

   /**
    * @returns {String} User Employee RM Object.Id
    */
   static getRMId() {
      return this.getUser().employeeInfo.rm._id;
   }

   /**
    * @returns {String} User Employee RM email address
    */
   static getRMemail() {
      return this.getUser().employeeInfo.rm.email;
   }
}

export default User;
