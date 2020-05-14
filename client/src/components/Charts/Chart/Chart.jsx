import React, { Component } from 'react';
import {
   Line,
   Bar,
   Pie,
   Doughnut,
   HorizontalBar,
   Radar,
   defaults
} from 'react-chartjs-2';
import UIManager from '../../../Modules/UIManager/UIManager';

export default class Chart_ extends Component {
   state = {
      theme: UIManager.getTheme()
   };

   componentWillReceiveProps() {
      this.setChartFontColor();
   }

   setChartFontColor() {
      const { theme } = this.state;

      if (theme === 'dark') {
         defaults.global.defaultFontColor = 'lightgray';
         defaults.global.legend.fontColor = 'white';
      }
      if (theme === 'light') {
         defaults.global.defaultFontColor = 'black';
         defaults.global.legend.fontColor = 'black';
      }
   }

   getChartOption(
      _displyGridLinesX = true,
      _displyGridLinesY = true,
      _isDoughnut = false
   ) {
      this.setChartFontColor();
      let _doughnutHole = 0;
      if (_isDoughnut) _doughnutHole = 75;
      let chartOption = {
         maintainAspectRatio: true,
         legend: {
            labels: {
               //fontColor: "black"
            }
         },
         responsive: true,
         cutoutPercentage: _doughnutHole,
         scales: {
            xAxes: [
               {
                  ticks: {
                     display: !_isDoughnut
                  },
                  gridLines: {
                     display: _displyGridLinesX,
                     drawBorder: false,
                     color: 'rgb(0,0,0,0.1)'
                  }
               }
            ],
            yAxes: [
               {
                  ticks: {
                     display: !_isDoughnut
                  },
                  gridLines: {
                     display: _displyGridLinesY,
                     drawBorder: false,
                     color: 'rgb(0,0,0,0.1)'
                  }
               }
            ]
         }
      };
      return chartOption;
   }

   //chart factory
   getChart(chartType, data, height, width) {
      if ((chartType === 'Bar') | (chartType === 'bar')) {
         return (
            <Bar
               options={this.getChartOption()}
               data={data}
               height={height}
               width={width}
            />
         );
      }
      if (
         (chartType === 'HorizontalBar') |
         (chartType === 'horizontalBar') |
         (chartType === 'hBar')
      ) {
         return (
            <HorizontalBar
               options={this.getChartOption()}
               data={data}
               height={height}
               width={width}
            />
         );
      }
      if ((chartType === 'Line') | (chartType === 'line')) {
         return (
            <Line
               options={this.getChartOption()}
               data={data}
               height={height}
               width={width}
            />
         );
      }
      if ((chartType === 'Pie') | (chartType === 'pie')) {
         return (
            <Pie
               options={this.getChartOption(false, false, true)}
               data={data}
               height={height}
               width={width}
            />
         );
      }
      if ((chartType === 'Radar') | (chartType === 'radar')) {
         return (
            <Radar
               options={this.getChartOption(false, false, true)}
               data={data}
               height={height}
               width={width}
            />
         );
      }
      if ((chartType === 'Doughnut') | (chartType === 'doughnut')) {
         return (
            <Doughnut
               options={this.getChartOption(false, false, true)}
               data={data}
               height={height}
               width={width}
            />
         );
      }
   }

   render() {
      const { chartType, data, height, width } = this.props;

      return <div>{this.getChart(chartType, data, height, width)}</div>;
   }
}
