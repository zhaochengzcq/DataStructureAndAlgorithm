class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.next = null;
    this.bf = null;
    this.maxHeight = null;
  }
}
class AVL_Tree {
  #root;
  #height;
  constructor(...values) {
    this.#root = null;
    this.#height = 0;
    this.insert(...values);
  }
  //旋转
  //节点插入回调
  insertRecursion(newNode, oldNode = this.#root) {
    if (this.#root === null) {
      this.#root = newNode;
      return;
    }
    if (newNode.value < oldNode.value) {
      oldNode.left !== null
        ? this.insertRecursion(newNode, oldNode.left)
        : (oldNode.left = newNode);
      return;
    }
    if (newNode.value > oldNode.value) {
      oldNode.right !== null
        ? this.insertRecursion(newNode, oldNode.right)
        : (oldNode.right = newNode);
      return;
    }
    if (newNode.value === oldNode.value) {
      oldNode.next = newNode;
      return;
    }
  }
  insert(...values) {
    for (let value of values) {
      let newNode = new Node(value);
      this.insertRecursion(newNode);
    }
    this.getNodeHeight();
  }
  removeRecursion(arr, index) {
    if (arr[index].left === null && arr[index].right === null) {
      if (index - 1 >= 0 && arr[index - 1].right === arr[index]) {
        arr[index - 1].right = null;
        return;
      }
      if (index + 1 < arr.length && arr[index + 1].left === arr[index]) {
        arr[index + 1].left = null;
        return;
      }
    }
    if (arr[index].right === null) {
      let changeVal = arr[index].value;
      arr[index].value = arr[index - 1].value;
      arr[index - 1].value = changeVal;
      this.removeRecursion(arr, index - 1);
      return;
    }
    arr[index].value = arr[index + 1].value;
    this.removeRecursion(arr, index + 1);
    return;
  }
  remove(value) {
    if (this.#root === null) {
      return false;
    }
    let arr = [];
    this.traversal((node) => {
      arr.push(node);
    });
    if (arr.length === 1 && arr[0].value === value) {
      this.#root = null;
      this.getNodeHeight();
      return arr[0];
    }
    for (let index in arr) {
      if (arr[index].value === value) {
        this.removeRecursion(arr, +index);
        this.getNodeHeight();
        //待优化
        for (let node of arr) {
          if (node.value === value) {
            return node;
          }
        }
      }
    }
    return false;
  }
  traversal(callback, node = this.#root) {
    if (node === null) {
      return;
    }
    this.traversal(callback, node.left);
    // let pendingNode = node;
    // do {
    //   callback(pendingNode);
    //   pendingNode = pendingNode.next;
    // } while (pendingNode);
    callback(node);
    this.traversal(callback, node.right);
  }
  hasVal(value, node = this.#root) {
    if (node.value === value) {
      return node;
    }
    this.hasVal(value, node.left);
    this.hasVal(value, node.right);
    return false;
  }
  getHeigntRecursion(node = this.#root, height = 0, startNode = node) {
    if (node === null) {
      return;
    }
    height++;
    node.left === null
      ? startNode.maxHeight < height
        ? (startNode.maxHeight = height)
        : startNode.maxHeight
      : this.getHeigntRecursion(node.left, height, startNode);
    node.right === null
      ? startNode.maxHeight < height
        ? (startNode.maxHeight = height)
        : startNode.maxHeight
      : this.getHeigntRecursion(node.right, height, startNode);
  }
  getNodeHeight(node = this.#root) {
    this.getHeigntRecursion(node);
    if (node === this.#root) {
      this.#height = this.#root.maxHeight;
    }
    return node.maxHeight;
  }
  getTreeHeignt() {
    return this.#height;
  }
  // 判断发生旋转的部分在根的左子树还是右子树
  getBF(node = this.#root) {
    if (node.left !== null) {
      this.getBF(node.left);
    }
    if (node.right !== null) {
      this.getBF(node.right);
    }
    this.getNodeHeight(node);
    node.bf = Math.abs(
      (node.left && node.left.maxHeight) - (node.right && node.right.maxHeight)
    );
    return;
  }
  getRoot() {
    return this.#root;
  }
  isEmpty() {
    return !this.#root;
  }
}

let avlTree = new AVL_Tree(
  50,
  1,
  89,
  45,
  16,
  42,
  33,
  78,
  65,
  12,
  10,
  33,
  33,
  65,
  99,
  100
);
let str = "";
avlTree.traversal((node) => {
  str = str + node.value + ",";
});
console.log(str);

//                 50
//          1
//             45
//           16
//         12
//       10

// function getBF() {}
