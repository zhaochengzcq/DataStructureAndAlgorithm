class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class AVL_Tree {
  #root;
  #high;
  constructor(...values) {
    this.#root = null;
    this.#high = 0;
  }
  insertRecursion(newValz) {
    if (this.#root === null) {
      this.#root = new Node(newVal);
    }
  }
  insert(...values) {
    for (let value of values) {
      let newNode = new Node(value);
      this.insertRecursion(this.#root, newNode);
    }
  }
  remove() {}
  traverse() {}
  serach() {}
  getHigh() {}
}

let avlTree = new AVL_Tree();
