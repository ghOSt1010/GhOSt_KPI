import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, CardBody, Form } from 'reactstrap';
import { Card, Button, InputGroup, Classes } from '@blueprintjs/core';

import Client from '../../Modules/Client/Client';
import MainContainer from '../../components/MainContainer/MainContainer';
import UIManager from '../../Modules/UIManager/UIManager';

import './Login.css';

const AuthService = Client.Services.AuthService;

export default class Login extends Component {
   state = {
      theme: UIManager.getTheme(),
      alertVisible: true,
      isLoading: false,
      authenticated: false,
      message: '',
      email: '',
      password: ''
   };

   componentDidMount() {
      this.checkLogin();
   }
   checkLogin() {
      if (Client.isAuthenticated()) {
         this.setState({
            authenticated: true
         });
      }
   }

   onSubmit = async e => {
      e.preventDefault();
      this.setLoading(true);
      const { email, password } = this.state;

      try {
         var result = await AuthService.login(email, password); //Client.login(email, password);
         console.log(result);
         if (result) {
            this.setState({
               message: 'ok',
               authenticated: true
            });
            if (result.status === 401) {
               this.setState({
                  message: 'User is not active'
               });
            }
         }
      } catch (err) {
         this.setState({
            message: 'Login failed'
         });
      } finally {
         this.setLoading(false);
      }
   };

   setLoading(loading) {
      this.setState({ loading: loading });
   }

   onChange = e => {
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState(state);
      this.resetMessage();
   };

   resetMessage() {
      this.setState({ message: '' });
   }

   render() {
      const { authenticated, email, password, message, theme } = this.state;

      if (authenticated) {
         return <Redirect to='/Home' />;
      }

      return (
         <MainContainer noAppBar displayBgImage={true}>
            <Row>
               <Col
                  xl={{ size: 4, offset: 4 }}
                  lg={{ size: 4, offset: 4 }}
                  md={{ size: 4, offset: 4 }}
                  sm='12'
                  xs='12'
                  className='mt-4'
               >
                  <div
                     className={`${theme} bg-login-form login-card ${
                        message ? 'shake' : ''
                     }`}
                  >
                     <Card color={theme} className='bg-transparent mt-5'>
                        <CardBody className=''>
                           <span className='fas fa-dice-d20 float-right' />
                           <h3 className='text-center'>Sign in</h3>
                           <hr />
                           <Form>
                              <div className='mb-2'>
                                 <InputGroup
                                    leftIcon='user'
                                    className='login-input'
                                    intent={message ? 'danger' : ''}
                                    onChange={e => {
                                       this.setState({
                                          email: e.target.value
                                       });
                                       this.resetMessage();
                                    }}
                                    placeholder='Username...'
                                    type='email'
                                    value={email}
                                 />
                              </div>
                              <div className='mb-2'>
                                 <InputGroup
                                    leftIcon='lock'
                                    className='login-input'
                                    intent={message ? 'danger' : ''}
                                    onChange={e => {
                                       this.setState({
                                          password: e.target.value
                                       });
                                       this.resetMessage();
                                    }}
                                    placeholder='Password...'
                                    type='password'
                                    value={password}
                                 />
                              </div>
                              <div className={Classes.ALIGN_RIGHT}>
                                 <Button
                                    type='submit'
                                    size='sm'
                                    fill
                                    minimal
                                    text='Login'
                                    alignText='right'
                                    rightIcon='arrow-right'
                                    onClick={this.onSubmit}
                                 />
                              </div>
                           </Form>
                        </CardBody>
                     </Card>
                  </div>
               </Col>
            </Row>
         </MainContainer>
      );
   }
}
