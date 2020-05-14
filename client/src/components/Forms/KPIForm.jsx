import React, { Component } from 'react';
import { Form } from 'reactstrap';
import {
   Button,
   ButtonGroup,
   FormGroup,
   InputGroup,
   HTMLTable,
   NumericInput
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';

import ProjectOptions from '../Selects/ProjectOptions';
import EmployeesOptions from '../Selects/EmployeesOptions';

export default class KPIForm extends Component {
   render() {
      const {
         onChange,
         onTargetValueChange,
         handleDateToChange,
         handleDateFromChange,
         onSubmit,
         buttonCaption,
         onClear,
         name, //String
         time_from, //Date
         time_to, //date
         target, // number
         project, //ProjectOPt
         selectedProject,
         manager, //ManagerOPT
         selectedManager
      } = this.props;

      return (
         <div>
            <Form className='mb-2' ref='createProjectForm'>
               <HTMLTable condensed>
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
                           label='Time From'
                           labelFor='fime_from'
                           labelInfo='(required)'
                        />
                     </td>
                     <td colSpan='3'>
                        <DateInput
                           formatDate={time_from =>
                              time_from.toLocaleDateString()
                           }
                           onChange={handleDateFromChange}
                           parseDate={time_from =>
                              new Date(time_from).toLocaleDateString()
                           }
                           placeholder='DD/MM/YYYY'
                           defaultValue={new Date()}
                           value={time_from}
                           fill
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <FormGroup
                           label='Time To'
                           labelFor='fime_to'
                           labelInfo='(required)'
                        />
                     </td>
                     <td colSpan='3'>
                        <DateInput
                           formatDate={time_to => time_to.toLocaleDateString()}
                           onChange={handleDateToChange}
                           parseDate={time_to =>
                              new Date(time_to).toLocaleDateString
                           }
                           placeholder='DD/MM/YYYY'
                           defaultValue={new Date()}
                           value={time_to}
                           minDate={new Date()}
                           fill
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <FormGroup
                           label='Target'
                           labelFor='Target'
                           labelInfo='(required)'
                        />
                     </td>
                     <td colSpan='3'>
                        <NumericInput
                           id='target'
                           onValueChange={onTargetValueChange}
                           placeholder='Target...'
                           type='number'
                           value={target}
                           fill
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
                           label='Manager'
                           labelFor='team'
                           labelInfo='(required)'
                        />
                     </td>
                     <td colSpan='3'>
                        <EmployeesOptions
                           id='manager'
                           ref='manager'
                           onChange={onChange}
                           vale={manager}
                           selected={selectedManager}
                           fill
                           placeholder='Select Manager...'
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
KPIForm.defaultProps = {
   addButtonCaption: 'Add'
};
