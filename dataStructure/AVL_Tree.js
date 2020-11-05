class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.next = null;
  }
}
class AVL_Tree {
  #root;
  #high;
  constructor(...values) {
    this.#root = null;
    this.#high = 0;
  }
  // //单链表插入，遍历，删除
  // sameNodeInset(newNode, oldNode) {
  //   oldNode.next = newNode;
  //   return;
  // }
  //节点插入回调
  insertRecursion(newNode, oldNode = this.#root) {
    if (this.#root === null) {
      this.#root = newNode;
      return;
    }
    if (newNode.value < oldNode.value) {
      oldNode.left !== null
        ? this.insertRecursion(newNode, oldNode.left)
        : () => {
            oldNode.left = newNode;
            return;
          };
    }
    if (newNode.value > oldNode.value) {
      oldNode.right !== null
        ? this.insertRecursion(newNode, oldNode.right)
        : () => {
            oldNode.right = newNode;
            return;
          };
    }
    if (newNode.value === oldNode.value) {
      oldNode.next = newNode;
    }
  }
  insert(...values) {
    for (let value of values) {
      let newNode = new Node(value);
      this.insertRecursion(newNode);
    }
  }
  remove(value) {}
  traverseRecursion() {}
  traverse() {}
  serach() {}
  getHigh() {}
}

let avlTree = new AVL_Tree();
