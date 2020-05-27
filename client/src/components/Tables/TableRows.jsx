import React, { Component } from 'react';

import TableCell from './TableCell';

export default class TableRows extends Component {
   state = {
      selected: false,
   };

   handleSelection(e, row) {
      e.preventDefault();
      this.props.handleSelection(e, row);
      this.setState({ selected: row._id });
   }

   renderTableRows() {
      const { rows } = this.props;
      return rows.map((row, key) => {
         return (
            <tr
               key={key}
               onClick={(e) => this.handleSelection(e, row)}
               className={` ${
                  this.state.selected === row._id ? 'bg-selected' : ''
               }`}
            >
               {this.renderCells(row, key)}
            </tr>
         );
      });
   }
   getKeys() {
      return Object.keys(this.props.rows[0]);
   }

   renderCells(row, key) {
      let keys = this.getKeys();
      return Object.keys(row).map((value, index) => {
         if (value !== '_id' && value !== '__v') {
            return <TableCell value={row[keys[index]]} />;
         }
         return null;
      });
   }

   render() {
      return this.renderTableRows();
   }
}

TableRows.defaultProps = {
   rows: [],
};
