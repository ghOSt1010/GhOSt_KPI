export default class Report {
   constructor(kpi, reportedBy, result, completed, status, reportedAt) {
      this.kpi = kpi;
      this.reportedBy = reportedBy;
      this.result = result;
      this.completed = completed;
      this.status = status;
      this.reportedAt = reportedAt;
   }
   /**
    * @public
    * @returns {Report} DTO
    */
   getReportDTO() {
      return {
         Report: {
            kpi: this.kpi,
            reportedBy: this.reportedBy,
            result: this.result,
            completed: this.completed,
            status: this.status,
            reportedAt: this.reportedAt
         }
      };
   }
}
