import React, { Component } from 'react';

export default class PanelContainer extends Component {
   render() {
      return <div className='main-app-container'>{this.props.children}</div>;
   }
}
