import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
   Navbar,
   Button,
   Alignment,
   Menu,
   MenuItem,
   MenuDivider,
   Popover,
   Position,
} from '@blueprintjs/core';
import UIManager from '../../Modules/UIManager/UIManager';
import Client from '../../Modules/Client/Client';
import AboutAppDialog from './components/AboutAppDialog';
import './AppBar.css';

export default class AppBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         themeIcon: UIManager.isDarkThemeEnabled() ? 'flash' : 'moon',
         themeToSwitch: UIManager.isDarkThemeEnabled() ? 'Light' : 'Dark',
         logout: false,
         goHome: false,
         isOpen: false,
      };
      this.switchTheme = this.switchTheme.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
   }

   handleOpen() {
      this.setState({ isOpen: true });
   }
   handleClose() {
      this.setState({ isOpen: false });
   }

   switchTheme() {
      UIManager.swtichTheme();
      UIManager.setChartView();
      this.setState({
         themeIcon: UIManager.isDarkThemeEnabled() ? 'flash' : 'moon',
         themeToSwitch: UIManager.isDarkThemeEnabled() ? 'Light' : 'Dark',
      });
   }

   handleLogout = (e) => {
      e.preventDefault();
      Client.logout();
      this.setState({
         logout: true,
      });
   };

   render() {
      if (this.state.logout) {
         return <Redirect to='/login' />;
      }

      var rightMenu = (
         <Menu>
            <Link to='/UserProfile'>
               <MenuItem icon='user' text='Profile' />
            </Link>
            <Link to='/Settings'>
               <MenuItem icon='cog' text='Settings...' />
            </Link>
            <MenuItem
               icon={this.state.themeIcon}
               text={this.state.themeToSwitch + ' mode'}
               onClick={this.switchTheme}
            />
            <MenuDivider />
            <MenuItem
               icon='log-out'
               text='Logout...'
               onClick={this.handleLogout}
            />
         </Menu>
      );

      return (
         <div>
            <Navbar
               className='no-border pl-0 app-bar bp3-elevation-3'
               style={{
                  position: 'absolute',
                  left: '39px',
                  right: 0,
                  width: 'auto',
                  top: 0,
               }}
            >
               <Navbar.Group align={Alignment.LEFT}>GhOSt App</Navbar.Group>
               <Navbar.Group align={Alignment.RIGHT}>
                  <Popover
                     content={rightMenu}
                     position={Position.BOTTOM}
                     minimal={true}
                     popoverClassName=''
                  >
                     <Button className='bp3-minimal' icon='property' text='' />
                  </Popover>
               </Navbar.Group>
            </Navbar>
            <AboutAppDialog
               isOpen={this.state.isOpen}
               handleClose={() => this.handleClose()}
               appName={Client.info.appName}
               author={Client.info.author}
               version={Client.info.version}
               releaseDate={Client.info.release}
            />
         </div>
      );
   }
}
