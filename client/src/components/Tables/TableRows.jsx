import React, { Component } from 'react';

import TableCell from './TableCell';

export default class TableRows extends Component {
   handleSelection(e, row) {
      e.preventDefault();
      this.props.onSelection(row, false);
   }

   renderTableRows() {
      const { rows } = this.props;
      return rows.map((row, key) => {
         return (
            <tr
               key={key}
               onClick={e => this.handleSelection(e, row)}
               className={` ${
                  this.props.selected === row._id ? 'bg-selected' : ''
               }`}
            >
               {this.renderCells()}
            </tr>
         );
      });
   }
   getKeys() {
      return Object.keys(this.props.rows[0]);
   }
   renderCells() {
      const { rows } = this.props.rows;
      var keys = this.getKeys();
      return rows.map((row, index) => {
         return <TableCell key={index} data={row} keys={keys} />;
      });

      /*var r = [];
      for (let [key, value] of Object.entries(row)) {
         r.push(<TableCell value={value} />);
      }
      return r.map(th => {
         return th;
      });
      */
   }

   render() {
      return this.renderTableRows();
   }
}

TableRows.defaultProps = {
   rows: []
};
