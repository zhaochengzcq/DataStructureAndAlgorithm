/**
 * define node class
 */
class Node {
  constructor(val) {
    this.data = val;
    this.next = null;
  }
}
/**
 * define singlyLinkedList
 */
class LinkedList {
  constructor() {
    this.__length = 0;
    this.head = null;
  }
  /**
   * add a new node at assigned position in linkedlist
   * @param {*} val - node data
   * @param {number=} position - new node will be added at this position , <0> is the head ,<this._length> is the tail(deafult)
   */
  add(val, position = this._length) {
    if (position < 0 || position > this._length) {
      return -1;
    }
    let node = new Node(val);
    if (this.empty()) {
      this.head = node;
      this._length++;
      return 0;
    }
    if (position === 0) {
      node.next = this.head;
      this.head = node;
      this._length++;
      return 0;
    }
    let index = 0;
    let previous = null;
    let current = this.head;
    while (index < this._length) {
      if (index === position && position === this._length) {
        previous.next = node;
        this._length++;
        return 0;
      }
      if (index === position) {
        previous.next = node;
        node.next = current;
        this._length++;
        return 0;
      }
      previous = current;
      current = current.next;
      index++;
    }
  }
  /**
   * remove a node at assigned position in linkedlist
   * @param {number} position -the node at this position will be removed
   */
  remove(position) {
    if (position < 0 || position >= this._length) {
      return -1;
    }
    let index = 0;
    let previous = null;
    let current = this.head;
    while (index < this._length) {
      if (index === position) {
        previous.next = current.next;
        this._length--;
        return current.val;
      }
      previous = current;
      current = current.next;
      index++;
    }
  }
  /**
   * return the first index of the value
   * @param {*} val -value will be searched
   * @param {number} start -index will be after start(default<0>)
   */
  indexOf(val, start = 0) {
    if (start < 0 || start >= this.__length) {
      return -1;
    }
    let index = 0;
    let current = this.head;
    while (index < this._length) {
      if (index >= start && current.val === val) {
        return index;
      }
      current = current.next;
      index++;
    }
  }
  /**
   * traverse the linkedlist and do something
   * @param {function} callbackFun - carried out callback function while traverse
   */
  traverse(callbackFun = (index, data) => {}) {
    if (!this.isEmpty()) {
      let index = 0;
      let current = this.head;
      while (index < this._length) {
        callbackFun(index, current.val);
        current = current.next;
      }
    }
  }
  /**
   *confirm the linkedlist is empty or not
   */
  isEmpty() {
    return !this._length;
  }
}

let singlyLinkedList = new LinkedList();
