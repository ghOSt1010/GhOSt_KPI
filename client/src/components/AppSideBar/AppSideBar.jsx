import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import SidebarItem from '../Sidebar/SidebarItem';
import SidebarItemSpecial from '../Sidebar/SidebarItemSpecial';
import Client from '../../Modules/Client/Client';
import UIManager from '../../Modules/UIManager/UIManager';
import { MenuDivider } from '@blueprintjs/core';
import { Redirect } from 'react-router-dom';

export default class AppSideBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selected: UIManager.getCurrentView(),
         themeIcon: UIManager.isDarkThemeEnabled() ? 'flash' : 'moon',
         themeToSwitch: UIManager.isDarkThemeEnabled() ? 'Light' : 'Dark',
         logout: false,
         goHome: false,
         isOpen: false,
      };
      this.switchTheme = this.switchTheme.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
   }
   componentDidMount() {
      this.setState({
         selected: UIManager.getCurrentView(),
      });
   }

   changeSelection(id) {
      this.setState({ selected: id });
      UIManager.setChartView(id);
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

   bottomControlls(show) {
      const { selected } = this.state;
      if (show) {
         return (
            <div className='side-bar-group-bottom'>
               <MenuDivider />
               <SidebarItemSpecial
                  icon={this.state.themeIcon}
                  intent=''
                  tooltip='Switch theme'
                  onClick={this.switchTheme}
               />
               <SidebarItem
                  to='/Settings'
                  icon='cog'
                  tooltip='Settings'
                  selected={selected === 'settings'}
                  onClick={() => this.changeSelection('settings')}
               />
               <SidebarItemSpecial
                  icon='power'
                  intent='danger'
                  tooltip='Logout'
                  onClick={this.handleLogout}
               />
            </div>
         );
      }
      return;
   }

   render() {
      const { selected } = this.state;

      if (this.state.logout) {
         return <Redirect to='/' />;
      }

      return (
         <Sidebar top='40px' width='40px'>
            <div className='side-bar-group-center'>
               <SidebarItem
                  to='/Home'
                  icon='home'
                  tooltip='Home'
                  selected={selected === 'home'}
                  onClick={() => this.changeSelection('home')}
               />
               <SidebarItem
                  to='/Dashboards'
                  icon='dashboard'
                  tooltip='Dashboards'
                  selected={selected === 'dashboards'}
                  onClick={() => this.changeSelection('dashboards')}
               />
               <SidebarItem
                  to='/KPIs'
                  icon='locate'
                  tooltip='KPIs'
                  selected={selected === 'kpis'}
                  onClick={() => this.changeSelection('kpis')}
               />
               <SidebarItem
                  to='/Reports'
                  icon='manually-entered-data'
                  tooltip='Reports'
                  selected={selected === 'reports'}
                  onClick={() => this.changeSelection('reports')}
               />
               <SidebarItem
                  to='/Projects'
                  icon='gantt-chart'
                  tooltip='Projects'
                  selected={selected === 'projects'}
                  onClick={() => this.changeSelection('projects')}
               />
               <SidebarItem
                  to='/Teams'
                  icon='people'
                  tooltip='Teams'
                  selected={selected === 'teams'}
                  onClick={() => this.changeSelection('teams')}
               />
               <SidebarItem
                  to='/Employees'
                  icon='user'
                  tooltip='Employees'
                  selected={selected === 'employees'}
                  onClick={() => this.changeSelection('employees')}
               />

               <SidebarItem
                  to='/AdminPanel'
                  icon='control'
                  tooltip='Admin Panel'
                  selected={selected === 'adminpanel'}
                  onClick={() => this.changeSelection('adminpanel')}
               />

               <SidebarItem
                  to='/Settings'
                  icon='cog'
                  tooltip='Settings'
                  selected={selected === 'settings'}
                  onClick={() => this.changeSelection('settings')}
               />
            </div>
            {this.bottomControlls(false)}
         </Sidebar>
      );
   }
}
