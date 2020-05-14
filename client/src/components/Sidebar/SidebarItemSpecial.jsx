import React, { Component } from 'react';

import { Button, Tooltip, Position } from '@blueprintjs/core';

export default class SidebarItem extends Component {
   state = {
      selected: this.props.selected,
      link: this.props.link
   };

   render() {
      const { intent, icon, onClick, tooltip } = this.props;

      return (
         <div>
            <Tooltip content={tooltip} position={Position.RIGHT} fill>
               <Button
                  minimal
                  large
                  icon={icon}
                  fill={true}
                  intent={intent}
                  onClick={onClick}
               />
            </Tooltip>
         </div>
      );
   }
}
