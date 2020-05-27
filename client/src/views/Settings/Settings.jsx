import React, { Component } from 'react';
import {
   Icon,
   H3,
   ButtonGroup,
   Button,
   Tooltip,
   Position,
   Classes,
   H5,
} from '@blueprintjs/core';
import NavigationCard from '../../components/Card/NavigationCard';
import Tree from '../../components/Tree/Tree';
import ProjectOptions from '../../components/Selects/ProjectOptions';

const INITIAL_STATE = [
   {
      id: 0,
      isFoler: true,
      hasCaret: true,
      icon: 'folder-close',
      label: 'Folder 0',
   },
   {
      id: 1,
      isFoler: true,
      icon: 'folder-close',
      isExpanded: false,
      label: 'some files',
      childNodes: [
         {
            id: 2,
            icon: 'document',
            label: 'Item 0',
            secondaryLabel: (
               <Tooltip content='An eye!'>
                  <Icon icon='eye-open' />
               </Tooltip>
            ),
            nodeData: (
               <div>
                  <H5>Label</H5>
                  <p>{String('some text in the file').repeat(20)}</p>

                  {String('some text in the file').repeat(20)}
               </div>
            ),
         },
         {
            id: 3,
            icon: <Icon icon='tag' className={Classes.TREE_NODE_ICON} />,
            nodeData: 'some other text',
            label:
               'Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.',
         },
         {
            id: 4,
            hasCaret: true,
            isFoler: true,
            icon: 'folder-close',
            label: (
               <Tooltip content='foo' position={Position.RIGHT}>
                  Folder 2
               </Tooltip>
            ),
            childNodes: [
               { id: 5, label: 'No-Icon Item' },
               { id: 6, icon: 'tag', label: 'Item 1' },
               {
                  id: 7,
                  hasCaret: true,
                  isFoler: true,
                  icon: 'folder-close',
                  label: 'Folder 3',
                  childNodes: [
                     { id: 8, icon: 'document', label: 'Item 0' },
                     { id: 9, icon: 'tag', label: 'Item 1' },
                  ],
               },
            ],
         },
      ],
   },
   {
      id: 2,
      isFoler: true,
      hasCaret: true,
      icon: 'folder-close',
      label: 'Super secret files',
      disabled: true,
      selectedNode: '',
   },
];

export default class Settings extends Component {
   state = {
      isAppSettingsOpen: false,
      isProfileSettingsOpen: false,
      isUISettingsOpen: false,
      selectedTabId: 'rx',
      selectedNode: null,
   };

   getSelectedNode = (node) => {
      this.setState({ selectedNode: node });
   };

   setOpenTab(tab) {
      this.setState({ selectedTabId: tab });
   }

   getOpenTabContent() {
      const { selectedTabId } = this.state;

      if (selectedTabId === 'Profile') {
         return (
            <div>
               <H3>Profile to Settings</H3>
               Settings ..
            </div>
         );
      }

      if (selectedTabId === 'Application') {
         return (
            <div>
               <H3>Application to Settings</H3>
               Settings ..
            </div>
         );
      }

      if (selectedTabId === 'UI') {
         return (
            <div>
               <H3>UI Settings</H3>
               Settings ..
            </div>
         );
      }

      return (
         <div>
            <H3>Welcome to Settings</H3>
            Settings ..
         </div>
      );
   }

   getSelectedNodeElement() {
      const { selectedNode } = this.state;

      if (!selectedNode) return '';

      return (
         <div className=''>
            <div className=''>
               <div className='mr-2 float-left'>
                  {selectedNode.icon ? (
                     <Icon icon={selectedNode.icon} />
                  ) : (
                     <Icon icon='document' />
                  )}
               </div>
               <div>{selectedNode.label}</div>
            </div>
            <div className='mt-4'>{selectedNode.nodeData}</div>
         </div>
      );
   }

   render() {
      return (
         <div>
            <NavigationCard
               elevation='2'
               icon='cog'
               header='Settings Panel'
               minHeight={200}
               footer={<div>info-test</div>}
               navigation={
                  <ButtonGroup vertical alignText='left' minimal fill>
                     <Button
                        icon='cog'
                        text='Profile'
                        small
                        onClick={() => this.setOpenTab('Profile')}
                     />
                     <Button
                        icon='cog'
                        text='Application'
                        small
                        onClick={() => this.setOpenTab('Application')}
                     />
                     <Button
                        icon='cog'
                        text='UI'
                        small
                        onClick={() => this.setOpenTab('UI')}
                     />
                  </ButtonGroup>
               }
               content={this.getOpenTabContent()}
            />

            <NavigationCard
               elevation='2'
               minHeight={350}
               header={
                  <div>
                     <Icon
                        icon='projects'
                        className='header-icon mr-2'
                        intent='none'
                     />
                     File Browser
                  </div>
               }
               className='mt-3'
               navigation={
                  <div>
                     <ProjectOptions />
                     <Tree
                        nodes={INITIAL_STATE}
                        getSelectedNode={this.getSelectedNode}
                     />
                  </div>
               }
               content={this.getSelectedNodeElement()}
               footer={
                  <div>
                     <Icon icon='cog' className='mr-2' />
                     some info-test
                     <div className='float-right'>asd</div>
                  </div>
               }
            />
         </div>
      );
   }
}
