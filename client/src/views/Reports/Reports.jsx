import React, { Component } from 'react';
import {
   Tabs,
   Tab,
   H2,
   Alert,
   Portal,
   H5,
   Classes,
   Card
} from '@blueprintjs/core';
import ReportsTable from '../../components/Tables/ReportsTable';
import ReportDialog from '../../components/Dialogs/ReportDialog';
import Client from '../../Modules/Client/Client';
import TableControllers from '../../components/Tables/TableControllers';

export default class Reports extends Component {
   state = {
      activeTabID: 'Reports',
      selectedTabId: 'Reports',
      isLoading: true,
      data: [],
      openAlert: true,
      errorMessage: '',
      isEmployeesDialogOpen: false,
      kpi: '',
      reportedBy: '',
      result: 0,
      completed: '',
      status: '',
      reportedAt: new Date(),
      selected: {},
      emp: {},
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
      this.getData();
      this.setUserId();
   }

   async getData() {
      this.setLoading(true);
      var result;
      try {
         //this.resetErrorMsg();
         result = await Client.Services.ReportingService.getReports();
         this.setState({
            data: result.data
         });
      } catch (err) {
         alert(err);
         this.setState({ errorMsg: err.response });
         Client.Notifications.alert('Error while loading reports');
      } finally {
         this.setLoading(false);
      }
   }

   async setUserId() {
      this.setLoading(true);
      var result;
      try {
         result = await Client.Services.EmployeesService.getEmployeeByUserID(
            Client.User.getUserId()
         );
         this.setState({
            emp: result.data,
            reportedBy: result.data._id
         });
      } catch (err) {
         alert(err);
         this.setState({ errorMsg: err.response });
         Client.Notifications.alert('Error while loading Employee info');
      } finally {
         this.setLoading(false);
      }
   }

   async deleteReportByID(id) {
      var result;
      try {
         this.resetErrorMsg();
         result = await Client.Services.ReportingService.deleteReportByID(id);
         if (result.status === 200) {
            Client.Notifications.success('Report removed successfully');
         }
      } catch (err) {
         this.setState({ errorMsg: err.response.status });
         Client.Notifications.alert('Error, cannot delete Report');
      } finally {
         this.getData();
         this.closeDeleteAlert();
      }
   }

   handleSubmit = async e => {
      e.preventDefault();
      const { kpi, emp, result, completed, status, reportedAt } = this.state;
      var errorMsg = 'Unknown Error';
      let report = await Client.Services.ReportingService.createReportDTO(
         kpi,
         emp._id,
         result,
         completed,
         status,
         reportedAt
      );
      try {
         let result = await Client.Services.ReportingService.saveReport(report);
         if (result.status === 200) {
            Client.Notifications.success(`Report successfully saved`);
            this.getData();
         }
      } catch (err) {
         if (err.response.status === 409) {
            errorMsg = `Error: ${err.response.data.message}`;
            Client.Notifications.alert(errorMsg);
         }
         if (err.response.status !== 409) {
            errorMsg = `Error:  while saving the report`;
            Client.Notifications.error(errorMsg);
         }
         this.openAlert(errorMsg);
      }
   };
   handleUpdate = async e => {
      e.preventDefault();
      const { emp, kpi, completed, status, reportedAt } = this.state;

      var errorMsg = 'Unknown Error';
      try {
         let report = await Client.Services.ReportingService.createReportDTO(
            kpi,
            emp._id,
            completed,
            status,
            reportedAt
         );
         let result = await Client.Services.ReportingService.updateReport(
            report
         );
         if (result.status === 200) {
            Client.Notifications.success(`Report updated successfully`);
            this.getData();
         }
      } catch (err) {
         if (err.response.status === 409) {
            errorMsg = `Error: ${err.response.data.message}`;
            Client.Notifications.alert(errorMsg);
         }
         if (err.response.status !== 409) {
            errorMsg = `Error:  while updating the report`;
            Client.Notifications.error(errorMsg);
         }
         this.openAlert(errorMsg);
      }
   };

   handleResultValueChange = number => {
      this.setState({ result: number });
   };

   handleValueChange = number => {
      this.setState({ result: number });
   };

   handleDateChange = newFromDate => {
      this.setState({ time_from: newFromDate });
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

   openDialog() {
      this.setState({
         isEmployeesDialogOpen: true
      });
   }
   closeEmployeesDialog() {
      this.setState({
         isEmployeesDialogOpen: false
      });
   }

   openEditDialog = async e => {
      e.preventDefault();
      const { selected } = this.state;
      try {
         let result = await Client.Services.ReportingService.getReportById(
            selected._id
         );
         if (result.status === 200) {
            let report = result.data;
            this.setState({
               isUserEditDialogOpen: true,
               kpi: report.kpi._id,
               reportedBy: report.reportedBy.name,
               result: report.result,
               completed: report.completed,
               status: report.status,
               reportedAt: report.reportedAt
            });
         }
      } catch (err) {
         console.log(err);
         this.setState({
            isUserEditDialogOpen: true,
            kpi: selected.kpi._id,
            reportedBy: selected.reportedBy.name,
            result: selected.result,
            completed: selected.completed,
            status: selected.status,
            reportedAt: selected.reportedAt
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
         kpi: '',
         reportedBy: '',
         result: '',
         completed: '',
         status: '',
         reportedAt: '',
         isAlertOpen: false,
         errorMessage: ''
      });
   }

   renderControlls() {
      if (this.state.selectedTabId === 'Reports') {
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
         emp,
         data,
         isLoading,
         kpi,
         result,
         completed,
         status,
         reportedAt,
         isAlertOpen,
         selected
      } = this.state;

      return (
         <div id='AdminPanel'>
            <div className='mt-2'>
               <H2>Reports Panel</H2>
            </div>
            <Tabs
               onChange={this.handleTabChange}
               selectedTabId={this.state.selectedTabId}
               large
            >
               <Tab
                  id='Reports'
                  title='Reports'
                  panel={
                     <Card>
                        <ReportsTable
                           data={data}
                           onRefresh={() => this.getData()}
                           isLoading={isLoading}
                           onSelection={this.getSelected}
                        />
                     </Card>
                  }
               />
               <Tabs.Expander />
               {this.renderControlls()}
            </Tabs>
            <ReportDialog
               isOpen={this.state.isUserEditDialogOpen}
               toOpen={() => this.openEditDialog()}
               toClose={() => this.closeUserEditDialog()}
               kpi={kpi}
               selectedKPI={kpi}
               reportedBy={emp.name}
               result={result}
               completed={completed}
               status={status}
               reportedAt={reportedAt}
               onChange={this.onChange}
               handleDateFromChange={this.handleDateChange}
               onResultValueChange={this.handleValueChange}
               handleSubmit={this.handleUpdate}
               buttonCaption='Update'
               onClear={() => this.clearForm()}
               isAlertOpen={isAlertOpen}
               closeAlert={() => this.closeAlert()}
            />

            <ReportDialog
               isOpen={this.state.isEmployeesDialogOpen}
               toOpen={() => this.openDialog()}
               toClose={() => this.closeEmployeesDialog()}
               kpi={kpi}
               reportedBy={emp.name}
               result={result}
               completed={completed}
               status={status}
               reportedAt={reportedAt}
               onChange={this.onChange}
               handleDateFromChange={this.handleDateChange}
               onResultValueChange={this.handleValueChange}
               handleSubmit={this.handleSubmit}
               buttonCaption='Add'
               onClear={() => this.clearForm()}
               isAlertOpen={isAlertOpen}
               closeAlert={() => this.closeAlert()}
            />
            <Alert
               isOpen={this.state.isDeleteAlertOpen}
               confirmButtonText='Delete'
               onConfirm={() => this.deleteReportByID(selected._id)}
               cancelButtonText='Cancel'
               onCancel={() => this.closeDeleteAlert()}
               intent='danger'
               icon='issue'
               ussePortal={
                  <Portal container={document.getElementById('ReportsPanel')} />
               }
            >
               <H5>Are you sure that you want to delete this user?</H5>
               <strong>{`Report`}</strong>
               <p></p>
               <strong
                  className={Classes.TEXT_MUTED}
               >{`Will be permanentyly deleted...`}</strong>
            </Alert>
         </div>
      );
   }
}
