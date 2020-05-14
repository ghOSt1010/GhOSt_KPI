export default class EmployeeType {
   constructor(type) {
      this.type = type;
   }
   getEmployeeDTO() {
      return {
         type: {
            type: this.type
         }
      };
   }
}
