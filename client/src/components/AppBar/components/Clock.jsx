import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';

export default class Clock extends Component {
   state = {
      time: '',
      timerVisible: false,
   };
   componentDidMount() {
      this.intervalID = setInterval(() => this.getTime(), 1000);
   }
   getTime() {
      let time = new Date();
      time = this.getTimeString(time.getHours(), time.getMinutes());
      this.setState({ time: time });
   }

   getTimeString(h, m) {
      if (h < 10) {
         h = '0' + h;
      }
      if (m < 10) {
         m = '0' + m;
      }
      return h + ':' + m;
   }

   hideTimer() {
      const timerVisible = !this.state.timerVisible;
      this.setState({
         timerVisible: timerVisible,
      });
   }
   render() {
      const { timerVisible, time } = this.state;
      return (
         <Button rightIcon='time' minimal onClick={() => this.hideTimer()}>
            {timerVisible ? time : ''}
         </Button>
      );
   }
}
