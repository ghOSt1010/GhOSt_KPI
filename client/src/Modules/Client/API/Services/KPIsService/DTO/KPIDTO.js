export default class KPI {
   constructor(name, time_from, time_to, target, project, manager) {
      this.name = name;
      this.time_from = time_from;
      this.time_to = time_to;
      this.target = target;
      this.project = project;
      this.manager = manager;
   }

   getKPIDTO() {
      return {
         kpi: {
            name: this.name,
            time_from: this.time_from,
            time_to: this.time_to,
            target: this.target,
            project: this.project,
            manager: this.manager
         }
      };
   }
}
