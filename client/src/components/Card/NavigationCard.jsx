import React, { Component } from 'react';
import { Card } from '@blueprintjs/core';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { Row, Col } from 'reactstrap';

export default class NavigationCard extends Component {
   footer() {
      if (this.props.footer || this.props.footerRight) {
         return (
            <CardFooter right={this.props.footerRight}>
               {this.props.footer}
            </CardFooter>
         );
      }
   }

   render() {
      return (
         <Card
            className={`${this.props.className ? this.props.className : ''}`}
            style={this.props.style}
            elevation={this.props.elevation ? this.props.elevation : '2'}
         >
            <CardHeader icon={this.props.icon} controlls={this.props.controlls}>
               {this.props.header}
            </CardHeader>
            <CardBody className='p-0'>
               <Row className='m-0'>
                  <Col
                     xs='4'
                     sm='3'
                     className='bp3-card-nav-panel'
                     style={this.props.style}
                  >
                     <div>{this.props.navigation}</div>
                  </Col>
                  <Col
                     xs='8'
                     sm='9'
                     className='bp3-card-panel'
                     style={this.props.style}
                  >
                     <CardBody
                        style={{
                           minHeight: this.props.minHeight
                              ? this.props.minHeight
                              : '',
                        }}
                     >
                        {this.props.content}
                     </CardBody>
                  </Col>
               </Row>
            </CardBody>
            {this.footer()}
         </Card>
      );
   }
}
