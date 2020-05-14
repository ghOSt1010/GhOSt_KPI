import React, { Component } from 'react';
import { Tabs, Tab, H2, Card } from '@blueprintjs/core';
import Client from '../../Modules/Client/Client';
import TableControllers from '../../components/Tables/TableControllers';
import EmployeePanel from '../../components/Panels/EmployeePanel';

export default class Employees extends Component {
   state = {
      activeTabID: 'Employees',
      selectedTabId: 'Employees',
      isLoading: true,
      data: [],
      openAlert: true,
      errorMessage: '',
      isEmployeesDialogOpen: false,
      name: '',
      email: '',
      user: '',
      type: '',
      project: '',
      team: '',
      selected: {},
      isUserEditDialogOpen: false,
      isDeleteAlertOpen: false,
      canEdit: !false,
      canDelete: !false
   };

   getSelected = (emp, isSelected) => {
      this.setState({
         selected: emp,
         canEdit: isSelected,
         canDelete: isSelected
      });
   };

   componentDidMount() {
      this.getEmployeesData();
   }

   async getEmployeesData() {
      this.setLoading(true);
      var result;
      try {
         //this.resetErrorMsg();
         result = await Client.Services.EmployeesService.getEmployees();
         this.setState({
            data: result.data
         });
      } catch (err) {
         alert(err);
         this.setState({ errorMsg: err.response });
         Client.Notifications.alert('Error while loading Employees list');
      } finally {
         this.setLoading(false);
      }
   }

   async deleteEmployee(id) {
      var result;
      try {
         this.resetErrorMsg();
         result = await Client.Services.EmployeesService.deleteEmployeeById(id);
         if (result.status === 200) {
            Client.Notifications.success('Employee removed successfully');
         }
      } catch (err) {
         this.setState({ errorMsg: err.response.status });
         Client.Notifications.alert('Error, cannot delete uEmployeeser');
      } finally {
         this.getEmployeesData();
         this.closeDeleteAlert();
      }
   }

   handleSubmit = async e => {
      e.preventDefault();
      const { email, name, team, project, user, type } = this.state;
      var errorMsg = 'Unknown Error';
      let emp = await Client.Services.EmployeesService.createEmployeeDTO(
         name,
         email,
         user,
         type,
         project,
         team
      );
      try {
         let result = await Client.Services.EmployeesService.saveEmployee(emp);
         if (result.status === 200) {
            Client.Notifications.success(`Employee ${name} successfully saved`);
            this.getEmployeesData();
         }
      } catch (err) {
         if (err.response.status === 409) {
            errorMsg = `Error: ${err.response.data.message}`;
            Client.Notifications.alert(errorMsg);
         }
         if (err.response.status !== 409) {
            errorMsg = `Error:  while saving: ${name} Employee`;
            Client.Notifications.error(errorMsg);
         }
         this.openAlert(errorMsg);
      }
   };
   handleUpdate = async e => {
      e.preventDefault();
      const { name, email, user, type, project, team, selected } = this.state;

      var errorMsg = 'Unknown Error';
      try {
         let emp = await Client.Services.EmployeesService.getEmployeeUpdateDTO(
            selected._id,
            name,
            email,
            user,
            type,
            project,
            team
         );
         let result = await Client.Services.EmployeesService.updateEmployee(
            emp
         );
         if (result.status === 200) {
            Client.Notifications.success(`Employee ${name} successfully saved`);
            this.getEmployeesData();
         }
      } catch (err) {
         if (err.response.status === 409) {
            errorMsg = `Error: ${err.response.data.message}`;
            Client.Notifications.alert(errorMsg);
         }
         if (err.response.status !== 409) {
            errorMsg = `Error:  while saving: ${name} Employee`;
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

   onChange = e => {
      const state = this.state;
      state[e.target.id] = e.target.value;
      this.setState(state);
   };

   openEmployeesDialog() {
      this.setState({
         isEmployeesDialogOpen: true
      });
   }
   closeEmployeesDialog() {
      this.setState({
         isEmployeesDialogOpen: false
      });
   }

   openUserEditDialog = async e => {
      e.preventDefault();
      const { selected } = this.state;
      try {
         let result = await Client.Services.EmployeesService.getEmployeeById(
            selected._id
         );
         if (result.status === 200) {
            let emp = result.data;
            this.setState({
               isUserEditDialogOpen: true,
               name: emp.name,
               email: emp.email,
               user: emp.user._id,
               type: emp.type._id,
               project: emp.project._id,
               team: emp.team._id
            });
         }
      } catch (err) {
         console.log(err);
         this.setState({
            isUserEditDialogOpen: true,
            name: selected.name,
            email: selected.email,
            user: selected.user._id,
            type: selected.type._id,
            project: selected.project === null ? '' : selected.project._id,
            team: selected.team._id
         });
      }
   };
   closeUserEditDialog() {
      this.setState({
         isUserEditDialogOpen: false
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
         email: '',
         user: '',
         type: '',
         project: '',
         team: '',
         isAlertOpen: false,
         errorMessage: ''
      });
   }

   renderControlls() {
      if (this.state.selectedTabId === 'Employees') {
         return (
            <TableControllers
               onEdit={this.openUserEditDialog}
               canEdit={this.state.canEdit}
               onAdd={() => this.openEmployeesDialog()}
               onDelete={() => this.openDeleteAlert()}
               canDelete={this.state.canDelete}
               onRefresh={() => this.getEmployeesData()}
            />
         );
      }
   }

   render() {
      const {
         data,
         isLoading,
         email,
         name,
         team,
         project,
         user,
         type,
         isAlertOpen,
         selected
      } = this.state;

      return (
         <div id='EmployeePanel'>
            <div className='mt-2'>
               <H2>Employees Panel</H2>
            </div>
            <Tabs
               onChange={this.handleTabChange}
               selectedTabId={this.state.selectedTabId}
               large
            >
               <Tab
                  id='Employees'
                  title='Employees'
                  panel={
                     <Card>
                        <EmployeePanel
                           data={data}
                           onRefresh={() => this.getEmployeesData()}
                           isLoading={isLoading}
                           isAlertOpen={isAlertOpen}
                           isDeleteAlertOpen={this.state.isDeleteAlertOpen}
                           getSelected={this.getSelected}
                           isUserEditDialogOpen={
                              this.state.isUserEditDialogOpen
                           }
                           toOpenUserEditDialog={() =>
                              this.openUserEditDialog()
                           }
                           toCloseUserEditDialog={() =>
                              this.closeUserEditDialog()
                           }
                           isEmployeesDialogOpen={
                              this.state.isEmployeesDialogOpen
                           }
                           toOpenEmployeesDialog={() =>
                              this.openEmployeesDialog()
                           }
                           toCloseEmployeesDialog={() =>
                              this.closeEmployeesDialog()
                           }
                           name={name}
                           email={email}
                           user={user}
                           selectedUser={user}
                           type={type}
                           selectedType={type}
                           project={project}
                           selectedProject={project}
                           team={team}
                           selectedTeam={team}
                           onChange={this.onChange}
                           handleSubmit={this.handleSubmit}
                           handleUpdate={this.handleUpdate}
                           onClear={() => this.clearForm()}
                           onAlertClose={() => this.closeAlert()}
                           onDeleteConfirm={() =>
                              this.deleteEmployee(selected._id)
                           }
                           onDeleteCancel={() => this.closeDeleteAlert()}
                           beforeDeleteInfo={`Employee: ${selected.name}`}
                           portalID='EmployeePanel'
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
