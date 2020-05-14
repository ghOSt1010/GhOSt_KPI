import React, { Component } from 'react';
import Table from './Table';
import TableCell from './TableCell';

export default class ProjectsTable extends Component {
   state = {
      selected: '',
      headers: [{ text: 'Name' }, { text: 'Manager' }],
   };

   renderTableBody() {
      return <tbody>{this.renderTableRows()}</tbody>;
   }
   renderTableRows() {
      const { data } = this.props;
      return data.map((project, key) => {
         return (
            <tr
               key={project._id}
               onClick={(e) => this.handleSelection(e, project)}
               className={` ${
                  this.state.selected._id === project._id ? 'bg-selected' : ''
               }`}
            >
               <TableCell value={project.name} />
               <TableCell value={project.manager.name} />
            </tr>
         );
      });
   }

   handleSelection(e, project) {
      e.preventDefault();
      const { selected } = this.state;
      if (selected._id !== project._id) {
         this.props.onSelection(project, false);
         this.setState({
            selected: project,
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
ProjectsTable.defaultProps = {
   data: [],
   onRefresh: function() {
      return;
   },
};
