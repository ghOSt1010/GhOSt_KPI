import React, { Component } from 'react';
import { Card, Icon, Dialog } from '@blueprintjs/core';
import CardHeader from './CardHeader';
import CardBody from './CardBody';

export default class CardWithModal extends Component {
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
      const { headerText } = this.props;

      return (
         <Card
            className={this.props.className}
            elevation={this.props.elevation ? this.props.elevation : '2'}
         >
            <CardHeader>
               <span class='fas fa-chart-line header-icon mr-2' />
               {headerText}
               <div className='float-right'>
                  <Icon
                     icon='maximize'
                     iconSize={14}
                     className='mr-2'
                     onClick={this.windowMaximize}
                  />
               </div>
            </CardHeader>
            <CardBody>{this.props.children}</CardBody>
            <Dialog
               isOpen={this.state.modal}
               onClose={() => this.windowMaximize()}
               className='modal-full modal-my'
            >
               <Card
                  elevation={this.props.elevation ? this.props.elevation : '2'}
               >
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
                     {this.props.children}
                  </CardBody>
               </Card>
            </Dialog>
         </Card>
      );
   }
}
CardWithModal.defaultProps = {
   size: 'm',
};
