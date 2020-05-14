import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { NonIdealState, H5, H2, H4, Button } from '@blueprintjs/core';

export default class Route404 extends Component {
   constructor(props) {
      super(props);
      this.state = {
         goHome: false
      };

      this.handleGoHome = this.handleGoHome.bind(this);
   }
   handleGoHome = e => {
      e.preventDefault();
      this.setState({
         goHome: true
      });
   };

   render() {
      const title = <H2>Path not found</H2>;
      const description = (
         <>
            <H4>Page you are looking for do not exist</H4>
            <H5>Error: 404</H5>
            <br />

            <Button
               icon='home'
               minimal
               fill
               onClick={this.handleGoHome}
            ></Button>
         </>
      );

      if (this.state.goHome) {
         return <Redirect to='/home' />;
      }

      return (
         <NonIdealState
            icon='error'
            title={title}
            description={description}
            action=''
         />
      );
   }
}
