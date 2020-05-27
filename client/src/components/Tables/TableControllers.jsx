import React, { Component } from 'react';
import { ButtonGroup, Button, Divider } from '@blueprintjs/core';

export default class TableControllers extends Component {
   renderEdit() {
      if (this.props.onEdit) {
         return (
            <Button
               icon='edit'
               small
               minimal
               onClick={this.props.onEdit}
               disabled={this.props.canEdit}
            />
         );
      }
      return;
   }

   renderAdd() {
      if (this.props.onAdd) {
         return <Button icon='add' small minimal onClick={this.props.onAdd} />;
      }
      return;
   }

   renderDelete() {
      if (this.props.onDelete) {
         return (
            <Button
               icon='trash'
               small
               minimal
               onClick={this.props.onDelete}
               disabled={this.props.canDelete}
            />
         );
      }
      return;
   }

   renderDivider() {
      if (this.props.onEdit || this.props.onAdd || this.props.onDelete) {
         return <Divider />;
      }
      return;
   }

   renderRefresh() {
      if (this.props.onRefresh) {
         return (
            <Button
               icon='refresh'
               small
               minimal
               onClick={this.props.onRefresh}
            />
         );
      }
      return;
   }

   render() {
      return (
         <div className={this.props.inHeader ? '' : 'bp3-tab-controlls'}>
            <ButtonGroup>{this.props.children}</ButtonGroup>
            <ButtonGroup>
               {this.renderEdit()}
               {this.renderAdd()}
               {this.renderDelete()}
               {this.renderDivider()}
               {this.renderRefresh()}
            </ButtonGroup>
         </div>
      );
   }
}

TableControllers.defaultProps = {
   inHeader: true,
};
