export default class Employee {
   constructor(name, email, user, type, project, team) {
      this.name = name;
      this.email = email;
      this.user = user === '' ? null : user;
      this.type = type;
      this.project = project;
      this.team = team;
   }

   getEmployeeDTO() {
      return {
         employee: {
            name: this.name,
            email: this.email,
            user: this.user,
            type: this.type,
            project: this.project,
            team: this.team
         }
      };
   }

   getCollapsedEmployeeDTO(emp) {
      return {
         employee: {
            _id: emp._id,
            email: emp.email,
            user: emp.user._id,
            type: emp.type._id,
            project: emp.project._id,
            team: emp.team._id
         }
      };
   }
}
