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

export default class Table extends Component {
   state = {
      errorMsg: '',
   };
   renderTableHeader() {
      return <TableHeaders headers={this.props.headers} />;
   }
   renderTableBody() {
      return <tbody>{this.renderTableRows()}</tbody>;
   }
   renderTableRows() {
      return this.props.rows;
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

      if (this.props.rows.length === 0) {
         return this.renderNonIdealState('There are no items to display');
      }

      return (
         <HTMLTable
            fill='true'
            striped={striped ? striped : true}
            condensed
            interactive
            className={this.props.className}
         >
            {this.renderTableHeader()}
            {this.renderTableBody()}
         </HTMLTable>
      );
   }

   render() {
      const { isLoading } = this.props;

      if (isLoading) {
         return <Spinner intent='primary' />;
      }
      return this.renderContent();
   }
}

Table.defaultProps = {
   rows: [],
   onRefresh: function() {
      return;
   },
};
