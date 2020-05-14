import React, { Component } from 'react';
import Table from './Table';
import TableCell from './TableCell';

export default class EmployeesTypesTable extends Component {
   state = {
      selected: '',
      headers: [{ text: 'Employee Type' }],
   };

   renderTableBody() {
      return <tbody>{this.renderTableRows()}</tbody>;
   }
   renderTableRows() {
      const { data } = this.props;
      return data.map((empType, key) => {
         return (
            <tr
               key={empType._id}
               onClick={(e) => this.handleSelection(e, empType)}
               className={` ${
                  this.state.selected._id === empType._id ? 'bg-selected' : ''
               }`}
            >
               <TableCell value={empType.name} />
            </tr>
         );
      });
   }

   handleSelection(e, empType) {
      e.preventDefault();
      const { selected } = this.state;
      if (selected._id !== empType._id) {
         this.props.onSelection(empType, false);
         this.setState({
            selected: empType,
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
EmployeesTypesTable.defaultProps = {
   data: [],
   onRefresh: function() {
      return;
   },
};
