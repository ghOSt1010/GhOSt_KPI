import React, { Component } from 'react';
import { Dialog, Card, Alert, Portal, H5 } from '@blueprintjs/core';
import EmployeeForm from '../Forms/EmployeeForm';

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
                        <EmployeeForm
                           name={this.props.name}
                           email={this.props.email}
                           user={this.props.user}
                           selectedUser={this.props.selectedUser}
                           type={this.props.type}
                           selectedType={this.props.selectedType}
                           project={this.props.project}
                           selectedProject={this.props.selectedProject}
                           team={this.props.team}
                           selectedTeam={this.props.selectedTeam}
                           onChange={this.props.onChange}
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
