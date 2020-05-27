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
         if (this.canRenderCells(value)) {
            return <TableCell value={row[keys[index]]} />;
         }
         return null;
      });
   }

   canRenderCells(value) {
      let not = ['_id', '__v'];
      not.push(this.props.removeRows);
      not = not.flat();
      for (let i = 0; i < not.length; i++) {
         if (value === not[i]) return false;
      }
      return true;
   }

   render() {
      return this.renderTableRows();
   }
}

TableRows.defaultProps = {
   rows: [],
};
