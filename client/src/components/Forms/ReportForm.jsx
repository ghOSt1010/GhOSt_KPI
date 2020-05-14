import React, { Component } from 'react';
import { Form } from 'reactstrap';
import {
   Button,
   ButtonGroup,
   FormGroup,
   InputGroup,
   HTMLTable,
   NumericInput,
   Icon,
   Spinner
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';

import KPIsOptions from '../Selects/KPIsOptions';

export default class ReportForm extends Component {
   renderRest() {
      if (this.props.target >= this.props.result) {
         return (
            <div>
               <tr>
                  <td>Passed</td>
                  <td>Status</td>
               </tr>
               <tr>
                  <td className='text-center'>
                     <Icon icon='tick' intent='success' />
                  </td>
                  <td className='text-center'>
                     <Spinner value={this.props.result / this.props.target} />
                  </td>
               </tr>
            </div>
         );
      }
   }

   render() {
      const {
         onChange,
         onSubmit,
         buttonCaption,
         onClear,
         kpi,
         reportedBy,
         result,
         reportedAt,
         selectedKPI
      } = this.props;

      return (
         <div>
            <Form className='mb-2' ref='createProjectForm'>
               <HTMLTable condensed>
                  <tr>
                     <td>
                        <FormGroup
                           label='KPI'
                           labelFor='kpi'
                           labelInfo='(required)'
                        />
                     </td>
                     <td colSpan='3'>
                        <KPIsOptions
                           id='kpi'
                           ref='kpi'
                           onChange={onChange}
                           vale={kpi}
                           selected={selectedKPI}
                           fill
                           placeholder='Select KPI...'
                        />
                     </td>
                  </tr>
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
                           id='reportedBy'
                           onChange={onChange}
                           placeholder='Reported By...'
                           type='text'
                           value={reportedBy}
                           disabled
                           fill
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <FormGroup
                           label='Reported At'
                           labelFor='reportedAt'
                           labelInfo='(required)'
                        />
                     </td>
                     <td colSpan='3'>
                        <DateInput
                           formatDate={reportedAt =>
                              reportedAt.toLocaleDateString()
                           }
                           onChange={this.props.handleDateChange}
                           parseDate={reportedAt =>
                              new Date(reportedAt).toLocaleDateString()
                           }
                           placeholder='DD/MM/YYYY'
                           defaultValue={new Date()}
                           value={reportedAt}
                           minDate={new Date()}
                           fill
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <FormGroup
                           label='Result'
                           labelFor='result'
                           labelInfo='(required)'
                        />
                     </td>
                     <td colSpan='3'>
                        <NumericInput
                           id='result'
                           onValueChange={this.props.onResultValueChange}
                           placeholder='Result...'
                           type='number'
                           value={result}
                           fill
                        />
                     </td>
                  </tr>

                  {this.renderRest()}
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
ReportForm.defaultProps = {
   addButtonCaption: 'Add'
};
