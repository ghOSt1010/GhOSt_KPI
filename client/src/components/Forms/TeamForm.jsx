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

export default class TeamForm extends Component {
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
            <Form className='mb-2' ref='createTeamForm'>
               <HTMLTable condensed>
                  <tr>
                     <td>
                        <FormGroup
                           label='Team Name'
                           labelFor='name'
                           labelInfo='(required)'
                        />
                     </td>
                     <td colSpan='3'>
                        <InputGroup
                           id='name'
                           onChange={onChange}
                           placeholder='Team Name...'
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
                           placeholder='Team Manager...'
                           value={manager}
                           selected={selectedManager}
                           fill
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
TeamForm.defaultProps = {
   addButtonCaption: 'Add'
};
