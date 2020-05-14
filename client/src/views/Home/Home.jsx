import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, H2, Classes } from '@blueprintjs/core';
import Client from '../../Modules/Client/Client';

export default class Home extends Component {
   state = {
      testResult: '',
      testServiceResult: []
   };
   componentDidMount() {
      //this.getUserData();
   }

   async getUserData() {
      let result = await Client.testingCurrentUserAuth();

      this.setState({
         testResult: result
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
                     <Card>
                        <div className='bp3-card-header'>
                           <div className='bp3-card-header-content'>
                              Project info
                           </div>
                        </div>
                        <div className='card-body'>
                           <h4>This application is created for KPI analysis</h4>
                           <hr></hr>
                           <h5 className={Classes.TEXT_MUTED}>
                              current version: 0.0.1
                           </h5>
                           <hr />
                           <h5 className={Classes.TEXT_MUTED}>
                              Author: Rafal Cymbalista
                           </h5>
                        </div>
                     </Card>
                  </Col>
               </Row>
            </div>
         </div>
      );
   }
}
