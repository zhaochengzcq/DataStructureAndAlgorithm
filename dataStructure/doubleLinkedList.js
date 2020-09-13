class Node {
  constructor(val) {
    this.value = val;
    this.previous = null;
    this.next = null;
  }
}
/**
 *
 */
class doubleLinkedList {
  #length;
  #head;
  #tail;
  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
  }
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
  }
  insertAt(position, ...vals) {
    //方法二 先建立子链表，再插入到指定位置
    //方法一 遍历单个值插入
    let d = new doubleLinkedList();
    if (position < 0 || position > this.#length) {
      return "this position is not existent";
    }
    if (position === this.#length) {
      this.add(...vals);
      return 0;
    }
    if (position === 0) {
      for (let val of vals.reverse()) {
        let node = new Node(val);
        if (this.#head) {
          node.next = this.#head;
          this.#head.previous = node;
          this.#head = node;
          this.#length++;
        } else {
          this.#head = this.#tail = node;
          this.#length++;
        }
      }
      return 0;
    }
  }
  remove() {}
  traverse() {}
  indexOf() {}
  size() {
    return this.#length;
  }
}
