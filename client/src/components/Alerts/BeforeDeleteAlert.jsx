import React, { Component } from 'react';
import { Alert, Portal, H5, Classes } from '@blueprintjs/core';

export default class BeforeDeleteAlert extends Component {
   render() {
      const { isOpen, onConfirm, onCancel, portalID, info } = this.props;
      return (
         <Alert
            isOpen={isOpen}
            confirmButtonText='Delete'
            onConfirm={onConfirm}
            cancelButtonText='Cancel'
            onCancel={onCancel}
            intent='danger'
            icon='issue'
            ussePortal={
               <Portal container={document.getElementById(portalID)} />
            }
         >
            <H5>Are you sure that you want to delete?</H5>
            <strong>{info}</strong>
            <p></p>
            <strong
               className={Classes.TEXT_MUTED}
            >{`Will be permanentyly deleted...`}</strong>
         </Alert>
      );
   }
}
