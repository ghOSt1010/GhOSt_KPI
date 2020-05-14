import React, { Component } from 'react';
import { Dialog, Card, Alert, Portal, H5 } from '@blueprintjs/core';
import KPIForm from '../Forms/KPIForm';

export default class UserDialog extends Component {
   render() {
      return (
         <div id='userDialog'>
            <Dialog
               isOpen={this.props.isOpen}
               onClose={this.props.toClose}
               toggle={this.props.toOpen}
            >
               <Card>
                  <div className='card-body'>
                     <div id={this.props.id}>
                        <KPIForm
                           name={this.props.name}
                           time_from={this.props.time_from}
                           time_to={this.props.time_to}
                           selectedKPI={this.props.selectedKPI}
                           selectedProject={this.props.selectedProject}
                           selectedManager={this.props.selectedManager}
                           target={this.props.target}
                           onChange={this.props.onChange}
                           handleDateToChange={this.props.handleDateToChange}
                           handleDateFromChange={
                              this.props.handleDateFromChange
                           }
                           onTargetValueChange={this.props.onTargetValueChange}
                           onSubmit={this.props.handleSubmit}
                           buttonCaption={this.props.buttonCaption}
                           onClear={this.props.onClear}
                        />
                     </div>
                  </div>
               </Card>
               <Alert
                  isOpen={this.props.isAlertOpen}
                  confirmButtonText='Clear form'
                  onConfirm={this.props.onClear}
                  cancelButtonText='Cancel'
                  onCancel={this.props.closeAlert}
                  intent='danger'
                  icon='issue'
                  ussePortal={
                     <Portal
                        container={document.getElementById('userDialog')}
                     />
                  }
               >
                  <H5>{this.props.errorMessage}</H5>
                  <strong>Do you want to clear the data?</strong>
               </Alert>
            </Dialog>
         </div>
      );
   }
}
