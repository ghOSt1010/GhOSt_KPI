import React, { Component } from 'react';

export default class TableHeaders extends Component {
   convertHeaders() {
      let _headers = [];
      if (Array.isArray(this.props.headers)) {
         return this.props.headers;
      }
      if (typeof this.props.headers === 'object') {
         _headers = Object.keys(this.props.headers).map((header) => {
            if (this.__canRenderHeaders(header)) {
               return {
                  text: this.__capitalize(header.replace('_', ' ')),
                  center: false,
               };
            }
            return undefined;
         });
      }
      return _headers;
   }

   __capitalize = (s) => {
      if (typeof s !== 'string') return '';
      return s.charAt(0).toUpperCase() + s.slice(1);
   };

   __canRenderHeaders(value) {
      let not = ['_id', '__v'];
      not.push(this.props.removeHeaders);
      not = not.flat();
      for (let i = 0; i < not.length; i++) {
         if (value === not[i]) return false;
      }
      return true;
   }

   renderTableHeader() {
      let headers = this.convertHeaders();
      return headers.map((header) => {
         if (header) {
            return (
               <th className={header.center ? 'text-center' : ''}>
                  {header.text}
               </th>
            );
         }
         return undefined;
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
