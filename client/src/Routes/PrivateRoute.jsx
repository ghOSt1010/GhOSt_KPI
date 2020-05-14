import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Client from '../Modules/Client/Client';
//import AppBar from '../components/AppBar/AppBar';
import AppSidebar from '../components/AppSideBar/AppSideBar';
import MainContainer from '../components/MainContainer/MainContainer';

export default function PrivateRoute({ component: Component, ...rest }) {
   //const { layout: Layout, component: Component, ...rest } = this.props;
   return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route
         {...rest}
         render={props =>
            Client.isAuthenticated() ? (
               <div>
                  <AppSidebar />
                  <MainContainer appView>
                     <Component {...props} />
                  </MainContainer>
               </div>
            ) : (
               <Redirect to='/login' />
            )
         }
      />
   );
}
