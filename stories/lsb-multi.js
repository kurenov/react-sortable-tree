import React, { Component } from 'react';
import styled from 'styled-components';

import SortableTree, { addNodeUnderParent, removeNodeAtPath } from '../src';
import NodeRendererRSB from '../themes/lsb/node-renderer';
// In your own app, you would need to use import styles once in the app
// import 'react-sortable-tree/styles.css';

const WrapperStyled = styled.div`
  // Hide lines between nodes
  .rst__lineBlock,
  .rst__absoluteLineBlock {
    display: none;
  }
  // Hide lines from child nodes
  .rst__lineChildren {
    display: none;
  }

  // Full width borders
  .rst__node {
    border: solid #bbb 1px;
    border-bottom: none;
  }
  .rst__node:last-child {
    border-bottom: solid #bbb 1px;
  }

  // .rst__tree > div > div > .rst__node {
  //   left: 15px;
  // }
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeDataFolders: [
        {
          title: 'Folder 1',
          expanded: true,
          children: [
            { title: 'Category 1.1' },
            {
              title: 'Category 1.2',
              expanded: true,
              children: [
                { title: 'Category 1.2.1' },
                { title: 'Category 1.2.2' },
              ]
            },
            { title: 'Category 1.3' },
          ],
          type: 'folder',
        },
        {
          title: 'Folder 2',
          type: 'folder',
          children: [
            { title: 'Category 2.1' },
            { title: 'Category 2.2' },
          ],
        },
        { title: 'Folder 3', type: 'folder', },
      ],
      treeDataCategories: [
        { title: 'Root Category 1', type: 'category', },
        { title: 'Root Category 2', type: 'category', },
        { title: 'Root Category 3', type: 'category', },
        { title: 'Root Category 4', type: 'category', },
        { title: 'Root Category 5', type: 'category', },
        { title: 'Root Category 6', type: 'category', },
        { title: 'Root Category 7', type: 'category', },
        { title: 'Root Category 8', type: 'category', },
        { title: 'Root Category 9', type: 'category', },
        { title: 'Root Category 10', type: 'category', },
        { title: 'Root Category 11', type: 'category', },
        { title: 'Root Category 12', type: 'category', },
        { title: 'Root Category 13', type: 'category', },
        { title: 'Root Category 14', type: 'category', },
        { title: 'Root Category 15', type: 'category', },
        { title: 'Root Category 16', type: 'category', },
        { title: 'Root Category 17', type: 'category', },
        { title: 'Root Category 18', type: 'category', },
        { title: 'Root Category 19', type: 'category', },
        { title: 'Root Category 20', type: 'category', },
      ],
      // addAsFirstChild: false,
    };
  }


  render() {
    return (
      <WrapperStyled>
        <div style={{
          padding: 15,
          fontWeight: 'bold',
          border: 'solid 1px #bbb',
          borderBottom: 'none',
        }}>
          <span
            className="material-icons"
            style={{ verticalAlign: 'sub', marginRight: 5 }}
          >folder_copy</span>
          Visible Categories
        </div>
        <div style={{ height: 500 }}>
          <SortableTree
            maxDepth={5}
            treeData={this.state.treeDataFolders}
            onChange={treeData => {
              const updatedState = {
                treeDataFolders: treeData
              };
              // Move any root categories to the categories tree
              const rootCategories = treeData.filter(node => node.type !== 'folder');
              if (rootCategories.length) {
                updatedState.treeDataCategories = rootCategories.concat(updatedState.treeDataCategories);
                updatedState.treeDataFolders = treeData.filter(node => node.type === 'folder');
              }
              this.setState(updatedState);
            }}
            scaffoldBlockPxWidth={20}
            theme={{
              nodeContentRenderer: NodeRendererRSB
            }}
            dndType={'my-dnd-type'}
          />
        </div>
        <div style={{ height: 500 }}>
          <SortableTree
            maxDepth={4}
            treeData={this.state.treeDataCategories}
            onChange={treeData => {
              this.setState({
                treeDataCategories: treeData
              });
            }}
            scaffoldBlockPxWidth={20}
            theme={{
              nodeContentRenderer: NodeRendererRSB
            }}
            dndType={'my-dnd-type'}
          />
        </div>
      </WrapperStyled>
    );
  }
}
