import React, { Component } from 'react';
import { Dialog, Card, Alert, Portal, H5 } from '@blueprintjs/core';
import ReportDialog from '../Forms/ReportForm';

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
                        <ReportDialog
                           onChange={this.props.onChange}
                           onResultValueChange={this.props.onResultValueChange}
                           onSubmit={this.props.handleSubmit}
                           buttonCaption={this.props.buttonCaption}
                           onClear={this.props.onClear}
                           kpi={this.props.kpi}
                           reportedBy={this.props.reportedBy}
                           result={this.props.result}
                           completed={this.props.completed}
                           status={this.props.status}
                           reportedAt={this.props.reportedAt}
                           selectedKPI={this.props.selectedKPI}
                           handleDateChange={this.props.handleDateChange}
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
