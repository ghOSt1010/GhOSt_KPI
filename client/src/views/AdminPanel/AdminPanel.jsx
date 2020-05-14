import React, { Component } from 'react';
import { Tabs, Tab, H2, Card } from '@blueprintjs/core';
import UsersTable from '../../components/Tables/UsersTable';
import UserDialog from '../../components/Dialogs/UserDialog';
import Client from '../../Modules/Client/Client';
import TableControllers from '../../components/Tables/TableControllers';
import BeforeDeleteAlert from '../../components/Alerts/BeforeDeleteAlert';

export default class AdminPanel extends Component {
   state = {
      activeTabID: 'Users',
      selectedTabId: 'Users',
      isLoading: true,
      users: [],
      openAlert: true,
      errorMessage: '',
      isUserDialogOpen: false,
      username: '',
      email: '',
      password: '',
      usertype: 'standard',
      active: false,
      selected: {},
      isUserEditDialogOpen: false,
      isDeleteAlertOpen: false,
      canEdit: !false,
      canDelete: !false
   };

   getSelected = (user, isSelected) => {
      this.setState({
         selected: user,
         canEdit: isSelected,
         canDelete: isSelected
      });
   };

   componentDidMount() {
      this.getUsersData();
   }

   async getUsersData() {
      this.setLoading(true);
      var result;
      try {
         //this.resetErrorMsg();
         result = await Client.Services.UsersService.getUsers();
         this.setState({
            users: result.data
         });
      } catch (err) {
         alert(err);
         this.setState({ errorMsg: err.response });
         Client.Notifications.alert('Error while loading users list');
      } finally {
         this.setLoading(false);
      }
   }

   async deleteUser(id) {
      var result;
      try {
         this.resetErrorMsg();
         result = await Client.Services.UsersService.deleteUser(id);
         if (result.status === 200) {
            Client.Notifications.success('User removed successfully');
         }
      } catch (err) {
         this.setState({ errorMsg: err.response.status });
         Client.Notifications.alert('Error, cannot delete user');
      } finally {
         this.getUsersData();
         this.closeDeleteAlert();
      }
   }

   handleSubmit = async e => {
      e.preventDefault();
      const { email, username, usertype, password, active } = this.state;
      var errorMsg = 'Unknown Error';
      let usr = Client.Services.UsersService.createUserDTO(
         username,
         email,
         password,
         usertype,
         active
      );
      try {
         let result = await Client.Services.UsersService.saveNewUser(usr);
         if (result.status === 200) {
            Client.Notifications.success(`User ${username} successfully saved`);
            this.getUsersData();
         }
      } catch (err) {
         if (err.response.status === 409) {
            errorMsg = `Error: ${err.response.data.message}`;
            Client.Notifications.alert(errorMsg);
         }
         if (err.response.status !== 409) {
            errorMsg = `Error:  while saving: ${username} user`;
            Client.Notifications.error(errorMsg);
         }
         this.openAlert(errorMsg);
      }
   };

   handleUpdate = async e => {
      e.preventDefault();
      const {
         email,
         username,
         usertype,
         password,
         active,
         selected
      } = this.state;
      var errorMsg = 'Unknown Error';
      let usr = Client.Services.UsersService.createUserDTO(
         username,
         email,
         password,
         usertype,
         active
      );
      usr.user._id = selected._id;
      console.log(usr);
      try {
         let result = await Client.Services.UsersService.updateUser(usr);
         if (result.status === 200) {
            Client.Notifications.success(`User ${username} successfully saved`);
            this.getUsersData();
         }
      } catch (err) {
         if (err.response.status === 409) {
            errorMsg = `Error: ${err.response.data.message}`;
            Client.Notifications.alert(errorMsg);
         }
         if (err.response.status !== 409) {
            errorMsg = `Error:  while saving: ${username} user`;
            Client.Notifications.error(errorMsg);
         }
         this.openAlert(errorMsg);
      }
   };

   resetErrorMsg() {
      this.setState({ errorMessage: '' });
   }
   openAlert(msg) {
      this.setState({ isAlertOpen: true, errorMessage: msg });
   }
   closeAlert() {
      this.setState({ isAlertOpen: false, errorMessage: '' });
   }

   onChange = e => {
      const state = this.state;
      if (e.target.id === 'active') {
         let a = state.active;
         this.setState({ active: !a });
         return;
      }
      state[e.target.id] = e.target.value;
      this.setState(state);
   };

   openUserDialog() {
      this.setState({
         isUserDialogOpen: true
      });
   }
   closeUserDialog() {
      this.setState({
         isUserDialogOpen: false
      });
   }

   openUserEditDialog() {
      let selected = this.state.selected;

      this.setState({
         isUserEditDialogOpen: true,
         username: selected.username,
         email: selected.email,
         password: '',
         usertype: selected.type
      });
   }
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
         email: '',
         username: '',
         usertype: 'standard',
         password: '',
         isAlertOpen: false,
         errorMessage: ''
      });
   }

   renderControlls() {
      if (this.state.selectedTabId === 'Users') {
         return (
            <TableControllers
               onEdit={() => this.openUserEditDialog()}
               canEdit={this.state.canEdit}
               onAdd={() => this.openUserDialog()}
               onDelete={() => this.openDeleteAlert()}
               canDelete={this.state.canDelete}
               onRefresh={() => this.getUsersData()}
            />
         );
      }
   }

   render() {
      const {
         users,
         isLoading,
         email,
         username,
         usertype,
         password,
         active,
         isAlertOpen,
         selected
      } = this.state;

      return (
         <div id='AdminPanel'>
            <div className='mt-2'>
               <H2>Admin Panel</H2>
            </div>
            <Tabs
               onChange={this.handleTabChange}
               selectedTabId={this.state.selectedTabId}
               large
            >
               <Tab
                  id='Users'
                  title='Users'
                  panel={
                     <Card>
                        <UsersTable
                           usersData={users}
                           onRefresh={() => this.getUsersData()}
                           isLoading={isLoading}
                           onSelection={this.getSelected}
                        />
                        <UserDialog
                           isOpen={this.state.isUserEditDialogOpen}
                           toOpen={() => this.openUserEditDialog()}
                           toClose={() => this.closeUserEditDialog()}
                           email={email}
                           username={username}
                           password={password}
                           usertype={usertype}
                           active={active}
                           onChange={this.onChange}
                           handleSubmit={this.handleUpdate}
                           buttonCaption='Update'
                           onClear={() => this.clearForm()}
                           isAlertOpen={isAlertOpen}
                           closeAlert={() => this.closeAlert()}
                        />
                        <UserDialog
                           isOpen={this.state.isUserDialogOpen}
                           toOpen={() => this.openUserDialog()}
                           toClose={() => this.closeUserDialog()}
                           email={email}
                           username={username}
                           password={password}
                           usertype={usertype}
                           active={active}
                           onChange={this.onChange}
                           handleSubmit={this.handleSubmit}
                           buttonCaption='Add'
                           onClear={() => this.clearForm()}
                           isAlertOpen={isAlertOpen}
                           closeAlert={() => this.closeAlert()}
                        />
                        <BeforeDeleteAlert
                           isOpen={this.state.isDeleteAlertOpen}
                           onConfirm={() => this.deleteUser(selected._id)}
                           onCancel={() => this.closeDeleteAlert()}
                           portalID='AdminPanel'
                           info={`User: ${selected.username}`}
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
