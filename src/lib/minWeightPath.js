const Heap = require('heap');
const assert = require('assert');
const _ = require('lodash');

class Node {
  constructor(row, col, prev, pathWeight) {
    this.row = row;
    this.col = col;
    this.prev = prev;
    this.pathWeight = pathWeight;
  }

  hasBelowLeft(nRows) {
    return this.hasBelow(nRows) && this.col > 0;
  }

  hasBelow(nRows) {
    return this.row + 1 < nRows;
  }

  hasBelowRight(nRows, nColumns) {
    return this.hasBelow(nRows) && this.col + 1 < nColumns;
  }

  getBelow(matrix) {
    const pathWeight = this.pathWeight + this._getValue(matrix, this.row + 1, this.col);
    return new Node(this.row + 1, this.col, this, pathWeight);
  }

  getBelowLeft(matrix) {
    const pathWeight = this.pathWeight + this._getValue(matrix, this.row + 1, this.col - 1);
    return new Node(this.row + 1, this.col - 1, this, pathWeight);
  }

  getBelowRight(matrix) {
    const pathWeight = this.pathWeight + this._getValue(matrix, this.row + 1, this.col + 1);
    return new Node(this.row + 1, this.col + 1, this, pathWeight);
  }

  getValue(matrix) {
    return this._getValue(matrix, this.row, this.col);
  }

  _getValue(matrix, row, col) {
    const value = matrix[row][col];
    assert(_.isNumber(value) && !_.isNaN(value), `value at (${row}, ${col}) must be numeric`);
    return value;
  }
}


module.exports = function minWeightPath (matrix) {
  assert(_.isArray(matrix), 'matrix must be an array');
  const nRows = matrix.length;
  if(nRows === 0) {
    return { weight: 0, path: [] };
  }

  const nColumns = matrix[0].length;
  if(nColumns === 0) {
    return { weight: 0, path: [] };
  }

  const pq = new Heap(function comparator (nodeA, nodeB) {
    // We include the number of rows until reaching the bottom so that we favor lower nodes. This is
    // because given two nodes along paths with the same path weight, the lower node is more likely to
    // be part of the lowest weight path.
    const rowsToGoA = nRows - nodeA.row;
    const rowsToGoB = nRows - nodeB.row;
    return (nodeA.pathWeight + rowsToGoA) - (nodeB.pathWeight + rowsToGoB);
  });

  let row = matrix[0];
  // Put the entire first row on the PQ
  for(let i = 0; i < nColumns; i++) {
    pq.push(new Node(0, i, null, row[i]));
  }

  let minNode;
  while(true) {
    minNode = pq.pop();

    // We reached the end, break out of the loop
    if(!minNode.hasBelow(nRows)) {
      break;
    }

    // Enqueue the node directly below, which is always present at this point
    pq.push(minNode.getBelow(matrix));

    // Enqueue below left and right, if they are present
    if(minNode.hasBelowLeft(nRows, nColumns)) pq.push(minNode.getBelowLeft(matrix));
    if(minNode.hasBelowRight(nRows, nColumns)) pq.push(minNode.getBelowRight(matrix));
  }

  // Follow the `prev` pointers backwards to get the path
  const path = [];
  path.push(minNode.getValue(matrix));
  let node = minNode.prev;
  while(node) {
    path.unshift(node.getValue(matrix));
    node = node.prev;
  }

  return { weight: minNode.pathWeight, path };
};