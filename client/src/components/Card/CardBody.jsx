import React, { Component } from 'react';
import './StdCard.css';

export default class CardBody extends Component {
   render() {
      return (
         <div
            className={`bp3-card-body 
            ${this.props.noPadding ? 'p-0' : ''}
            ${this.props.className ? this.props.className : ''}`}
            style={this.props.style}
         >
            {this.props.children}
         </div>
      );
   }
}

//return <div className='bp3-card-body'>{this.props.children}</div>;
