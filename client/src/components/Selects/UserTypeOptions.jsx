import React, { Component } from 'react';
import { HTMLSelect } from '@blueprintjs/core';

export default class UserTypesOptions extends Component {
   state = {
      roles: ['standard', 'manager', 'director', 'admin'],
      usertype: this.props.usertype,
   };

   renderOptions() {
      return this.state.roles.map((option, key) => {
         return (
            <option key={key} value={option}>
               {option}
            </option>
         );
      });
   }

   renderPlaceholder() {
      if (this.props.selected == null) {
         if (this.props.placeholder !== null) {
            return (
               <option selected hidden disabled>
                  {this.props.placeholder}
               </option>
            );
         }
      }
   }

   render() {
      return (
         <HTMLSelect
            id={this.props.id}
            ref={this.props.ref}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
            fill={this.props.fill}
            selected={this.props.selected}
            value={this.props.selected}
            iconProps={this.props.iconProps}
            large={this.props.large}
            minimal={this.props.minimal}
         >
            {this.renderPlaceholder()}
            {this.renderOptions()}
         </HTMLSelect>
      );
   }
}
UserTypesOptions.defaultProps = {
   placeholder: null,
   usertype: 'standard',
};
