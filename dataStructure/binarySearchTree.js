/**
 * binary search tree
 * -insert
 * -remove
 * -search
 * -traverse
 * -getHigh
 */
class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
    this.sameAttributesVal = null;
  }
}
class BinarySearchTree {
  #root;
  #high;
  constructor(...vals) {
    this.#root = null;
    this.#high = 0;
    this.insert(...vals);
  }
  /**
   * add the node to list which have a same value with list members
   * @param {Node} head - the head node in list
   * @param {Node} node - while be added to the list
   */
  addToList(head, node) {
    let current = head;
    while (current.sameAttributesVal) {
      current = current.sameAttributesVal;
    }
    current.sameAttributesVal = node;
  }
  /**
   * insert recursion function
   * @param {Node} oldNode - node in the tree
   * @param {Node} newNode - node while be added
   */
  insertRecursion(oldNode, newNode) {
    if (oldNode.value === newNode.value) {
      this.addToList(oldNode, newNode);
      return;
    }
    if (newNode.value < oldNode.value) {
      oldNode.left
        ? this.insertRecursion(oldNode.left, newNode)
        : (oldNode.left = newNode);
    } else {
      oldNode.right
        ? this.insertRecursion(oldNode.right, newNode)
        : (oldNode.right = newNode);
    }
  }
  /**
   * -create a binary-search-tree
   * -add values to binary-search-tree
   * @param  {...Number} vals
   */
  insert(...vals) {
    for (let val of vals) {
      let newNode = new Node(val);
      if (this.#root === null) {
        this.#root = newNode;
        continue;
      }
      this.insertRecursion(this.#root, newNode);
    }
    this.getHighRecursion(this.#root, 0);
  }
  removeRecursion(index, nodeArr) {
    if (nodeArr[index].left !== null && nodeArr[index].right !== null) {
      nodeArr[index].value = nodeArr[+index + 1].value;
      this.removeRecursion(+index + 1, nodeArr);
      return 0;
    }
    if (nodeArr[index].left !== null || nodeArr[index].right !== null) {
      let current = null;
      nodeArr[index].left
        ? (current = nodeArr[index].left)
        : (current = nodeArr[index].right);
      nodeArr[index].value = current.value;
      nodeArr[index].left = current.left;
      nodeArr[index].right = current.right;
      this.getHighRecursion(this.#root, 0);
      return 0;
    }
    nodeArr[+index - 1] && nodeArr[+index - 1].right === nodeArr[index]
      ? (nodeArr[+index - 1].right = null)
      : (nodeArr[+index + 1].left = null);
    this.getHighRecursion(this.#root, 0);
    return 0;
  }
  remove(val) {
    let nodeArr = [];
    this.traverseRecursion(this.#root, (node) => {
      nodeArr.push(node);
    });
    if (nodeArr.length === 1 && nodeArr[0].value === val) {
      this.getHighRecursion(this.#root, 0);
      this.#root = null;
      return;
    }
    for (let index in nodeArr) {
      if (nodeArr[index].value === val) {
        return this.removeRecursion(index, nodeArr);
      }
    }
  }
  serachRecursion(val, node) {
    if (node === null) {
      return -1;
    }
    if (node.value === val) {
      return node;
    }
    return val > node.value
      ? this.serachRecursion(val, node.right)
      : this.serachRecursion(val, node.left);
  }
  serach(val) {
    if (!this.isEmpty()) {
      return this.serachRecursion(val, this.#root);
    }
    return -1;
  }
  /**
   * depth first search
   * **pre-order
   * =>in-order
   * **pos-order
   * @param {Node} node
   * @param {Function} callback -callback function
   */
  traverseRecursion(node, callback) {
    if (node === null) {
      return;
    }
    this.traverseRecursion(node.left, callback);
    callback(node);
    this.traverseRecursion(node.right, callback);
  }
  traverse(callback) {
    this.traverseRecursion(this.#root, callback);
  }
  isEmpty() {
    return !this.#root;
  }
  getHighRecursion(node, i) {
    if (!i) {
      this.#high = 0;
    }
    if (node === null) {
      this.#high < i ? (this.#high = i) : this.#high;
      return i;
    }
    i++;
    this.getHighRecursion(node.left, i);
    this.getHighRecursion(node.right, i);
  }
  getHigh() {
    this.getHighRecursion(this.#root, 0);
    return this.#high;
  }
  getRoot() {
    return this.#root;
  }
}
