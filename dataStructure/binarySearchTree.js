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
  constructor() {
    this.#root = null;
  }
  addToList(head, node) {
    let current = head;
    while (current.sameAttributesVal) {
      current = current.sameAttributesVal;
    }
    current.sameAttributesVal = node;
  }
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
  insert(...vals) {
    for (let val of vals) {
      let newNode = new Node(val);
      if (this.#root === null) {
        this.#root = newNode;
        continue;
      }
      this.insertRecursion(this.#root, newNode);
    }
  }
  removeSup(index, nodeArr) {
    if (nodeArr[index].left !== null && nodeArr[index].right !== null) {
      nodeArr[index].value = nodeArr[+index + 1].value;
      this.removeSup(+index + 1, nodeArr);
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
      return 0;
    }
    nodeArr[+index - 1].right === nodeArr[index]
      ? (nodeArr[+index - 1].right = null)
      : (nodeArr[+index + 1].left = null);
    return 0;
  }
  remove(val) {
    let nodeArr = [];
    this.traverseRecursion(this.#root, (node) => {
      nodeArr.push(node);
    });
    if (nodeArr.length === 1 && nodeArr[0].value === val) {
      this.#root = null;
    }
    for (let index in nodeArr) {
      if (nodeArr[index].value === val) {
        return this.removeSup(index, nodeArr);
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
   * @param {Function} callback
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
  gerRoot() {
    return this.#root;
  }
}
let b = new BinarySearchTree();
b.insert(
  80,
  72,
  35,
  99,
  84,
  17,
  86,
  99,
  102,
  13,
  71,
  56,
  48,
  23,
  55,
  66,
  66,
  117,
  22,
  15,
  1
);
