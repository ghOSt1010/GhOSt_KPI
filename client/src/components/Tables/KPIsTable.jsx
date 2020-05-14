import React, { Component } from 'react';
import Table from './Table';
import TableCell from './TableCell';
import TableHeaders from './TableHeaders';

export default class KPIsTable extends Component {
   state = {
      selected: '',
      headers: [
         { text: 'KPI' },
         { text: 'Valid From' },
         { text: 'Valid Until' },
         { text: 'Target', center: true },
         { text: 'Project' },
         { text: 'Manager' },
      ],
   };

   renderTableHeader() {
      return <TableHeaders headers={this.state.headers} />;
   }
   renderTableBody() {
      return <tbody>{this.renderTableRows()}</tbody>;
   }
   renderTableRows() {
      const { data } = this.props;
      return data.map((kpi, key) => {
         return (
            <tr
               key={kpi._id}
               onClick={(e) => this.handleSelection(e, kpi)}
               className={`${
                  this.state.selected._id === kpi._id ? 'bg-selected' : ''
               }`}
            >
               <TableCell value={kpi.name} />
               <TableCell
                  value={new Date(kpi.time_from).toLocaleDateString()}
               />
               <TableCell value={new Date(kpi.time_to).toLocaleDateString()} />
               <TableCell value={kpi.target} center />
               <TableCell value={kpi.project.name} />
               <TableCell value={kpi.manager.name} />
            </tr>
         );
      });
   }

   handleSelection(e, kpi) {
      e.preventDefault();
      const { selected } = this.state;
      if (selected._id !== kpi._id) {
         this.props.onSelection(kpi, false);
         this.setState({
            selected: kpi,
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
KPIsTable.defaultProps = {
   data: [],
   onRefresh: function() {
      return;
   },
};
