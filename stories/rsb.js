import React, { Component } from 'react';
import styled from 'styled-components';

import SortableTree, { addNodeUnderParent, removeNodeAtPath } from '../src';
import NodeRendererLSB from '../themes/rsb/node-renderer';
// In your own app, you would need to use import styles once in the app
// import 'react-sortable-tree/styles.css';

const WrapperStyled = styled.div`
  // Color lines between nodes
  .rst__lineHalfHorizontalRight::before,
  .rst__lineFullVertical::after,
  .rst__lineHalfVerticalTop::after,
  .rst__lineHalfVerticalBottom::after {
    background-color: #bbb;
  }
  // Color lines below nodes
  .rst__lineChildren::after {
    background-color: #bbb;
  }

  // Hide lines for the 1st level of nodes
  .rst__node > .rst__lineBlock:first-child {
    visibility: hidden;
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: 'Category 1.1' },
        {
          title: 'Category 1.2',
          expanded: true,
          children: [
            {
              title: 'Category 1.2.1',
              expanded: true,
              children: [
                { title: 'Category 1.2.1.1' },
                { title: 'Category 1.2.1.2' },
                { title: 'Category 1.2.1.3' },
                { title: 'Category 1.2.1.4' },
                { title: 'Category 1.2.1.5' },
              ]
            },
            { title: 'Category 1.2.2' },
          ]
        },
        { title: 'Category 1.3' },
        { title: 'Category 2.1' },
        { title: 'Category 2.2' },
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
          {/* <span
            className="material-icons"
            style={{ verticalAlign: 'sub', marginRight: 5 }}
          >folder_copy</span> */}
          Folder 1
        </div>
        <div style={{ height: 1000 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            // scaffoldBlockPxWidth={20}
            theme={{
              nodeContentRenderer: NodeRendererLSB
            }}
          />
        </div>
      </WrapperStyled>
    );
  }
}
