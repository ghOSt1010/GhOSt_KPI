import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';

export default class TableCell extends Component {
   handleCellValue(value) {
      if (typeof value === 'boolean') {
         if (value) {
            return <Icon icon='tick' intent='success' />;
         }
         return <Icon icon='cross' intent='danger' />;
      }
      if (typeof value === 'undefined') {
         return 'N/A';
      }
      if (value == null) {
         return 'null';
      }
      return value;
   }

   render() {
      const { center, value, key, className, style } = this.props;
      return (
         <td
            className={
               center
                  ? 'text-center'
                  : '' + className !== undefined || className !== null
                  ? className
                  : ''
            }
            key={key}
            style={style}
         >
            {this.handleCellValue(value)}
         </td>
      );
   }
}
