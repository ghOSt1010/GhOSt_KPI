export default class Team {
   constructor(name, manager) {
      this.name = name;
      this.manager = manager;
   }
   getTeamDTO() {
      return {
         team: {
            name: this.name,
            manager: this.manager
         }
      };
   }
}
