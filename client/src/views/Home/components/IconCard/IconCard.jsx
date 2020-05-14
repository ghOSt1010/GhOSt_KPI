import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { Card, Icon } from '@blueprintjs/core';
import CardBody from '../../../../components/Card/CardBody';
import './IconCard.css';

const pStyle = {
   'min-height': '80px'
};

export default class IconeCard extends Component {
   state = {
      disable: this.props.disable,
      name: 'N/A',
      icon: '',
      proc: 0,
      number: 0
   };

   getTrend = value => {
      if (value < 0) return '-';
      else if (value > 0) return '+';
      else return ' ';
   };

   render() {
      const { title, icon } = this.props;

      return (
         <Col xl='2' lg='2' md='3' sm='4' xs='12' className='mt-4'>
            <Card className={`text-center`}>
               <CardBody>
                  <div style={pStyle} className={`text-center`}>
                     <Link to={this.props.link}>
                        <div className='icon-card-icon mb-2'>
                           <Icon icon={icon} iconSize={45} />
                        </div>
                     </Link>
                     {title}
                  </div>
               </CardBody>
            </Card>
         </Col>
      );
   }
}
