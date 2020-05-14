import React, { Component } from 'react';
import {
   Button,
   FormGroup,
   InputGroup,
   ButtonGroup,
   Switch
} from '@blueprintjs/core';
import UserTypeOptions from '../../components/Selects/UserTypeOptions';

export default class UserForm extends Component {
   render() {
      return (
         <div>
            <FormGroup
               label='Username'
               labelFor='username'
               labelInfo='(required)'
            >
               <InputGroup
                  id='username'
                  leftIcon='user'
                  onChange={this.props.onChange}
                  placeholder='Username...'
                  type='text'
                  value={this.props.username}
                  fill
               />
            </FormGroup>
            <FormGroup label='Email' labelFor='email' labelInfo='(required)'>
               <InputGroup
                  id='email'
                  leftIcon='envelope'
                  onChange={this.props.onChange}
                  placeholder='Email...'
                  type='email'
                  value={this.props.email}
                  fill
               />
            </FormGroup>
            <FormGroup
               label='Password'
               labelFor='password'
               labelInfo='(required)'
            >
               <InputGroup
                  id='password'
                  leftIcon='key'
                  onChange={this.props.onChange}
                  placeholder='Username...'
                  type='password'
                  value={this.props.password}
                  fill
               />
            </FormGroup>

            <FormGroup
               label='User Type'
               labelFor='usertype'
               labelInfo='(required)'
            >
               <UserTypeOptions
                  id='usertype'
                  onChange={this.props.onChange}
                  value={this.props.usertype}
                  selected={this.props.usertype}
                  placeholder='Select user type'
                  fill
               />
            </FormGroup>
            <div className='text-right'>
               <FormGroup label='Active' labelFor='active'>
                  <Switch
                     id='active'
                     onChange={this.props.onChange}
                     value={this.props.active}
                     checked={this.props.active}
                     defaultChecked={true}
                     fill
                  />
               </FormGroup>
            </div>
            <div className='text-right'>
               <ButtonGroup>
                  <Button onClick={this.props.onClear}>
                     {this.props.clearButtonCaption}
                  </Button>
                  <Button onClick={this.props.onClick}>
                     {this.props.buttonCaption}
                  </Button>
               </ButtonGroup>
            </div>
         </div>
      );
   }
}
UserForm.defaultProps = {
   clearButtonCaption: 'Clear',
   buttonCaption: 'Add'
};
