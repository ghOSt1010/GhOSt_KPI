import React, { Component } from 'react';
import CardWithModal from '../../../components/Card/CardWithModal';
import LineChart from '../../../components/Charts/ApexChart/LineChart';
import { Row, Col } from 'reactstrap';

export default class ChartsBuilder extends Component {
   state = {
      kpis: []
   };
   componentDidMount() {
      this.unpackData();
   }

   unpackData() {
      var k = this.props.data.map(d => {
         return {
            name: d.name,
            target: d.target,
            labels: d.reports.map(r => {
               return new Date(r.reportedAt).toLocaleString();
            }),
            series: [
               {
                  name: d.name,
                  data: d.reports.map(r => {
                     return r.result;
                  })
               }
            ]
         };
      });
      this.setState({ kpis: k });
   }
   renderKPIs() {
      return this.state.kpis.map((kpi, key) => {
         return (
            <Col xs='12'>
               <CardWithModal
                  headerText={kpi.name}
                  className={key > 0 ? 'mt-3' : ''}
               >
                  <LineChart
                     labels={kpi.labels}
                     yaxisLabel='Results'
                     xasisLabel='Reports'
                     series={kpi.series}
                     targetValue={kpi.target}
                     targetInfo='KPI target'
                  />
               </CardWithModal>
            </Col>
         );
      });
   }

   render() {
      return <Row>{this.renderKPIs()}</Row>;
   }
}

ChartsBuilder.defaultProps = {
   data: []
};
