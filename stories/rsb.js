import React, { Component } from 'react';
import styled from 'styled-components';

import SortableTree, { addNodeUnderParent, removeNodeAtPath } from '../src';
import NodeRendererRSB from '../themes/rsb/node-renderer';
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
      treeData: [
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
        { title: 'Root Category 1', type: 'category', },
        { title: 'Root Category 2', type: 'category', },
        { title: 'Root Category 3', type: 'category', },
        { title: 'Root Category 4', type: 'category', },
      ],
      // addAsFirstChild: false,
    };
  }


  render() {
    // const getNodeKey = ({ treeIndex }) => treeIndex;
    // const getRandomName = () =>
    //   firstNames[Math.floor(Math.random() * firstNames.length)];
    return (
      <WrapperStyled>
        <div style={{
          padding: 15,
          fontWeight: 'bold',
          border: 'solid 1px #bbb',
          borderBottom: 'none',
        }}>
          Visible Categories
        </div>
        <div style={{ height: 1000 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            scaffoldBlockPxWidth={20}
            // generateNodeProps={({ node, path }) => ({
            //   buttons: [
            //     <button
            //       type='button'
            //       onClick={() =>
            //         this.setState(state => ({
            //           treeData: addNodeUnderParent({
            //             treeData: state.treeData,
            //             parentKey: path[path.length - 1],
            //             expandParent: true,
            //             getNodeKey,
            //             newNode: {
            //               title: `${getRandomName()} ${
            //                 node.title.split(' ')[0]
            //               }sson`,
            //             },
            //             addAsFirstChild: state.addAsFirstChild,
            //           }).treeData,
            //         }))
            //       }
            //     >
            //       Add Child
            //     </button>,
            //     <button
            //       type='button'
            //       onClick={() =>
            //         this.setState(state => ({
            //           treeData: removeNodeAtPath({
            //             treeData: state.treeData,
            //             path,
            //             getNodeKey,
            //           }),
            //         }))
            //       }
            //     >
            //       Remove
            //     </button>,
            //   ]
            // })}
            theme={{
              nodeContentRenderer: NodeRendererRSB
            }}
          />
        </div>

        {/* <button
          type='button'
          onClick={() =>
            this.setState(state => ({
              treeData: state.treeData.concat({
                title: `${getRandomName()} ${getRandomName()}sson`,
              }),
            }))
          }
        >
          Add more
        </button>
        <br />
        <label htmlFor="addAsFirstChild">
          Add new nodes at start
          <input
            name="addAsFirstChild"
            type="checkbox"
            checked={this.state.addAsFirstChild}
            onChange={() =>
              this.setState(state => ({
                addAsFirstChild: !state.addAsFirstChild,
              }))
            }
          />
        </label> */}
      </WrapperStyled>
    );
  }
}
