import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ChartCard from '../../../components/Card/ChartCard/ChartCard';

const testData = require('../../../Data_OldStatic/old_data');

export default class MainDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showReportFilter: false,
         activeTab: '1',
      };
   }

   switchTab(tab) {
      if (this.state.activeTab !== tab) {
         this.setState({
            activeTab: tab,
         });
      }
   }

   testd = testData;

   labels() {
      return this.testd.map((P) => P.Project_Name);
   }

   getKPITargetData() {
      return this.testd.map((P) => P.Result);
   }

   getKPIData() {
      return this.testd.map((P) => P.Target);
   }

   data = {
      labels: this.labels(),
      datasets: [
         {
            label: 'Data',
            backgroundColor: '#008FFB',
            borderColor: '#008FFB',
            data: this.getKPITargetData(),
         },
      ],
   };
   dataBar = {
      labels: this.labels(),
      datasets: [
         {
            label: 'KPI 1',
            backgroundColor: '#008FFB',
            data: this.getKPIData(),
         },
         {
            label: 'Target',
            backgroundColor: '#00E396',
            data: this.getKPITargetData(),
         },
      ],
   };
   data_line = {
      labels: this.labels(),
      datasets: [
         {
            label: 'KPI 2',
            borderColor: '#008FFB',
            backgroundColor: 'transparent',
            data: this.getKPIData(),
         },
         {
            label: 'Target',
            borderColor: '#00E396',
            backgroundColor: 'rgba(0,0,0,0)',
            data: this.getKPITargetData(),
         },
      ],
   };
   dataRound = {
      labels: ['a', 'b'],
      datasets: [
         {
            label: 'Data',
            backgroundColor: ['#4099ff', '#FFF3201'],
            borderColor: 'transparent',
            data: [90, 10],
         },
      ],
   };

   switchShowReportFilter = () => {
      this.setState((state) => ({
         showReportFilter: !state.showReportFilter,
      }));
   };

   render() {
      return (
         <div>
            <Row>
               <Col xl={6} lg={6} md={12} sm={12} xs={12} className=''>
                  <ChartCard
                     elevation='2'
                     chartType='Bar'
                     data={this.dataBar}
                     headerText='Graf'
                     height={300}
                     width={700}
                  />
               </Col>
               <Col xl={6} lg={6} md={12} sm={12} xs={12} className=''>
                  <ChartCard
                     elevation='2'
                     chartType='Line'
                     data={this.data_line}
                     headerText='Graf'
                     height={300}
                     width={700}
                  />
               </Col>
               <Col xl={6} lg={6} md={12} sm={12} xs={12} className='mt-3'>
                  <ChartCard
                     elevation='2'
                     chartType='Line'
                     data={this.data}
                     headerText='Line_test'
                     height={300}
                     width={700}
                  />
               </Col>
               <Col xl={6} lg={6} md={12} sm={12} xs={12} className='mt-3'>
                  <ChartCard
                     elevation='2'
                     chartType='Bar'
                     data={this.data}
                     headerText='Bar_test'
                     height={300}
                     width={700}
                  />
               </Col>

               <Col xl={6} lg={6} md={12} sm={12} xs={12} className='mt-3'>
                  <ChartCard
                     elevation='2'
                     chartType='Pie'
                     data={this.dataRound}
                     headerText='Pie Test'
                     size='s'
                     height={300}
                     width={700}
                  />
               </Col>

               <Col xl={6} lg={6} md={12} sm={12} xs={12} className='mt-3'>
                  <ChartCard
                     elevation='2'
                     chartType='Doughnut'
                     data={this.dataRound}
                     headerText='Doughnut test'
                     size='s'
                     height={300}
                     width={700}
                  />
               </Col>

               <Col xl={12} lg={12} md={12} sm={12} xs={12} className='mt-3'>
                  <ChartCard
                     elevation='2'
                     chartType='Radar'
                     data={this.dataBar}
                     headerText='Radar test'
                     height={300}
                     width={700}
                     size='s'
                  />
               </Col>

               <Col xl={12} lg={12} md={12} sm={12} xs={12} className='mt-3'>
                  <ChartCard
                     elevation='2'
                     chartType='hBar'
                     data={this.dataBar}
                     headerText='Horizontal Bar'
                     height={300}
                     width={700}
                     size='xl'
                  />
               </Col>
            </Row>
         </div>
      );
   }
}
