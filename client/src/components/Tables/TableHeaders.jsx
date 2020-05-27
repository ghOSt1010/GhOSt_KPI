import React, { Component } from 'react';

export default class TableHeaders extends Component {
   renderTableHeader() {
      return this.props.headers.map((header) => {
         if (header) {
            return <th>{header.text}</th>;
         }
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
