import React, { Component } from 'react';
import Table from './Table';
import TableCell from './TableCell';

export default class TeamsTable extends Component {
   state = {
      selected: '',
      headers: [{ text: 'Team' }, { text: 'Manager' }],
   };

   renderTableBody() {
      return <tbody>{this.renderTableRows()}</tbody>;
   }
   renderTableRows() {
      const { data } = this.props;
      return data.map((team, key) => {
         return (
            <tr
               key={team._id}
               onClick={(e) => this.handleSelection(e, team)}
               className={`${
                  this.state.selected._id === team._id ? 'bg-selected' : ''
               }`}
            >
               <TableCell value={team.name} />
               <TableCell value={team.manager.name} />
            </tr>
         );
      });
   }

   handleSelection(e, team) {
      e.preventDefault();
      const { selected } = this.state;
      if (selected._id !== team._id) {
         this.props.onSelection(team, false);
         this.setState({
            selected: team,
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
TeamsTable.defaultProps = {
   data: [],
   onRefresh: function() {
      return;
   },
};
