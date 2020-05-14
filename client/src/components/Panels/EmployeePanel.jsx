import React, { Component } from 'react';
import EmployeesTable from '../Tables/EmployeesTable';
import EmployeeDialog from '../Dialogs/EmployeeDialog';
import BeforeDeleteAlert from '../Alerts/BeforeDeleteAlert';

export default class EmployeePanel extends Component {
   render() {
      const {
         data,
         onRefresh,
         isLoading,
         isAlertOpen,
         isDeleteAlertOpen,
         getSelected,
         isUserEditDialogOpen,
         toOpenUserEditDialog,
         toCloseUserEditDialog,
         isEmployeesDialogOpen,
         toOpenEmployeesDialog,
         toCloseEmployeesDialog,
         name,
         email,
         user,
         selectedUser,
         type,
         selectedType,
         project,
         selectedProject,
         team,
         selectedTeam,
         onChange,
         handleSubmit,
         handleUpdate,
         onClear,
         onAlertClose,
         onDeleteConfirm,
         onDeleteCancel,
         beforeDeleteInfo,
         portalID
      } = this.props;
      return (
         <div>
            <EmployeesTable
               data={data}
               onRefresh={onRefresh}
               isLoading={isLoading}
               onSelection={getSelected}
            />
            <EmployeeDialog
               isOpen={isUserEditDialogOpen}
               toOpen={toOpenUserEditDialog}
               toClose={toCloseUserEditDialog}
               name={name}
               email={email}
               user={user}
               selectedUser={selectedUser}
               type={type}
               selectedType={selectedType}
               project={project}
               selectedProject={selectedProject}
               team={team}
               selectedTeam={selectedTeam}
               onChange={onChange}
               handleSubmit={handleUpdate}
               buttonCaption='Update'
               onClear={onClear}
               isAlertOpen={isAlertOpen}
               closeAlert={onAlertClose}
            />
            <EmployeeDialog
               isOpen={isEmployeesDialogOpen}
               toOpen={toOpenEmployeesDialog}
               toClose={toCloseEmployeesDialog}
               name={name}
               email={email}
               user={user}
               type={type}
               project={project}
               team={team}
               onChange={onChange}
               handleSubmit={handleSubmit}
               buttonCaption='Add'
               onClear={onClear}
               isAlertOpen={isAlertOpen}
               closeAlert={onAlertClose}
            />
            <BeforeDeleteAlert
               isOpen={isDeleteAlertOpen}
               onConfirm={onDeleteConfirm}
               onCancel={onDeleteCancel}
               portalID={portalID}
               info={beforeDeleteInfo}
            />
         </div>
      );
   }
}
