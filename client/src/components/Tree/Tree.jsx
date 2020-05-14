import React, { Component } from 'react';
import { Tree } from '@blueprintjs/core';

export default class Tree_ extends Component {
   state = {
      nodes: this.props.nodes,
      selectedNode: {},
   };

   setSelectedNode(node) {
      this.setState({ selectedNode: node });
      return this.props.getSelectedNode(node);
   }
   handleNodeClick = (nodeData, _nodePath, e) => {
      const originallySelected = nodeData.isSelected;
      if (!e.shiftKey) {
         this.forEachNode(this.state.nodes, (n) => (n.isSelected = false));
      }
      nodeData.isSelected =
         originallySelected == null ? true : !originallySelected;
      this.setState(this.state);
      this.setSelectedNode(nodeData);
   };

   handleNodeCollapse = (nodeData) => {
      nodeData.isExpanded = false;
      this.setState(this.state);
   };

   handleNodeExpand = (nodeData) => {
      nodeData.isExpanded = true;
      this.setState(this.state);
   };

   forEachNode(nodes, callback) {
      if (nodes == null) {
         return;
      }

      for (const node of nodes) {
         callback(node);
         this.forEachNode(node.childNodes, callback);
      }
   }
   render() {
      return (
         <Tree
            contents={this.props.nodes}
            onNodeClick={this.handleNodeClick}
            onNodeCollapse={this.handleNodeCollapse}
            onNodeExpand={this.handleNodeExpand}
         />
      );
   }
}
