import React, { Component } from 'react';
import {
   HTMLTable,
   Button,
   NonIdealState,
   H5,
   Spinner,
   Classes,
} from '@blueprintjs/core';
import TableHeaders from './TableHeaders';
import TableRows from './TableRows';
import CardHeader from '../Card/CardHeader';
import TableControllers from './TableControllers';

export default class Table extends Component {
   state = {
      errorMsg: '',
   };

   __capitalize = (s) => {
      if (typeof s !== 'string') return '';
      return s.charAt(0).toUpperCase() + s.slice(1);
   };

   renderTableHeader() {
      if (this.props.headers) {
         let headers = this.props.headers.map((p) => {
            if (p !== '_id' && p !== '__v') {
               return {
                  text: p.text,
                  center: p.center,
               };
            }
            return undefined;
         });
         return <TableHeaders headers={headers} />;
      }
      let headers = Object.keys(this.props.data[0]).map((p) => {
         if (p !== '_id' && p !== '__v') {
            return {
               text: this.__capitalize(p.replace('_', ' ')),
               center: false,
            };
         }
         return undefined;
      });
      return <TableHeaders headers={headers} />;
   }

   renderTableBody() {
      return <tbody>{this.renderTableRows()}</tbody>;
   }

   renderTableRows() {
      if (this.props.rows) {
         return this.props.rows;
      }
      return (
         <TableRows
            rows={this.props.data}
            handleSelection={this.props.handleSelection}
         />
      );
   }

   renderNonIdealState(header, information = '') {
      return (
         <div className='card-body'>
            <NonIdealState icon='issue'>
               <H5>
                  <strong>{header}</strong>
               </H5>
               <i className={Classes.TEXT_MUTED}>{information}</i>
               <Button
                  icon='refresh'
                  minimal
                  onClick={() => {
                     this.props.onRefresh();
                     this.setState({
                        errorMsg: '',
                     });
                  }}
               />
            </NonIdealState>
         </div>
      );
   }

   renderContent() {
      const { striped } = this.props;
      if (this.props.errorMsg) {
         this.renderNonIdealState('Something went wrong', 'Cannot load table');
      }

      if (this.props.data.length === 0 && this.props.rows.length === 0) {
         return this.renderNonIdealState('There are no items to display');
      }

      return (
         <HTMLTable
            fill='true'
            striped={striped ? striped : true}
            condensed
            interactive
            className={this.props.className}
            style={{ height: this.props.height }}
         >
            {this.renderTableHeader()}
            {this.renderTableBody()}
         </HTMLTable>
      );
   }

   renderTableTop() {
      if (this.props.title || this.props.crud) {
         return (
            <CardHeader
               noBorder
               icon={this.props.title ? 'th' : ''}
               headerText={this.props.title}
               controlls={
                  <TableControllers
                     onEdit={this.props.onEdit}
                     canEdit={this.props.canEdit}
                     onAdd={this.props.onAdd}
                     onDelete={this.props.onDelete}
                     canDelete={this.props.canDelete}
                     onRefresh={this.props.onRefresh}
                  />
               }
            />
         );
      }
   }

   render() {
      const { isLoading } = this.props;

      if (isLoading) {
         return <Spinner intent='primary' />;
      }
      return (
         <div>
            {this.renderTableTop()}
            {this.renderContent()}
         </div>
      );
   }
}

const _void = () => {
   return;
};

Table.defaultProps = {
   data: [],
   striped: true,
   errorMsg: '',
   className: '',
   //onEdit: _void,
   //canEdit: _void,
   //onAdd: _void,
   //onDelete: _void,
   //canDelete: _void,
   //onRefresh: _void,
   handleSelection: _void,
};
