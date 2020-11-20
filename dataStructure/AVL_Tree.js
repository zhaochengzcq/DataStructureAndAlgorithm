class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.next = null;
    this.bf = null;
    this.maxHeight = 0;
  }
}

//待解决 获取深度/层数
class AVL_Tree {
  #root;
  #height;
  constructor(...values) {
    this.#root = null;
    this.#height = 0;
    this.insert(...values);
  }

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
      this.getBF();
    }
    // this.getNodeHeight();s
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
  getHeigntRecursion(node = this.#root, height = -1, startNode = node) {
    if (node === null) {
      return;
    }
    if (startNode === node) {
      startNode.maxHeight = 0;
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
  //获取节点的高度
  getNodeHeight(node = this.#root) {
    this.getHeigntRecursion(node);
    if (node === this.#root) {
      this.#height = this.#root.maxHeight;
    }
    return node.maxHeight;
  }
  //获取树的高度
  getTreeHeignt() {
    return this.#height;
  }
  //旋转
  simpleRotation(root, pivot) {
    let changeVal = null;
    if (root.left === pivot) {
      changeVal = root.value;
      root.value = pivot.value;
      root.left = pivot.left;
      pivot.value = changeVal;
      pivot.left = pivot.right;
      pivot.right = root.right;
      root.right = pivot;
    } else if (root.right === pivot) {
      changeVal = root.value;
      root.value = pivot.value;
      root.right = pivot.right;
      pivot.value = changeVal;
      pivot.right = pivot.left;
      pivot.left = root.left;
      root.left = pivot;
    }
  }
  doubleRotation(root, pivot) {
    if (root.left === pivot) {
      this.simpleRotation(pivot, pivot.right);
      this.simpleRotation(root, pivot);
    } else if (root.right === pivot) {
      this.simpleRotation(pivot, pivot.left);
      this.simpleRotation(root, pivot);
    }
  }
  reBalance(node) {
    let nodeLeft = node.left;
    let nodeRight = node.right;
    if (node.bf > 0 && nodeLeft && nodeLeft.bf > 0) {
      this.simpleRotation(node, nodeLeft);
    } else if (node.bf < 0 && nodeRight && nodeRight.bf < 0) {
      this.simpleRotation(node, nodeRight);
    } else if (node.bf > 0 && nodeLeft && nodeLeft.bf < 0) {
      this.doubleRotation(node, nodeLeft);
    } else if (node.bf < 0 && nodeRight && nodeRight.bf > 0) {
      this.doubleRotation(node, nodeRight);
    }
    console.log(node);
    this.getBF(node);
  }
  //获取平衡因子
  getBF(node = this.#root) {
    if (node.left !== null) {
      this.getBF(node.left);
    }
    if (node.right !== null) {
      this.getBF(node.right);
    }
    this.getNodeHeight(node);
    node.bf =
      (node.left && node.left.maxHeight + 1) -
      (node.right && node.right.maxHeight + 1);

    if (Math.abs(node.bf) > 1) {
      this.reBalance(node);
    }
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
  60,
  55,
  40,
  4,
  45,
  46,
  47,
  99,
  8,
  87,
  13,
  49,
  98
);
let str = "";
avlTree.traversal((node) => {
  str = str + node.value + ",";
});
console.log(str);
