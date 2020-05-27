import React, { Component } from 'react';
import './StdCard.css';

export default class CardFooter extends Component {
   render() {
      return (
         <div
            className={`${
               this.props.noBorder
                  ? 'bp3-card-footer-no-border'
                  : 'bp3-card-footer'
            } 
            ${this.props.className ? this.props.className : ''}`}
            style={this.props.style}
         >
            <div className='bp3-card-footer-content'>
               <div>{this.props.children}</div>
            </div>
         </div>
      );
   }
}
