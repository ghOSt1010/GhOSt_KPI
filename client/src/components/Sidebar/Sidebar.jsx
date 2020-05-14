import React, { Component } from 'react';
import './Sidebar.css';

export default class Sidebar extends Component {
   state = {
      selected: 1,
   };

   changeSelection(id) {
      this.setState({ selected: id });
   }

   render() {
      return (
         <nav
            className='side-bar'
            style={{ top: this.props.top, width: this.props.width }}
         >
            {this.props.children}
         </nav>
      );
   }
}
