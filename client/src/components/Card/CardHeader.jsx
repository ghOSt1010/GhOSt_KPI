import React, { Component } from 'react';
import './StdCard.css';
import { Icon } from '@blueprintjs/core';

export default class CardHeader extends Component {
   renderHeaderContent() {
      if (!this.props.children) {
         return (
            <div className='float-left'>
               <Icon icon={this.props.icon} className='mr-2' />
               {this.props.headerText}
            </div>
         );
      }
      return this.props.children;
   }

   getClassess() {
      let classess = '';
      this.props.noBorder
         ? (classess = 'bp3-card-header-no-border')
         : (classess = 'bp3-card-header');
      this.props.isBodyOpen
         ? (classess += '')
         : (classess += 'bp3-border-collapsed');
      return classess;
   }

   render() {
      return (
         <div className={this.getClassess()}>
            <div className='bp3-card-header-content'>
               <Icon icon={this.props.icon} className='mr-2' intent='none' />
               {this.props.headerText}
               {this.props.children}

               <div className='bp3-header-controlls'>
                  {this.props.controlls}
               </div>
            </div>
         </div>
      );
   }
}

CardHeader.defaultProps = {
   isBodyOpen: true,
};

/*
<div className='bp3-card-header'>
   <div className='bp3-card-header-content'>{this.props.children}</div>
</div>
*/
