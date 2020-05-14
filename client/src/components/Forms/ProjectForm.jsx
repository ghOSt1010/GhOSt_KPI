import React, { Component } from 'react';
import { Form } from 'reactstrap';
import {
   Button,
   ButtonGroup,
   FormGroup,
   InputGroup,
   HTMLTable
} from '@blueprintjs/core';
import EmployeesOptions from '../Selects/EmployeesOptions';

export default class ProjectForm extends Component {
   render() {
      const {
         onChange,
         onSubmit,
         buttonCaption,
         onClear,
         name,
         manager,
         selectedManager
      } = this.props;

      return (
         <div>
            <Form className='mb-2' ref='createProjectForm'>
               <HTMLTable condensed>
                  <tr>
                     <td>
                        <FormGroup
                           label='Project Name'
                           labelFor='name'
                           labelInfo='(required)'
                        />
                     </td>
                     <td colSpan='3'>
                        <InputGroup
                           id='name'
                           onChange={onChange}
                           placeholder='Project Name...'
                           type='text'
                           value={name}
                           fill
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <FormGroup
                           label='Manager'
                           labelFor='manager'
                           labelInfo='(required)'
                        />
                     </td>
                     <td colSpan='3'>
                        <EmployeesOptions
                           id='manager'
                           onChange={onChange}
                           placeholder='Project Manager...'
                           value={manager}
                           fill
                           selected={selectedManager}
                        />
                     </td>
                  </tr>
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
ProjectForm.defaultProps = {
   addButtonCaption: 'Add'
};
