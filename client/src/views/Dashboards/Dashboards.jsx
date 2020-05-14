import React, { Component } from 'react';
import { Tabs, Tab, H2, Spinner, NonIdealState } from '@blueprintjs/core';
import Client from '../../Modules/Client/Client';
import MainDashboard from './components/MainDashboard';
import DashboardControllers from './components/DashboardControllers';
import TestView2 from './components/ChartsBuilder';
import ProjectOptions from '../../components/Selects/ProjectOptions';

export default class Dashboard extends Component {
   state = {
      activeTabID: 'KPIs',
      selectedTabId: 'KPIs',
      isLoading: true,
      data: [],
      errorMessage: '',
      project: '',
      selectedProjectName: '',
   };

   componentDidMount() {
      this.getData();
   }

   async getData() {
      this.setLoading(true);
      const { project } = this.state;

      if (project === '') {
         this.setLoading(false);
         return;
      }

      try {
         //this.resetErrorMsg();
         var result = await Client.Services.ReportingService.getReportByProjectID(
            project
         );
         this.setState({
            data: result.data,
         });
      } catch (err) {
         alert(err);
         this.setState({ errorMsg: err.response });
         Client.Notifications.alert('Error while loading reports');
      } finally {
         this.setLoading(false);
      }
   }

   resetErrorMsg() {
      this.setState({ errorMessage: '' });
   }

   onChangeProject = (e) => {
      const state = this.state;
      state[e.target.id] = e.target.value;
      state['selectedProjectName'] =
         e.target.options[e.target.selectedIndex].text;

      this.setState(state);
      this.getData();
   };

   setLoading(loading) {
      this.setState({
         isLoading: loading,
      });
   }

   handleTabChange = (activeTabID) => {
      this.setState({
         activeTabID: activeTabID,
         selectedTabId: activeTabID,
      });
   };

   renderControlls() {
      const { selectedTabId } = this.state;
      if (selectedTabId) {
         return (
            <DashboardControllers onRefresh={() => this.getData()}>
               {this.renderProjectOptions(true)}
            </DashboardControllers>
         );
      }
   }

   renderProjectOptions(minimal = false) {
      return (
         <ProjectOptions
            id='project'
            ref='project'
            minimal={minimal}
            onChange={this.onChangeProject}
            value={this.state.project}
            placeholder={
               this.state.project
                  ? this.state.selectedProjectName
                  : 'Select Project...'
            }
         />
      );
   }

   renderCharts(which) {
      const { project, isLoading, data } = this.state;
      if (project === '') {
         return (
            <NonIdealState
               title='No project selected yet'
               description='Please select project'
            />
         );
      }

      if (data.length === 0) {
         return (
            <NonIdealState
               icon='issue'
               title="Selected Project don't have KPIs"
               description='Please select different Project'
            />
         );
      }

      if (isLoading) {
         return <Spinner />;
      }
      if (which === 'kpis') {
         return (
            <TestView2
               labels={this.state.labels}
               yaxisLabel='Results'
               xasisLabel='Reports'
               series={this.state.series}
               targetValue={this.state.target}
               targetInfo='KPI target'
               data={this.state.data}
            />
         );
      }
      if (which === 'beta') {
         return <MainDashboard />;
      }
   }

   render() {
      return (
         <div id='Dashboards'>
            <div>
               <H2>Dashboard Panel</H2>
            </div>

            <Tabs
               large
               onChange={this.handleTabChange}
               selectedTabId={this.state.selectedTabId}
            >
               <Tab
                  id='KPIs'
                  title='KPIs'
                  panel={
                     <div className='main-container-tab-content'>
                        {this.renderCharts('kpis')}
                     </div>
                  }
               />
               <Tab
                  id='Beta'
                  title='Beta'
                  panel={
                     <div className='main-container-tab-content'>
                        {this.renderCharts('beta')}
                     </div>
                  }
               />
               <Tabs.Expander />
               {this.renderControlls()}
            </Tabs>
         </div>
      );
   }
}
