class Node {
  constructor(val) {
    this.value = val;
    this.previous = null;
    this.next = null;
  }
}
class doubleLinkedList {
  #length;
  #head;
  #tail;
  constructor(...vals) {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
    if (vals) {
      this.add(...vals);
    }
  }
  /**
   *add values to double linked list
   * @param  {...any} vals  - values to double linked list
   */
  add(...vals) {
    for (let val of vals) {
      let node = new Node(val);
      if (this.#head === null) {
        this.#head = this.#tail = node;
        this.#length++;
      } else {
        this.#tail.next = node;
        node.previous = this.#tail;
        this.#tail = node;
        this.#length++;
      }
    }
    return this;
  }
  /**
   * insert values at the position in double linked list
   * @param {*} position - position at double linked list
   * @param  {...any} vals - values
   */
  insertAt(position, ...vals) {
    //方法二 先建立子链表，再插入到指定位置
    if (position < 0 || position > this.#length) {
      return "this position is not existent";
    }
    let d = new doubleLinkedList(...vals);
    let childHead = d.getHead();
    let childTail = d.getTail();
    let size = d.size();
    let count = 0;
    let current = this.#head;
    let pre = null;
    if (position === this.#length) {
      this.#tail.next = childHead;
      childHead.previous = this.#tail;
      this.#tail = childTail;
      this.#length += size;
      return this;
    }
    if (position === 0) {
      childTail.next = this.#head;
      this.#head.previous = childTail;
      this.#head = childHead;
      this.#length += size;
      return this;
    }
    while (true) {
      if (count === position) {
        pre.next = childHead;
        childHead.previous = pre;
        childTail.next = current;
        current.previous = childTail;
        this.#length += size;
        return this;
      }
      pre = current;
      current = current.next;
      count++;
    }
    //方法一 遍历单个值插入

    // if (position < 0 || position > this.#length) {
    //   return "this position is not existent";
    // }
    // if (position === this.#length) {
    //   this.add(...vals);
    //   return 0;
    // }
    // if (position === 0) {
    //   for (let val of vals.reverse()) {
    //     let node = new Node(val);
    //     if (this.#head) {
    //       node.next = this.#head;
    //       this.#head.previous = node;
    //       this.#head = node;
    //       this.#length++;
    //     } else {
    //       this.#head = this.#tail = node;
    //       this.#length++;
    //     }
    //   }
    //   return 0;
    // }
  }
  /**
   * remove a vlaue from double linked list
   * @param {*} val - value while be removed
   */
  remove(val) {
    let current = this.#head;
    let next = current ? current.next : null;
    let pre = current ? current.previous : null;
    let count = 0;
    while (current) {
      if (current.value === val) {
        if (count === 0) {
          this.#head = current.next;
          current.next.previous = null;
          this.#length--;
          return current;
        }
        if (count === this.#length - 1) {
          this.#tail = current.previous;
          this.#tail.next = null;
          this.#length--;
          return current;
        }
        pre.next = next;
        next.previous = pre;
        this.#length--;
        return current;
      }
      current = next;
      next = current.next;
      pre = current.previous;
      count++;
    }
  }
  /**
   * traverse the double linked list
   * @param {function} callback - node while be passed to callback function
   * @param {number} position - traverse while begin at this position
   */
  traverse(callback, position = 0) {
    let current = this.#head;
    let count = 0;
    while (current) {
      if (count >= position) {
        callback(current);
      }
      current = current.next;
      count++;
    }
  }
  /**
   * is the value in the list
   * @param {*} val - vlaue
   */
  indexOf(val) {
    let count = 0;
    let current = this.#head;
    while (count < this.#length) {
      if (current.value === val) {
        return [current, count];
      }
      current = current.next;
      count++;
    }
    return -1;
  }
  /**
   * get the head node
   */
  getHead() {
    return this.#head;
  }
  /**
   * get the tail node
   */
  getTail() {
    return this.#tail;
  }
  /**
   * get the length of list
   */
  size() {
    return this.#length;
  }
}
