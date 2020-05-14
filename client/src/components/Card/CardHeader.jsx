import React, { Component } from 'react';
import './StdCard.css';

export default class CardHeader extends Component {
   render() {
      return (
         <div
            className={`bp3-card-header ${
               this.props.isBodyOpen ? '' : 'bp3-border-collapsed'
            }`}
         >
            <div className='bp3-card-header-content'>{this.props.children}</div>
         </div>
      );
   }
}

CardHeader.defaultProps = {
   isBodyOpen: true
};

/*
<div className='bp3-card-header'>
   <div className='bp3-card-header-content'>{this.props.children}</div>
</div>
*/
