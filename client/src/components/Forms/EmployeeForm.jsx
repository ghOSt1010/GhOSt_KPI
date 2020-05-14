import React, { Component } from 'react';
import { Form } from 'reactstrap';
import {
   Button,
   ButtonGroup,
   FormGroup,
   InputGroup,
   HTMLTable
} from '@blueprintjs/core';
import UsersOptions from '../Selects/UsersOptions';
import EmployeesTypesOptions from '../Selects/EmployeesTypesOptions';
import ProjectOptions from '../Selects/ProjectOptions';
import TeamOptions from '../Selects/TeamsOptions';

export default class EmployeeForm extends Component {
   render() {
      const {
         onChange,
         onSubmit,
         buttonCaption,
         onClear,
         name,
         email,
         user,
         selectedUser,
         type,
         selectedType,
         project,
         selectedProject,
         team,
         selectedTeam
      } = this.props;

      return (
         <div>
            <Form className='mb-2' ref='createProjectForm'>
               <HTMLTable condensed>
                  <tbody>
                     <tr>
                        <td>
                           <FormGroup
                              label='Name'
                              labelFor='name'
                              labelInfo='(required)'
                           />
                        </td>
                        <td colSpan='3'>
                           <InputGroup
                              id='name'
                              onChange={onChange}
                              placeholder='Name...'
                              type='text'
                              value={name}
                              fill
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <FormGroup
                              label='Email'
                              labelFor='email'
                              labelInfo='(required)'
                           />
                        </td>
                        <td colSpan='3'>
                           <InputGroup
                              id='email'
                              onChange={onChange}
                              placeholder='Email...'
                              type='email'
                              value={email}
                              fill
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <FormGroup label='User' labelFor='user' />
                        </td>
                        <td colSpan='3'>
                           <UsersOptions
                              id='user'
                              ref='user'
                              onChange={onChange}
                              vale={user}
                              selected={selectedUser}
                              fill
                              placeholder='Select User'
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <FormGroup
                              label='Employee Type'
                              labelFor='user'
                              labelInfo='(required)'
                           />
                        </td>
                        <td colSpan='3'>
                           <EmployeesTypesOptions
                              id='type'
                              ref='type'
                              onChange={onChange}
                              vale={type}
                              selected={selectedType}
                              fill
                              placeholder='Select Employee Type'
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <FormGroup
                              label='Project'
                              labelFor='project'
                              labelInfo='(required)'
                           />
                        </td>
                        <td colSpan='3'>
                           <ProjectOptions
                              id='project'
                              onChange={onChange}
                              placeholder='Project...'
                              value={project}
                              selected={selectedProject}
                              fill
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <FormGroup
                              label='Team'
                              labelFor='team'
                              labelInfo='(required)'
                           />
                        </td>
                        <td colSpan='3'>
                           <TeamOptions
                              id='team'
                              ref='team'
                              onChange={onChange}
                              vale={team}
                              selected={selectedTeam}
                              fill
                              placeholder='Select Team'
                           />
                        </td>
                     </tr>
                  </tbody>
               </HTMLTable>

               <div className='text-right'>
                  <ButtonGroup>
                     <Button icon='refresh' onClick={onClear}>
                        Clear
                     </Button>
                     <Button icon='saved' onClick={onSubmit}>
                        {buttonCaption}
                     </Button>
                  </ButtonGroup>
               </div>
            </Form>
         </div>
      );
   }
}
EmployeeForm.defaultProps = {
   addButtonCaption: 'Add'
};
