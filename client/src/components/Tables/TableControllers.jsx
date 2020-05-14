import React, { Component } from 'react';
import { ButtonGroup, Button, Divider } from '@blueprintjs/core';

export default class TableControllers extends Component {
   render() {
      const {
         onEdit,
         canEdit,
         onAdd,
         onDelete,
         canDelete,
         onRefresh,
      } = this.props;
      return (
         <div className='bp3-tab-controlls'>
            <ButtonGroup>{this.props.children}</ButtonGroup>
            <ButtonGroup>
               <Button
                  icon='edit'
                  small
                  minimal
                  onClick={onEdit}
                  disabled={canEdit}
               />
               <Button icon='add' small minimal onClick={onAdd} />
               <Button
                  icon='trash'
                  small
                  minimal
                  onClick={onDelete}
                  disabled={canDelete}
               />
               <Divider />
               <Button icon='refresh' small minimal onClick={onRefresh} />
            </ButtonGroup>
         </div>
      );
   }
}
