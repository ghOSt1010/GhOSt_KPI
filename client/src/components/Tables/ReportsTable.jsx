import React, { Component } from 'react';
import Table from './Table';
import TableCell from './TableCell';

export default class ReportsTable extends Component {
   state = {
      selected: '',
      headers: [
         { text: 'Project' },
         { text: 'KPI' },
         { text: 'Reported By' },
         { text: 'Result', center: true },
         { text: 'Completed', center: true },
         { text: 'Status', center: true },
         { text: 'Reported At' },
      ],
   };

   renderTableBody() {
      return <tbody>{this.renderTableRows()}</tbody>;
   }
   renderTableRows() {
      const { data } = this.props;
      return data.map((report, key) => {
         return (
            <tr
               key={report._id}
               onClick={(e) => this.handleSelection(e, report)}
               className={` ${
                  this.state.selected._id === report._id ? 'bg-selected' : ''
               }`}
            >
               <TableCell value={report.kpi.project.name} />
               <TableCell value={report.kpi.name} />
               <TableCell value={report.reportedBy.name} />
               <TableCell value={report.result} center />
               <TableCell
                  value={this.getCompletedValue(report.completed)}
                  center
               />
               <TableCell value={report.status} center />
               <TableCell value={new Date(report.reportedAt).toDateString()} />
            </tr>
         );
      });
   }

   getCompletedValue(val) {
      if (val === null) {
         return 0;
      }
      let v = val.toFixed(2) * 100;
      return v.toFixed(0) + '%';
   }

   handleSelection(e, report) {
      e.preventDefault();
      const { selected } = this.state;
      if (selected._id !== report._id) {
         this.props.onSelection(report, false);
         this.setState({
            selected: report,
         });
         return;
      }
      this.props.onSelection({}, true);
      this.setState({ selected: {} });
   }

   render() {
      return (
         <Table
            headers={this.state.headers}
            rows={this.renderTableRows()}
            errorMsg={this.props.errorMsg}
            isLoading={this.props.isLoading}
            onRefresh={this.props.onRefresh}
         />
      );
   }
}
ReportsTable.defaultProps = {
   data: [],
   onRefresh: function() {
      return;
   },
};
