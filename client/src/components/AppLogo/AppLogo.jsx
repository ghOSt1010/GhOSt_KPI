import React, { Component } from 'react';
import './AppLogo.css';

export default class AppLogo extends Component {
   render() {
      return (
         <div
            style={{
               left: 0,
               width: 39,
               height: 40,
            }}
         >
            <div className='side-bar-logo bp3-fill app-logo'>
               <i className='fas fa-dice-d20' />
            </div>
         </div>
      );
   }
}
