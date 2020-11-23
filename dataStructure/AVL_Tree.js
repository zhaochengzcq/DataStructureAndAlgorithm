class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.next = null;
    this.bf = null;
    this.maxHeight = 0;
    this.depth = 0;
    this.level = 0;
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

  /**
   * this is a recursion of insert,it can insert a node once
   * @param {Node} newNode -node will be inserted
   * @param {Node} oldNode -begin node
   */
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
  /**
   *
   * @param  {...Numbers} values -values will be inserted
   */
  insert(...values) {
    for (let value of values) {
      let newNode = new Node(value);
      this.insertRecursion(newNode);
      this.getBF();
    }
  }
  /**
   * 以交换值的方式将要移除的值不断的向下交换，直至叶子节点，再将其与树的关联切断。
   * @param {Array} arr - In-Order Traversal Array
   * @param {Numver} index - the node's index in arr
   */
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
  /**
   *
   * @param {*} value - this value will be removed
   */
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
      this.getBF();
      return arr[0];
    }
    for (let index in arr) {
      if (arr[index].value === value) {
        this.removeRecursion(arr, +index);
        this.getBF();
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
  /**
   * 中序遍历 In-Order Traversal
   * @param {Functio} callback -遍历的回调函数
   * @param {Node} node -遍历的起始点，默认值 this.#root
   */
  traversal(callback, node = this.#root) {
    if (node === null) {
      return;
    }
    this.traversal(callback, node.left);
    callback(node);
    this.traversal(callback, node.right);
  }
  /**
   * 是否存在特定值
   * @param {*} value -要查找的值
   * @param {Node} node
   */
  hasVal(value, node = this.#root) {
    if (node.value === value) {
      return node;
    }
    this.hasVal(value, node.left);
    this.hasVal(value, node.right);
    return false;
  }
  /**
   * 获取节点的最大高度，叶子节点的高度为0
   * @param {Node} node - 起始节点
   * @param {Number} height - 记录到每个节点的值，默认 -1
   * @param {Node} startNode - 记录起始节点，是整个递归的起始节点，node的初始值
   */
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
  /**
   * 获取每个节点的深度和层级，根的深度为0，层级为深度+1
   * @param {Node} node -起始节点，默认值this.#root
   * @param {Number} count -计数，默认值 0
   */
  getDepthAndLevel(node = this.#root, count = 0) {
    if (node === null) {
      return;
    }
    node.depth = count;
    node.level = ++count;
    this.getDepthAndLevel(node.left, count);
    this.getDepthAndLevel(node.right, count);
  }
  /**
   * 获取节点的最大高度
   * @param {Node} node -起始点，默认值this.#root
   */
  getNodeHeight(node = this.#root) {
    this.getHeigntRecursion(node);
    if (node === this.#root) {
      this.#height = this.#root.maxHeight;
    }
    return node.maxHeight;
  }
  /**
   * 获取树的高度
   */
  getTreeHeignt() {
    return this.#height;
  }
  /**
   * 单次旋转即可达到平衡的情况
   * @param {Node} root -旋转单元的根
   * @param {Node} pivot -旋转单元的轴
   */
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
  /**
   * 需要两次旋转才可平衡
   * @param {Node} root -旋转单元的根
   * @param {Node} pivot -旋转单元的轴
   */
  doubleRotation(root, pivot) {
    if (root.left === pivot) {
      this.simpleRotation(pivot, pivot.right);
      this.simpleRotation(root, pivot);
    } else if (root.right === pivot) {
      this.simpleRotation(pivot, pivot.left);
      this.simpleRotation(root, pivot);
    }
  }
  /**
   * 对于失去平衡的节点进行重新平衡
   * @param {Node} node - 平衡因子的绝对值大于1的节点
   */
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
    // console.log(node);
    this.getBF(node);
  }
  /**
   *自下而上的计算每个节点的平衡因子，对失衡的节点进行再平衡操作。
   * @param {Node} node -起始节点，默认值this.#root
   */
  getBF(node = this.#root) {
    if (node.left !== null) {
      this.getBF(node.left);
    }
    if (node.right !== null) {
      this.getBF(node.right);
    }
    this.getNodeHeight(node);
    this.getDepthAndLevel();
    node.bf =
      (node.left && node.left.maxHeight + 1) -
      (node.right && node.right.maxHeight + 1);

    if (Math.abs(node.bf) > 1) {
      this.reBalance(node);
    }
    return;
  }
  /**
   * 获取根节点
   */
  getRoot() {
    return this.#root;
  }
  /**
   * 判断是否为空
   */
  isEmpty() {
    return !this.#root;
  }
}
//测试
// let avlTree = new AVL_Tree(
//   50,
//   60,
//   55,
//   40,
//   4,
//   45,
//   46,
//   47,
//   99,
//   8,
//   87,
//   13,
//   49,
//   98
// );
// let str = "";
// avlTree.traversal((node) => {
//   str = str + node.value + ",";
// });
// console.log(str);
