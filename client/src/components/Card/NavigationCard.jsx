import React, { Component } from 'react';
import { Card } from '@blueprintjs/core';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { Row, Col } from 'reactstrap';

export default class NavigationCard extends Component {
   footer() {
      if (this.props.footer) {
         return (
            <CardFooter>
               <div className='float-right'>{this.props.footer}</div>
            </CardFooter>
         );
      }
   }

   render() {
      return (
         <div>
            <Card
               className={`${this.props.className ? this.props.className : ''}`}
               style={this.props.style}
               elevation={this.props.elevation ? this.props.elevation : '2'}
            >
               <CardHeader>{this.props.header}</CardHeader>
               <CardBody className='p-0'>
                  <Row className='m-0'>
                     <Col
                        xs='2'
                        className='bp3-card-nav-panel'
                        style={this.props.style}
                     >
                        <div>{this.props.navigation}</div>
                     </Col>
                     <Col
                        xs='10'
                        className='bp3-card-panel'
                        style={this.props.style}
                     >
                        <CardBody>{this.props.content}</CardBody>
                     </Col>
                  </Row>
               </CardBody>
               {this.footer()}
            </Card>
         </div>
      );
   }
}
