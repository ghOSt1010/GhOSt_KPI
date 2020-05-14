import React, { Component } from 'react';
import { Dialog, Classes, HTMLTable } from '@blueprintjs/core';

export default class AboutAppDialog extends Component {
   render() {
      const { appName, author, version, releaseDate } = this.props;
      return (
         <Dialog
            isOpen={this.props.isOpen}
            onClose={this.props.handleClose}
            autoFocus
            canEscapeKeyClose={true}
            canOutsideClickClose={true}
            enforceFocus
            usePortal
         >
            <div className={Classes.DIALOG_BODY}>
               <p>
                  <strong>{appName} Application Platform</strong>
                  <p></p>
                  <HTMLTable striped condensed>
                     <thead>
                        <th colSpan='2'>App Details</th>
                     </thead>

                     <tbody>
                        <tr>
                           <td>Version</td>
                           <td>{version}</td>
                        </tr>
                        <tr>
                           <td>Author</td>
                           <td>{author}</td>
                        </tr>
                        <tr>
                           <td>Release</td>
                           <td>{releaseDate}</td>
                        </tr>
                     </tbody>
                  </HTMLTable>
               </p>
            </div>
         </Dialog>
      );
   }
}
