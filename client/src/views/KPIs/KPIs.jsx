import React, { Component } from 'react';
import { Tabs, Tab, H2, Divider, Card } from '@blueprintjs/core';
import KPIsTable from '../../components/Tables/KPIsTable';
import KPIDialog from '../../components/Dialogs/KPIDialog';
import Client from '../../Modules/Client/Client';
import TableControllers from '../../components/Tables/TableControllers';
import BeforeDeleteAlert from '../../components/Alerts/BeforeDeleteAlert';

export default class Teams extends Component {
   state = {
      activeTabID: 'KPIs',
      selectedTabId: 'KPIs',
      isLoading: true,
      data: [],
      isNoData: true,
      openAlert: true,
      errorMessage: '',
      isAddDialogOpen: false,
      isEditDialogOpen: false,
      isDeleteAlertOpen: false,
      canEdit: !false,
      canDelete: !false,
      name: '',
      time_from: new Date(),
      time_to: this.setDefaultToDate(new Date()),
      target: 0,
      project: '',
      manager: '',
      selected: {}
   };

   setDefaultToDate(d) {
      const finalDate = new Date();
      finalDate.setDate(d.getDate() + 30);
      return finalDate;
   }

   getSelected = (sel, isSelected) => {
      this.setState({
         selected: sel,
         canEdit: isSelected,
         canDelete: isSelected
      });
   };

   componentDidMount() {
      this.getData();
   }

   async getData() {
      this.setLoading(true);
      var result;
      try {
         //this.resetErrorMsg();
         result = await Client.Services.KPIsService.getKPIs();
         this.setState({
            data: result.data,
            isNoData: false
         });
         if (result.data.length === 0) {
            this.setState({ isNoData: true });
         }
      } catch (err) {
         this.handleError(err);
      } finally {
         this.setLoading(false);
      }
   }

   async deleteItem(id) {
      var result;
      try {
         this.resetErrorMsg();
         result = await Client.Services.KPIsService.deleteKPIById(id);
         if (result.status === 200) {
            Client.Notifications.success('KPI removed successfully');
         }
      } catch (err) {
         this.handleError(err);
      } finally {
         this.getData();
         this.closeDeleteAlert();
      }
   }

   handleSubmit = async e => {
      e.preventDefault();
      const { name, time_from, time_to, target, project, manager } = this.state;
      let kpi = await Client.Services.KPIsService.createKPIDTO(
         name,
         time_from,
         time_to,
         target,
         project,
         manager
      );
      console.log(kpi);
      try {
         let result = await Client.Services.KPIsService.saveKPI(kpi);
         if (result.status === 200) {
            Client.Notifications.success(`KPI ${name} successfully saved`);
            this.getData();
         }
      } catch (err) {
         this.handleError(err);
      }
   };
   handleUpdate = async e => {
      e.preventDefault();
      const {
         name,
         time_from,
         time_to,
         target,
         project,
         manager,
         selected
      } = this.state;

      try {
         let kpi = await Client.Services.KPIsService.createKPIDTO(
            name,
            time_from,
            time_to,
            target,
            project,
            manager
         );
         kpi.kpi._id = selected._id;
         let result = await Client.Services.KPIsService.updateKPI(kpi);
         if (result.status === 200) {
            Client.Notifications.success(`KPI ${name} successfully saved`);
            this.getData();
         }
      } catch (err) {
         this.handleError(err);
      }
   };

   handleError(err) {
      var errorMsg = 'Unknown Error';
      if (err.response.status === 409) {
         errorMsg = `Error: ${err.response.data.message}`;
         Client.Notifications.alert(errorMsg);
      }
      if (err.response.status !== 409) {
         errorMsg = `Error:  while saving: item`;
         Client.Notifications.error(errorMsg);
      }
      this.openAlert(errorMsg);
   }

   openAlert(msg) {
      this.setState({ isAlertOpen: true, errorMessage: msg });
   }
   closeAlert() {
      this.setState({ isAlertOpen: false, errorMessage: '' });
   }

   resetErrorMsg() {
      this.setState({ errorMessage: '' });
   }

   onChange = e => {
      const state = this.state;
      state[e.target.id] = e.target.value;
      this.setState(state);
   };

   handleTargetValueChange = number => {
      this.setState({ target: number });
   };

   handleDateFromChange = newFromDate => {
      this.setState({ time_from: newFromDate });
   };
   handleDateToChange = newToDate => {
      this.setState({ time_to: newToDate });
   };

   openDialog() {
      this.setState({
         isAddDialogOpen: true
      });
   }
   closeDialog() {
      this.setState({
         isAddDialogOpen: false
      });
   }

   openEditDialog = async e => {
      e.preventDefault();
      const { selected } = this.state;
      try {
         let result = await Client.Services.KPIsService.getKPIById(
            selected._id
         );
         if (result.status === 200 || result.status === 304) {
            var kpi = result.data;
            console.log(kpi);

            this.setState({
               isEditDialogOpen: true,
               selected: kpi,
               name: kpi.name,
               time_from: new Date(kpi.time_from),
               time_to: new Date(kpi.time_to),
               target: kpi.target,
               project: kpi.project._id,
               manager: kpi.manager._id
            });
         }
      } catch (err) {
         console.log(err);
         this.setState({
            isEditDialogOpen: true,
            name: selected.name,
            manager: selected.manager._id,
            time_from: new Date(selected.time_from),
            time_to: new Date(selected.time_to),
            target: selected.target,
            project: selected.project._id
         });
      }
   };
   closeEditDialog() {
      this.setState({
         isEditDialogOpen: false
      });
   }

   openDeleteAlert() {
      this.setState({
         isDeleteAlertOpen: true
      });
   }
   closeDeleteAlert() {
      this.setState({
         isDeleteAlertOpen: false
      });
   }

   setLoading(loading) {
      this.setState({
         isLoading: loading
      });
   }

   handleTabChange = activeTabID => {
      this.setState({
         activeTabID: activeTabID,
         selectedTabId: activeTabID
      });
   };
   clearForm() {
      this.setState({
         name: '',
         manager: '',
         isAlertOpen: false,
         errorMessage: ''
      });
   }

   renderControlls() {
      if (this.state.selectedTabId === 'KPIs') {
         return (
            <TableControllers
               onEdit={this.openEditDialog}
               canEdit={this.state.canEdit}
               onAdd={() => this.openDialog()}
               onDelete={() => this.openDeleteAlert()}
               canDelete={this.state.canDelete}
               onRefresh={() => this.getData()}
            >
               <Divider></Divider>
            </TableControllers>
         );
      }
   }

   render() {
      const {
         data,
         isLoading,
         name,
         time_from,
         time_to,
         target,
         project,
         manager,
         isAlertOpen,
         selected
      } = this.state;

      return (
         <div id='KPIPanel'>
            <div className='mt-2'>
               <H2>KPIs Panel</H2>
            </div>
            <Tabs
               onChange={this.handleTabChange}
               selectedTabId={this.state.selectedTabId}
               large
            >
               <Tab
                  id='KPIs'
                  title='KPIs'
                  panel={
                     <Card>
                        <KPIsTable
                           isEmpty={this.state.isNoData}
                           data={data}
                           onRefresh={() => this.getData()}
                           isLoading={isLoading}
                           onSelection={this.getSelected}
                        />
                        <KPIDialog
                           isOpen={this.state.isEditDialogOpen}
                           toOpen={() => this.openEditDialog()}
                           toClose={() => this.closeEditDialog()}
                           name={selected.name}
                           time_from={time_from}
                           time_to={time_to}
                           target={target}
                           project={project}
                           selectedProject={project}
                           manager={manager}
                           selectedManager={manager}
                           onChange={this.onChange}
                           handleDateFromChange={this.handleDateFromChange}
                           handleDateToChange={this.handleDateToChange}
                           onTargetValueChange={this.handleTargetValueChange}
                           handleSubmit={this.handleUpdate}
                           buttonCaption='Update'
                           onClear={() => this.clearForm()}
                           isAlertOpen={isAlertOpen}
                           closeAlert={() => this.closeAlert()}
                        />
                        <KPIDialog
                           isOpen={this.state.isAddDialogOpen}
                           toOpen={() => this.openDialog()}
                           toClose={() => this.closeDialog()}
                           name={name}
                           time_from={time_from}
                           time_to={time_to}
                           target={target}
                           project={project}
                           manager={manager}
                           onChange={this.onChange}
                           handleDateFromChange={this.handleDateFromChange}
                           handleDateToChange={this.handleDateToChange}
                           onTargetValueChange={this.handleTargetValueChange}
                           handleSubmit={this.handleSubmit}
                           buttonCaption='Add'
                           onClear={() => this.clearForm()}
                           isAlertOpen={isAlertOpen}
                           closeAlert={() => this.closeAlert()}
                        />
                        <BeforeDeleteAlert
                           isOpen={this.state.isDeleteAlertOpen}
                           onConfirm={() => this.deleteItem(selected._id)}
                           onCancel={() => this.closeDeleteAlert()}
                           portalID='KPIPanel'
                           info={`KPI: ${selected.name}`}
                        />
                     </Card>
                  }
               />
               <Tabs.Expander />
               {this.renderControlls()}
            </Tabs>
         </div>
      );
   }
}
/**
  * 
  * 
    <Button icon='annotation' minimal small></Button>
    <Button icon='dashboard' minimal small></Button>
    <Button icon='eye-open' minimal small></Button>
  * 
  * 
  */
