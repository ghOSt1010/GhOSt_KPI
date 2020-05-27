import React, { Component } from 'react';
import Table from './Table';

export default class KPIsTable extends Component {
   state = {
      selected: '',
      data: [],
   };

   handleSelection = (e, kpi) => {
      e.preventDefault();
      const { selected } = this.state;
      if (selected._id !== kpi._id) {
         this.props.onSelection(kpi, false);
         this.setState({
            selected: kpi,
         });
         return;
      }
      this.props.onSelection({}, true);
      this.setState({ selected: {} });
   };

   render() {
      return (
         <Table
            title='KPIs'
            handleSelection={this.handleSelection}
            headers={this.props.headers}
            data={this.props.data}
            errorMsg={this.props.errorMsg}
            isLoading={this.props.isLoading}
            onRefresh={this.props.onRefresh}
            onEdit={this.props.onEdit}
            canEdit={this.props.canEdit}
            onAdd={this.props.onAdd}
            onDelete={this.props.onDelete}
            canDelete={this.props.canDelete}
         />
      );
   }
}

KPIsTable.defaultProps = {
   data: [],
   onRefresh: function() {
      return;
   },
};
