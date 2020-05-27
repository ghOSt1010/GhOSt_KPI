import React, { Component } from 'react';
import Table from './Table';
import TableCell from './TableCell';

export default class UsersTable extends Component {
   state = {
      selected: '',
      headers: [
         { text: 'User name' },
         { text: 'Email' },
         { text: 'Role' },
         { text: 'Active', center: false },
      ],
   };

   renderTableBody() {
      return <tbody>{this.renderTableRows()}</tbody>;
   }
   renderTableRows() {
      const { usersData } = this.props;
      return usersData.map((user, key) => {
         return (
            <tr
               key={user._id}
               onClick={(e) => this.handleSelection(e, user)}
               className={`${
                  this.state.selected._id === user._id ? 'bg-selected' : ''
               }`}
            >
               <TableCell value={user.username} />
               <TableCell value={user.email} />
               <TableCell value={user.usertype} />
               <TableCell value={user.active} center />
            </tr>
         );
      });
   }

   handleSelection(e, user) {
      e.preventDefault();
      const { selected } = this.state;
      if (selected._id !== user._id) {
         this.props.onSelection(user, false);
         this.setState({
            selected: user,
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
UsersTable.defaultProps = {
   usersData: [],
   onRefresh: function() {
      return;
   },
};
