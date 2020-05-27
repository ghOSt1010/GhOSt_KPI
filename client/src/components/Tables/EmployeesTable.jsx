import React, { Component } from 'react';
import Table from './Table';
import TableCell from './TableCell';

export default class EmployeesTable extends Component {
   state = {
      selected: '',
      headers: [
         { text: 'Name' },
         { text: 'Email' },
         { text: 'Is User', center: true },
         { text: 'Type' },
         { text: 'Project' },
         { text: 'Team' },
      ],
   };

   renderTableBody() {
      return <tbody>{this.renderTableRows()}</tbody>;
   }

   renderTableRows() {
      const { data } = this.props;
      return data.map((employee, key) => {
         return (
            <tr
               key={employee._id}
               onClick={(e) => this.handleSelection(e, employee)}
               className={` ${
                  this.state.selected._id === employee._id ? 'bg-selected' : ''
               }`}
            >
               <TableCell value={employee.name} />
               <TableCell value={employee.email} />
               <TableCell
                  value={employee.user === null ? false : true}
                  center
               />
               <TableCell
                  value={employee.type === null ? 'N/A' : employee.type.type}
               />
               <TableCell
                  value={
                     employee.project === null ? 'N/A' : employee.project.name
                  }
               />
               <TableCell
                  value={employee.team == null ? 'N/A' : employee.team.name}
               />
            </tr>
         );
      });
   }

   handleSelection(e, employee) {
      e.preventDefault();
      const { selected } = this.state;
      if (selected._id !== employee._id) {
         this.props.onSelection(employee, false);
         this.setState({
            selected: employee,
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
            data={this.props.data}
            errorMsg={this.props.errorMsg}
            isLoading={this.props.isLoading}
            onRefresh={this.props.onRefresh}
         />
      );
   }
}
EmployeesTable.defaultProps = {
   data: [],
   onRefresh: function() {
      return;
   },
};
