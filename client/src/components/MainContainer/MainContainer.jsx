import React, { Component } from 'react';
import '../../App.css';
import './MainContainer.css';

export default class MainContainer extends Component {
   state = {
      displayBgImage: this.displayBgImage(this.props.displayBgImage),
      appView: this.props.app === undefined ? true : false,
      homeView: this.props.app === undefined ? false : true
   };

   displayBgImage(disply) {
      if (disply) {
         return 'bg-image';
      }
      return '';
   }

   selectPlace() {
      const { appView, homeView, noAppBar } = this.props;
      if (appView) {
         return 'main-data-app';
      }
      if (homeView) {
         return 'main-data-home';
      }
      if (noAppBar) {
         return 'main-data-home';
      }
      return '';
   }

   render() {
      const { appView, homeView, noAppBar } = this.props;

      if (appView || homeView) {
         return (
            <div className='main-container'>
               <div
                  className={`${this.displayBgImage(this.props.displayBgImage)}
                        ${this.selectPlace()} `}
                  id='MainContainer'
               >
                  {this.props.children}
               </div>
            </div>
         );
      }
      if (noAppBar) {
         return (
            <div
               className={`${this.displayBgImage(this.props.displayBgImage)}
                        ${this.selectPlace()}`}
               id='MainContainer'
            >
               {this.props.children}
            </div>
         );
      }
   }
}
