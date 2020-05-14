import React, { Component } from 'react';
import { Card, Icon, Dialog } from '@blueprintjs/core';
import CardHeader from '../CardHeader';
import CardBody from '../CardBody';
import Chart from '../../Charts/Chart/Chart';

export default class CardWithChart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         modal: false,
      };
      this.windowMaximize = this.windowMaximize.bind(this);
   }

   toggle = () => {
      this.setState((state) => ({ collapse: !state.collapse }));
   };

   windowMaximize() {
      this.setState((state) => ({
         modal: !state.modal,
      }));
   }

   render() {
      const { headerText, chartType, data, height, width } = this.props;

      return (
         <Card elevation={this.props.elevation ? this.props.elevation : '2'}>
            <CardHeader>
               <span class='fas fa-chart-line header-icon mr-2' />
               {headerText}
               <div className='float-right'>
                  <Icon
                     icon='maximize'
                     iconSize={14}
                     onClick={this.windowMaximize}
                  />
               </div>
            </CardHeader>
            <CardBody>
               <Chart
                  theme={this.state.theme}
                  chartType={chartType}
                  data={data}
                  width={width}
                  height={height}
               />
            </CardBody>
            <Dialog
               isOpen={this.state.modal}
               onClose={() => this.windowMaximize()}
               className='modal-full modal-my'
            >
               <Card>
                  <CardHeader>
                     <span class='fas fa-chart-line header-icon' />
                     {headerText}
                     <div className='float-right'>
                        <Icon
                           icon='minimize'
                           iconSize={14}
                           onClick={this.windowMaximize}
                        />
                     </div>
                  </CardHeader>
                  <CardBody className='card-body'>
                     <Chart
                        theme={this.props.theme}
                        chartType={chartType}
                        data={data}
                        width={width}
                        height={height}
                     />
                  </CardBody>
               </Card>
            </Dialog>
         </Card>
      );
   }
}
CardWithChart.defaultProps = {
   size: 'm',
};
