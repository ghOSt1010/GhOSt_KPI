import React, { Component } from 'react';
import { CardText, Col, Collapse } from 'reactstrap';
import { Card, Icon } from '@blueprintjs/core';
//import Card from './Card';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import './StdCard.css';

export default class StdCard extends Component {
   state = {
      isBodyOpen: this.props.isBodyOpen,
   };

   setSize(size) {
      if (size === 's') {
         return (size = {
            xl: 4,
            lg: 4,
            md: 4,
            sm: 6,
            xs: 12,
         });
      }

      if (size === 'm') {
         return (size = {
            xl: 6,
            lg: 6,
            md: 6,
            sm: 6,
            xs: 12,
         });
      }

      if (size === 'l') {
         return (size = {
            xl: 8,
            lg: 8,
            md: 8,
            sm: 12,
            xs: 12,
         });
      }

      if (size === 'xl') {
         return (size = {
            xl: 12,
            lg: 12,
            md: 12,
            sm: 12,
            xs: 12,
         });
      }

      return (size = {
         xl: 6,
         lg: 6,
         md: 6,
         sm: 6,
         xs: 12,
      });
   }

   toggle = () => {
      this.setState((state) => ({ isBodyOpen: !state.isBodyOpen }));
   };

   render() {
      const {
         children,
         icon,
         headerText,
         bodyText,
         cardText,
         size,
      } = this.props;

      return (
         <Col
            xl={this.setSize(size).xl}
            lg={this.setSize(size).lg}
            md={this.setSize(size).md}
            sm={this.setSize(size).sm}
            xs={this.setSize(size).xs}
            className='mt-3'
         >
            <Card elevation={this.props.elevation ? this.props.elevation : '2'}>
               <CardHeader isBodyOpen={this.state.isBodyOpen}>
                  <Icon icon={icon} className='mr-2' />
                  {headerText}

                  <div className='float-right'>
                     {this.props.controlls}
                     <Icon icon='chevron-down' onClick={this.toggle} />
                  </div>
               </CardHeader>
               <Collapse isOpen={this.state.isBodyOpen}>
                  <CardBody>
                     {bodyText}
                     {children}
                     <CardText>{cardText}</CardText>
                  </CardBody>
               </Collapse>
            </Card>
         </Col>
      );
   }
}

StdCard.defaultProps = {
   isBodyOpen: true,
};
