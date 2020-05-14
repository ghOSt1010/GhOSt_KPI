import React, { Component } from 'react';
import { HTMLSelect, Spinner, Button, Alignment } from '@blueprintjs/core';
import Client from '../../Modules/Client/Client';

export default class KPIsOptions extends Component {
   state = {
      options: [],
      isLoading: true,
      option: '',
   };
   componentDidMount() {
      this.getOptions();
   }
   async getOptions() {
      try {
         this.setLoading(true);
         var result = await Client.Services.KPIsService.getKPIs();
         console.log(result.data);
         this.setState({
            options: result.data,
         });
      } catch (err) {
         this.setState({ options: new Array('N/A'), option: 'N/A' });
      } finally {
         this.setLoading(false);
      }
   }
   setLoading(loading) {
      this.setState({ isLoading: loading });
   }
   renderOptions() {
      if (this.state.options) {
         return this.state.options.map((option, key) => {
            return (
               <option key={key} value={option._id}>
                  {option.project.name + ' @ ' + option.name}
               </option>
            );
         });
      }
   }
   render() {
      const { isLoading } = this.state;

      if (isLoading) {
         return (
            <Button
               icon={<Spinner size={20} />}
               disabled={isLoading}
               alignText={Alignment.LEFT}
               fill
            >
               KPIs...
            </Button>
         );
      }
      return (
         <HTMLSelect
            id={this.props.id}
            ref={this.props.ref}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
            fill={this.props.fill}
            value={this.props.selected}
            iconProps={this.props.iconProps}
            large={this.props.large}
            minimal={this.props.minimal}
         >
            <option
               selected={this.props.placeholder ? true : false}
               hidden
               disabled
            >
               {this.props.placeholder}
            </option>
            {this.renderOptions()}
         </HTMLSelect>
      );
   }
}
