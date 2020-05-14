import React, { Component } from 'react';

import { Button, Tooltip, Position } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

export default class SidebarItem extends Component {
   state = {
      selected: this.props.selected,
      link: this.props.link
   };

   render() {
      const { to, selected, icon, onClick, tooltip } = this.props;
      return (
         <div className=''>
            <Tooltip content={tooltip} position={Position.RIGHT} fill>
               <Link to={to}>
                  <Button
                     minimal
                     large
                     icon={icon}
                     fill={true}
                     active={selected ? true : false}
                     onClick={onClick}
                     className={selected ? 'sidebar-item-selected' : ''}
                  />
               </Link>
            </Tooltip>
         </div>
      );
   }
}
