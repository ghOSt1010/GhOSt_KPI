import React, { Component } from 'react';
import { Dialog, Card, Alert, Portal, H5 } from '@blueprintjs/core';
import ProjectForm from '../Forms/ProjectForm';

export default class ProjectDialog extends Component {
   render() {
      return (
         <div id='ProjectDialog'>
            <Dialog
               isOpen={this.props.isOpen}
               onClose={this.props.toClose}
               toggle={this.props.toOpen}
            >
               <Card>
                  <div className='card-body'>
                     <div id={this.props.id}>
                        <ProjectForm
                           name={this.props.name}
                           manager={this.props.manager}
                           selectedManager={this.props.selectedManager}
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
                        container={document.getElementById('ProjectDialog')}
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
