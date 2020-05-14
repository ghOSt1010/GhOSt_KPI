import React, { Component } from 'react';
import { Tabs, Tab, H2, Card } from '@blueprintjs/core';
import TeamsTable from '../../components/Tables/TeamsTable';
import TeamDialog from '../../components/Dialogs/TeamDialog';
import Client from '../../Modules/Client/Client';
import TableControllers from '../../components/Tables/TableControllers';
import BeforeDeleteAlert from '../../components/Alerts/BeforeDeleteAlert';

export default class Teams extends Component {
   state = {
      activeTabID: 'Teams',
      selectedTabId: 'Teams',
      isLoading: true,
      data: [],
      openAlert: true,
      errorMessage: '',
      isAddDialogOpen: false,
      isEditDialogOpen: false,
      isDeleteAlertOpen: false,
      canEdit: !false,
      canDelete: !false,
      name: '',
      manager: '',
      selected: {},
   };

   getSelected = (sel, isSelected) => {
      this.setState({
         selected: sel,
         canEdit: isSelected,
         canDelete: isSelected,
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
         result = await Client.Services.TeamsService.getTeams();
         this.setState({
            data: result.data,
         });
      } catch (err) {
         alert(err);
         this.setState({ errorMsg: err.response });
         Client.Notifications.alert('Error while loading Teams list');
      } finally {
         this.setLoading(false);
      }
   }

   async deleteItem(id) {
      var result;
      try {
         this.resetErrorMsg();
         result = await Client.Services.TeamsService.deleteTeamByID(id);
         if (result.status === 200) {
            Client.Notifications.success('Team removed successfully');
         }
      } catch (err) {
         this.setState({ errorMsg: err.response.status });
         Client.Notifications.alert('Error, cannot delete Team');
      } finally {
         this.getData();
         this.closeDeleteAlert();
      }
   }

   handleSubmit = async (e) => {
      e.preventDefault();
      const { name, manager } = this.state;
      var errorMsg = 'Unknown Error';
      let team = await Client.Services.TeamsService.createTeamDTO(
         name,
         manager
      );
      try {
         let result = await Client.Services.TeamsService.saveTeam(team);
         if (result.status === 200) {
            Client.Notifications.success(`Team ${name} successfully saved`);
            this.getData();
         }
      } catch (err) {
         if (err.response.status === 409) {
            errorMsg = `Error: ${err.response.data.message}`;
            Client.Notifications.alert(errorMsg);
         }
         if (err.response.status !== 409) {
            errorMsg = `Error:  while saving: ${name} Team`;
            Client.Notifications.error(errorMsg);
         }
         this.openAlert(errorMsg);
      }
   };
   handleUpdate = async (e) => {
      e.preventDefault();
      const { name, manager, selected } = this.state;

      var errorMsg = 'Unknown Error';
      try {
         let team = await Client.Services.TeamsService.createTeamDTO(
            name,
            manager
         );
         team.team._id = selected._id;
         let result = await Client.Services.TeamsService.updateTeam(team);
         if (result.status === 200) {
            Client.Notifications.success(`Team ${name} successfully saved`);
            this.getData();
            console.log(result.data.employee);
         }
      } catch (err) {
         if (err.response.status === 409) {
            errorMsg = `Error: ${err.response.data.message}`;
            Client.Notifications.alert(errorMsg);
         }
         if (err.response.status !== 409) {
            errorMsg = `Error:  while saving: ${name} team`;
            Client.Notifications.error(errorMsg);
         }
         this.openAlert(errorMsg);
      }
   };
   openAlert(msg) {
      this.setState({ isAlertOpen: true, errorMessage: msg });
   }
   closeAlert() {
      this.setState({ isAlertOpen: false, errorMessage: '' });
   }

   resetErrorMsg() {
      this.setState({ errorMessage: '' });
   }

   onChange = (e) => {
      const state = this.state;
      state[e.target.id] = e.target.value;
      this.setState(state);
   };

   openDialog() {
      this.setState({
         isAddDialogOpen: true,
      });
   }
   closeDialog() {
      this.setState({
         isAddDialogOpen: false,
      });
   }

   openEditDialog = async (e) => {
      e.preventDefault();
      const { selected } = this.state;
      try {
         let result = await Client.Services.TeamsService.getTeamById(
            selected._id
         );
         if (result.status === 200) {
            let team = result.data;
            console.log(team);
            this.setState({
               isEditDialogOpen: true,
               name: team.name,
               manager: team.manager._id,
            });
         }
      } catch (err) {
         console.log(err);
         this.setState({
            isEditDialogOpen: true,
            name: selected.name,
            manager: selected.manager._id,
         });
      }
   };
   closeEditDialog() {
      this.setState({
         isEditDialogOpen: false,
      });
   }

   openDeleteAlert() {
      this.setState({
         isDeleteAlertOpen: true,
      });
   }
   closeDeleteAlert() {
      this.setState({
         isDeleteAlertOpen: false,
      });
   }

   setLoading(loading) {
      this.setState({
         isLoading: loading,
      });
   }

   handleTabChange = (activeTabID) => {
      this.setState({
         activeTabID: activeTabID,
         selectedTabId: activeTabID,
      });
   };
   clearForm() {
      this.setState({
         name: '',
         manager: '',
         isAlertOpen: false,
         errorMessage: '',
      });
   }

   renderControlls() {
      if (this.state.selectedTabId === 'Teams') {
         return (
            <TableControllers
               onEdit={this.openEditDialog}
               canEdit={this.state.canEdit}
               onAdd={() => this.openDialog()}
               onDelete={() => this.openDeleteAlert()}
               canDelete={this.state.canDelete}
               onRefresh={() => this.getData()}
            />
         );
      }
   }

   render() {
      const {
         data,
         isLoading,
         name,
         manager,
         isAlertOpen,
         selected,
      } = this.state;

      return (
         <div id='TeamsPanel'>
            <div className='mt-2'>
               <H2>Teams Panel</H2>
            </div>
            <Tabs
               onChange={this.handleTabChange}
               selectedTabId={this.state.selectedTabId}
               large
            >
               <Tab
                  id='Teams'
                  title='Teams'
                  panel={
                     <div className='main-container-tab-content'>
                        <Card elevation='2'>
                           <TeamsTable
                              data={data}
                              onRefresh={() => this.getData()}
                              isLoading={isLoading}
                              onSelection={this.getSelected}
                           />
                           <TeamDialog
                              isOpen={this.state.isEditDialogOpen}
                              toOpen={() => this.openEditDialog()}
                              toClose={() => this.closeEditDialog()}
                              name={name}
                              manager={manager}
                              selectedManager={manager}
                              onChange={this.onChange}
                              handleSubmit={this.handleUpdate}
                              buttonCaption='Update'
                              onClear={() => this.clearForm()}
                              isAlertOpen={isAlertOpen}
                              closeAlert={() => this.closeAlert()}
                           />
                           <TeamDialog
                              isOpen={this.state.isAddDialogOpen}
                              toOpen={() => this.openDialog()}
                              toClose={() => this.closeDialog()}
                              name={name}
                              manager={manager}
                              onChange={this.onChange}
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
                              portalID='TeamsPanel'
                              info={`Team: ${selected.name}`}
                           />
                        </Card>
                     </div>
                  }
               />
               <Tabs.Expander />
               {this.renderControlls()}
            </Tabs>
         </div>
      );
   }
}
