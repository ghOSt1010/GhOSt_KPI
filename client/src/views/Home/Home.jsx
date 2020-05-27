import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, H2, Classes } from '@blueprintjs/core';
import CardHeader from '../../components/Card/CardHeader';
import CardFooter from '../../components/Card/CardFooter';
import CardBody from '../../components/Card/CardBody';
import Client from '../../Modules/Client/Client';

export default class Home extends Component {
   state = {
      testResult: '',
      testServiceResult: [],
   };
   componentDidMount() {
      //this.getUserData();
   }

   async getUserData() {
      let result = await Client.testingCurrentUserAuth();

      this.setState({
         testResult: result,
      });
   }

   render() {
      return (
         <div>
            <div className='mt-2'>
               <H2>GhOSt KPI Application</H2>
            </div>

            <div className='container-fluid'>
               <Row>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12} className='mt-3'>
                     <Card elevation='2'>
                        <CardHeader icon='home' headerText='Project Info' />
                        <CardBody>
                           <h4>This application is created for KPI analysis</h4>
                           <hr />
                           <h5 className={Classes.TEXT_MUTED}>
                              current version: 0.0.1
                           </h5>
                           <hr />
                           <h5 className={Classes.TEXT_MUTED}>
                              Author: Rafal Cymbalista
                           </h5>
                        </CardBody>
                        <CardFooter>footer test</CardFooter>
                     </Card>
                  </Col>
               </Row>
            </div>
         </div>
      );
   }
}
