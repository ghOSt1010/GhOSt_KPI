export default class Project {
   constructor(name, manager) {
      this.name = name;
      this.manager = manager;
   }
   /**
    * @public
    * @returns {Project} DTO
    */
   getProjectDTO() {
      return {
         project: {
            name: this.name,
            manager: this.manager
         }
      };
   }
}
