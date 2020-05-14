import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { NonIdealState } from '@blueprintjs/core';
import UIManager from '../../../Modules/UIManager/UIManager';

export default class LineChart extends Component {
   constructor(props) {
      super(props);

      this.state = {
         options: {
            chart: {
               id: 'basic-bar',
               background: 'transparent',
               dropShadow: {
                  enabled: true,
                  color: '#000',
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2
               },
               foreColor:
                  UIManager.getTheme() === 'dark' ? '#f5f8fa' : '#1e1e1e',
               toolbar: false
            },
            dataLabels: {
               enabled: true
            },
            stroke: {
               curve: 'smooth'
            },
            title: {
               text: 'Some Data',
               align: 'left'
            },
            grid: {
               borderColor: 'rbga(0,0,0,0.5)',
               row: {
                  colors: ['rgba(0,0,0,0.2)', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
               }
            },
            xaxis: {
               type: 'date',
               labels: {
                  style: {
                     cssClass: 'text'
                  }
               },

               categories: this.props.labels,
               axisBorder: {
                  show: true
               },
               tooltip: {
                  enabled: false
               }
            },
            yaxis: {
               //min: 5,
               max:
                  Math.max(this.props.series[0].data) > this.props.targetValue
                     ? Math.max(this.props.series[0].data) + 30
                     : this.props.targetValue + 30
            },
            annotations: {
               position: 'back',
               yaxis: [
                  {
                     y: this.props.targetValue,
                     y2: null,
                     strokeDashArray: 3,
                     borderColor: 'red',
                     fillColor: '#b30000',
                     opacity: 0.8,
                     offsetX: 0,
                     offsetY: 0,
                     yAxisIndex: 0,
                     label: {
                        borderColor: 'transparent',
                        style: {
                           color: '#fff',
                           background: '#b30000'
                        },
                        position: 'right',
                        offsetX: 0,
                        offsetY: 15,
                        text:
                           this.props.targetInfo + ': ' + this.props.targetValue
                     }
                  },
                  {
                     y: this.getAverage(),
                     y2: null,
                     strokeDashArray: 3,
                     borderColor: '#279f27',
                     fillColor: '#279f27',
                     opacity: 0.8,
                     offsetX: 0,
                     offsetY: 0,
                     yAxisIndex: 0,
                     label: {
                        borderColor: 'transparent',
                        style: {
                           color: '#fff',
                           background: '#279f27'
                        },
                        position: 'right',
                        text: 'Average: ' + this.getAverage(),
                        offsetX: 0,
                        offsetY: 0
                     }
                  }
               ]
            },
            legend: {
               position: 'top',
               horizontalAlign: 'right',
               floating: true,
               offsetY: -25,
               offsetX: -5
            }
         },
         series: this.props.series
      };
   }

   getAverage() {
      if (this.props.series[0].data.length === 0) {
         return 0;
      }
      let values = this.props.series[0].data;
      let sum = values.reduce((previous, current) => (current += previous));
      let avg = sum / values.length;
      return avg.toPrecision(3);
   }
   render() {
      if (this.props.series[0].data.length === 0) {
         return (
            <NonIdealState
               icon='warning-sign'
               description='There is no data to be displayed'
            />
         );
      }
      return (
         <Chart
            options={this.state.options}
            series={this.props.series}
            type='line'
            width='100%'
            height={300}
         />
      );
   }
}
