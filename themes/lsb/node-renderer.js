import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isDescendant } from '../../src/utils/tree-data-utils';
import classnames from '../../src/utils/classnames';
import '../../src/node-renderer-default.css';

class NodeRendererRSB extends Component {
  renderButtons(){
    const { node } = this.props;

    return (
      <div
        // className="rst__rowToolbar"
        style={{ position: 'fixed', right: 10, color: '#999' }}
      >
        <button
          type="button"
          style={{ border: 'none', background: 'none' }}
          onClick={() => console.log('!clicked visibility', node)}
        >
          <span className="material-icons" style={{ verticalAlign: 'sub', fontSize: 18, color: '#555' }}>visibility_off</span>
        </button>
        <button
          type="button"
          style={{ border: 'none', background: 'none' }}
          onClick={() => console.log('!clicked delete', node)}
        >
          <span className="material-icons" style={{ verticalAlign: 'sub', fontSize: 18, color: node?.children?.length ? '#ccc' : '#555' }}>delete</span>
        </button>
        <button
          type="button"
          style={{ border: 'none', background: 'none' }}
          onClick={() => console.log('!clicked edit', node)}
        >
          <span className="material-icons" style={{ verticalAlign: 'sub', fontSize: 18, color: '#555' }}>edit</span>
        </button>
      </div>
    );
  }

  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      subtitle,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      buttons,
      className,
      style,
      didDrop,
      treeId,
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      rowDirection,
      ...otherProps
    } = this.props;
    const nodeTitle = title || node.title;
    // const nodeSubtitle = subtitle || node.subtitle;
    const rowDirectionClass = rowDirection === 'rtl' ? 'rst__rtl' : null;

    let handle;
    if (canDrag && node.type !== 'folder' ) {
      if (typeof node.children === 'function' && node.expanded) {
        // Show a loading symbol on the handle when the children are expanded
        //  and yet still defined by a function (a callback to fetch the children)
        handle = (
          <div className="rst__loadingHandle">
            <div className="rst__loadingCircle">
              {[...new Array(12)].map((_, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={classnames(
                    'rst__loadingCirclePoint',
                    rowDirectionClass
                  )}
                />
              ))}
            </div>
          </div>
        );
      } else {
        // Show the handle used to initiate a drag-and-drop
        handle = connectDragSource(<span className="material-icons" style={{ marginLeft: 16, verticalAlign: 'sub' }}>{node?.children?.length ? 'list_alt' : 'local_offer'}</span>, {
          dropEffect: 'copy',
        });
      }
    }

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    // let buttonStyle = { left: -0.5 * scaffoldBlockPxWidth };
    // if (rowDirection === 'rtl') {
    //   buttonStyle = { right: -0.5 * scaffoldBlockPxWidth };
    // }

    return (
      <div
        style={{
          height: '100%',
          // border: 'solid 1px red'
        }}
        {...otherProps}
      >

        {toggleChildrenVisibility &&
          node.children &&
          (node.children.length > 0 || typeof node.children === 'function') && (
            <div>
              {/* Expand/Collapse button */}
              {/* <button
                type="button"
                aria-label={node.expanded ? 'Collapse' : 'Expand'}
                className={classnames(
                  node.expanded ? 'rst__collapseButton' : 'rst__expandButton',
                  rowDirectionClass
                )}
                style={buttonStyle}
                onClick={() =>
                  toggleChildrenVisibility({
                    node,
                    path,
                    treeIndex,
                  })
                }
              /> */}

              {node.expanded && !isDragging && (
                <div
                  style={{
                    width: scaffoldBlockPxWidth,
                    // border: 'solid 1px green'
                  }}
                  className={classnames('rst__lineChildren', rowDirectionClass)}
                />
              )}
            </div>
          )}

        <div
          className={classnames('rst__rowWrapper', rowDirectionClass)}
          // style={{ padding: 0, border: 'none' }}
        >
          {/* Set the row preview to be used during drag and drop */}
          {connectDragPreview(
            <div
              className={classnames(
                'rst__row',
                isLandingPadActive && 'rst__rowLandingPad',
                isLandingPadActive && !canDrop && 'rst__rowCancelPad',
                isSearchMatch && 'rst__rowSearchMatch',
                isSearchFocus && 'rst__rowSearchFocus',
                rowDirectionClass,
                className
              )}
              style={{
                opacity: isDraggedDescendant ? 0.5 : 1,
                ...style,
              }}
            >
              {/* DRAGGABLE HANDLE */}
              {handle}

              <div
                className={classnames(
                  'rst__rowContents',
                  !canDrag && 'rst__rowContentsDragDisabled',
                  rowDirectionClass
                )}
                style={{ border: 'none', borderBottom: 'none', boxShadow: 'none' }}
              >
                <div className={classnames('rst__rowLabel', rowDirectionClass)}>
                  <span
                    className={classnames(
                      'rst__rowTitle',
                      node.subtitle && 'rst__rowTitleWithSubtitle'
                    )}
                  >
                    {/* FOLDER ICON */}
                    {node.type === 'folder' ? (
                      <button
                        type="button"
                        aria-label={node.expanded ? 'Collapse' : 'Expand'}
                        // className={classnames(
                        //   node.expanded ? 'rst__collapseButton' : 'rst__expandButton',
                        //   rowDirectionClass
                        // )}
                        style={{ border: 'none', background: 'none' }}
                        onClick={() =>
                          toggleChildrenVisibility({
                            node,
                            path,
                            treeIndex,
                          })
                        }
                      >
                        <span className="material-icons" style={{ verticalAlign: 'sub' }}>{node.expanded ? '' : 'folder' }</span>
                      </button>) : null
                      // (
                      //   <span className="spacer"> &nbsp; </span>
                      // )
                      }
                    {/* TITLE */}
                    {typeof nodeTitle === 'function'
                      ? nodeTitle({
                          node,
                          path,
                          treeIndex,
                        })
                      : nodeTitle}
                  </span>
                </div>
                {this.renderButtons()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

NodeRendererRSB.defaultProps = {
  isSearchMatch: false,
  isSearchFocus: false,
  canDrag: false,
  toggleChildrenVisibility: null,
  buttons: [],
  className: '',
  style: {},
  parentNode: null,
  draggedNode: null,
  canDrop: false,
  title: null,
  subtitle: null,
  rowDirection: 'ltr',
};

NodeRendererRSB.propTypes = {
  node: PropTypes.shape({}).isRequired,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,
  isSearchMatch: PropTypes.bool,
  isSearchFocus: PropTypes.bool,
  canDrag: PropTypes.bool,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  toggleChildrenVisibility: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  style: PropTypes.shape({}),

  // Drag and drop API functions
  // Drag source
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  parentNode: PropTypes.shape({}), // Needed for dndManager
  isDragging: PropTypes.bool.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  // Drop target
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,

  // rtl support
  rowDirection: PropTypes.string,
};

export default NodeRendererRSB;
