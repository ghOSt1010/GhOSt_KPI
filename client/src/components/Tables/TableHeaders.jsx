import React, { Component } from 'react';

export default class TableHeaders extends Component {
   renderTableHeader() {
      return this.props.headers.map((header) => {
         return (
            <th className={header.center ? 'text-center' : ''}>
               {header.text}
            </th>
         );
      });
   }

   render() {
      return (
         <thead>
            <tr>{this.renderTableHeader()}</tr>
         </thead>
      );
   }
}

TableHeaders.defaultProps = {
   headers: [],
};
