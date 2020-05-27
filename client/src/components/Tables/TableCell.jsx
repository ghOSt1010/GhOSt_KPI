import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';

export default class TableCell extends Component {
   handleCellValue(value) {
      //boolean
      if (typeof value === 'boolean') {
         if (value) {
            return <Icon icon='tick' intent='success' />;
         }
         return <Icon icon='cross' intent='danger' />;
      }
      //number
      if (!isNaN(value)) {
         if (value < 1) {
            value *= 100;

            return value.toFixed(1) + '%';
         }
         return new Number(value).toFixed(0);
      }

      //date parsing
      if (!isNaN(Date.parse(value))) {
         return new Date(value).toLocaleDateString();
      }

      //undefined
      if (typeof value === 'undefined') {
         return 'N/A';
      }
      //nulls
      if (value == null) {
         return 'null';
      }

      //object deconstruction
      if (typeof value === 'object') {
         if (value.name) {
            return value.name;
         }
         if (value.type) {
            return value.type;
         }
         return this.handleCellValue(true);
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
