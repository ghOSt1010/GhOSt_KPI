import React, { Component } from 'react';
import { ButtonGroup, Button, Divider } from '@blueprintjs/core';

export default class DashboardControllers extends Component {
   render() {
      const { onRefresh } = this.props;
      return (
         <div>
            <ButtonGroup>{this.props.children}</ButtonGroup>
            <ButtonGroup>
               {this.props.children}
               <Divider />
               <Button icon='refresh' small minimal onClick={onRefresh} />
            </ButtonGroup>
         </div>
      );
   }
}
