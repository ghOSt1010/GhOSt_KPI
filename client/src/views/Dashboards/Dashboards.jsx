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
      project: ''
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
            data: result.data
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

   onChangeProject = e => {
      const state = this.state;
      state[e.target.id] = e.target.value;
      this.setState(state);
      this.getData();
   };

   setLoading(loading) {
      this.setState({
         isLoading: loading
      });
   }

   handleTabChange = activeTabID => {
      this.setState({
         activeTabID: activeTabID,
         selectedTabId: activeTabID
      });
   };

   renderControlls() {
      if (this.state.selectedTabId === 'Dashboards') {
         return <DashboardControllers onRefresh={() => this.getData()} />;
      }
   }

   renderProjectOptions() {
      return (
         <ProjectOptions
            id='project'
            ref='project'
            onChange={this.onChangeProject}
            value={this.state.project}
            placeholder='Select Project...'
         />
      );
   }
   renderContent() {
      const { project, isLoading, data } = this.state;
      if (project === '') {
         return (
            <NonIdealState
               title='No project selected yet'
               description='Please select project'
            >
               {this.renderProjectOptions()}
            </NonIdealState>
         );
      }

      if (isLoading) {
         return <Spinner></Spinner>;
      }

      if (data.length === 0) {
         return (
            <NonIdealState
               icon='issue'
               title="Selected Project don't have KPIs"
               description='Please select different Project'
            >
               {this.renderProjectOptions()}
            </NonIdealState>
         );
      }

      return (
         <Tabs
            onChange={this.handleTabChange}
            selectedTabId={this.state.selectedTabId}
            large
         >
            <Tab
               id='KPIs'
               title='KPIs'
               panel={
                  <TestView2
                     labels={this.state.labels}
                     yaxisLabel='Results'
                     xasisLabel='Reports'
                     series={this.state.series}
                     targetValue={this.state.target}
                     targetInfo='KPI target'
                     data={this.state.data}
                  />
               }
            />
            <Tab id='Beta' title='Beta' panel={<MainDashboard />} />
            <Tabs.Expander />
            {this.renderControlls()}
         </Tabs>
      );
   }

   render() {
      return (
         <div id='Dashboards'>
            <div className='mt-2'>
               <H2>
                  Dashboard Panel
                  <div className='float-right'>
                     {this.renderProjectOptions()}
                  </div>
               </H2>
            </div>
            {this.renderContent()}
         </div>
      );
   }
}
