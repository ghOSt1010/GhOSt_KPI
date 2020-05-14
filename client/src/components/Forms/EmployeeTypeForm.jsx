import React, { Component } from 'react';
import { Form } from 'reactstrap';
import {
   Button,
   ButtonGroup,
   FormGroup,
   InputGroup,
   HTMLTable
} from '@blueprintjs/core';

export default class TypeForm extends Component {
   render() {
      const { onChange, onSubmit, buttonCaption, onClear, type } = this.props;

      return (
         <div>
            <Form className='mb-2' ref='createTypeForm'>
               <HTMLTable condensed>
                  <tr>
                     <td>
                        <FormGroup
                           label='Type Name'
                           labelFor='type'
                           labelInfo='(required)'
                        />
                     </td>
                     <td colSpan='3'>
                        <InputGroup
                           id='type'
                           onChange={onChange}
                           placeholder='Type...'
                           type='text'
                           value={type}
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
TypeForm.defaultProps = {
   addButtonCaption: 'Add'
};
