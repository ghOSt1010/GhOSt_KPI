import React, { Component } from 'react';
import {
   Tabs,
   Tab,
   H2,
   Alert,
   Portal,
   H5,
   Classes,
   Card,
} from '@blueprintjs/core';
import ProjectsTable from '../../components/Tables/ProjectsTable';
import ProjectDialog from '../../components/Dialogs/ProjectDialog';
import Client from '../../Modules/Client/Client';
import TableControllers from '../../components/Tables/TableControllers';

export default class Projects extends Component {
   state = {
      activeTabID: 'Projects',
      selectedTabId: 'Projects',
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
      this.getProjectsData();
   }

   async getProjectsData() {
      this.setLoading(true);
      var result;
      try {
         //this.resetErrorMsg();
         result = await Client.Services.ProjectsService.getProjects();
         this.setState({
            data: result.data,
         });
      } catch (err) {
         alert(err);
         this.setState({ errorMsg: err.response });
         Client.Notifications.alert('Error while loading Projects list');
      } finally {
         this.setLoading(false);
      }
   }

   async deleteUser(id) {
      var result;
      try {
         this.resetErrorMsg();
         result = await Client.Services.ProjectsService.deleteProjectByID(id);
         if (result.status === 200) {
            Client.Notifications.success('Project removed successfully');
         }
      } catch (err) {
         this.setState({ errorMsg: err.response.status });
         Client.Notifications.alert('Error, cannot delete Project');
      } finally {
         this.getProjectsData();
         this.closeDeleteAlert();
      }
   }

   handleSubmit = async (e) => {
      e.preventDefault();
      const { name, manager } = this.state;
      var errorMsg = 'Unknown Error';
      let project = await Client.Services.ProjectsService.createProjectDTO(
         name,
         manager
      );
      try {
         let result = await Client.Services.ProjectsService.saveProject(
            project
         );
         if (result.status === 200) {
            Client.Notifications.success(`Project ${name} successfully saved`);
            this.getProjectsData();
         }
      } catch (err) {
         if (err.response.status === 409) {
            errorMsg = `Error: ${err.response.data.message}`;
            Client.Notifications.alert(errorMsg);
         }
         if (err.response.status !== 409) {
            errorMsg = `Error:  while saving: ${name} Project`;
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
         let project = await Client.Services.ProjectsService.createProjectDTO(
            name,
            manager
         );
         project.project._id = selected._id;
         let result = await Client.Services.ProjectsService.updateProject(
            project
         );
         if (result.status === 200) {
            Client.Notifications.success(`Project ${name} successfully saved`);
            this.getProjectsData();
            console.log(result.data.employee);
         }
      } catch (err) {
         if (err.response.status === 409) {
            errorMsg = `Error: ${err.response.data.message}`;
            Client.Notifications.alert(errorMsg);
         }
         if (err.response.status !== 409) {
            errorMsg = `Error:  while saving: ${name} project`;
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
         let result = await Client.Services.ProjectsService.getProjectById(
            selected._id
         );
         if (result.status === 200) {
            let project = result.data;
            this.setState({
               isEditDialogOpen: true,
               name: project.name,
               manager: project.manager._id,
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
      if (this.state.selectedTabId === 'Projects') {
         return (
            <TableControllers
               onEdit={this.openEditDialog}
               canEdit={this.state.canEdit}
               onAdd={() => this.openDialog()}
               onDelete={() => this.openDeleteAlert()}
               canDelete={this.state.canDelete}
               onRefresh={() => this.getProjectsData()}
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
         <div id='ProjectsPanel'>
            <div className='mt-2'>
               <H2>Projects Panel</H2>
            </div>
            <Tabs
               onChange={this.handleTabChange}
               selectedTabId={this.state.selectedTabId}
               large
            >
               <Tab
                  id='Projects'
                  title='Projects'
                  panel={
                     <div className='main-container-tab-content'>
                        <Card elevation='2'>
                           <ProjectsTable
                              data={data}
                              onRefresh={() => this.getProjectsData()}
                              isLoading={isLoading}
                              onSelection={this.getSelected}
                           />
                        </Card>
                     </div>
                  }
               />
               <Tabs.Expander />
               {this.renderControlls()}
            </Tabs>
            <ProjectDialog
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
            <ProjectDialog
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
            <Alert
               isOpen={this.state.isDeleteAlertOpen}
               confirmButtonText='Delete'
               onConfirm={() => this.deleteUser(selected._id)}
               cancelButtonText='Cancel'
               onCancel={() => this.closeDeleteAlert()}
               intent='danger'
               icon='issue'
               ussePortal={
                  <Portal container={document.getElementById('AdminPanel')} />
               }
            >
               <H5>Are you sure that you want to delete this user?</H5>
               <strong>{`User: ${selected.username}`}</strong>
               <p />
               <strong
                  className={Classes.TEXT_MUTED}
               >{`Will be permanentyly deleted...`}</strong>
            </Alert>
         </div>
      );
   }
}
