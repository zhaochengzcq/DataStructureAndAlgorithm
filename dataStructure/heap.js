// /**
//  * change value
//  * @param {number} parent -index of parent
//  * @param {number} child -index of child which have the max value between left child and right child
//  */
// function change(parent, child) {
//   let temp = arr[parent];
//   arr[parent] = arr[child];
//   arr[child] = temp;
// }
// /**
//  *make a max-heap
//  * @param {number} index -start at index in array
//  * @param {number} length -array's length
//  */
// function maxHeap(index, length) {
//   let parent = index;
//   let child = 2 * index + 1;
//   if (child >= length) {
//     return;
//   }
//   if (child + 1 < length && arr[child] < arr[child + 1]) {
//     child += 1;
//   }
//   if (arr[parent] < arr[child]) {
//     change(parent, child);
//     maxHeap(child, length);
//   }
// }
// var arr = [
//   3,
//   5,
//   3,
//   0,
//   8,
//   6,
//   1,
//   5,
//   8,
//   6,
//   2,
//   4,
//   9,
//   4,
//   7,
//   0,
//   1,
//   8,
//   9,
//   7,
//   3,
//   1,
//   2,
//   5,
//   9,
//   7,
//   4,
//   0,
//   2,
//   6,
// ];
// for (let i = Math.floor((arr.length - 2) / 2); i >= 0; i--) {
//   maxHeap(i, arr.length);
// }
// for (let i = arr.length; i > 1; i--) {
//   change(0, i - 1);
//   maxHeap(0, i - 1);
// }

Array.prototype.exchange = function (parent, child) {
  let temp = this[parent];
  this[parent] = this[child];
  this[child] = temp;
};
Array.prototype.maxHeap = function (index, length) {
  let parent = index;
  let child = 2 * parent + 1;
  if (child >= length) {
    return;
  }
  if (child + 1 < length && this[child] < this[child + 1]) {
    child += 1;
  }
  if (this[parent] < this[child]) {
    this.exchange(parent, child);
    this.maxHeap(child, length);
  }
};
Array.prototype.minHeap = function (index, length) {
  let parent = index;
  let child = 2 * parent + 1;
  if (child >= length) {
    return;
  }
  if (child + 1 < length && this[child] > this[child + 1]) {
    child += 1;
  }
  if (this[parent] > this[child]) {
    this.exchange(parent, child);
    this.minHeap(child, length);
  }
};
Array.prototype.getHeap = function (type = "max") {
  switch (type) {
    case "max":
      for (let i = Math.floor((this.length - 2) / 2); i >= 0; i--) {
        this.maxHeap(i, this.length);
      }
      break;
    case "min":
      for (let i = Math.floor((this.length - 2) / 2); i >= 0; i--) {
        this.minHeap(i, this.length);
      }
      break;
    default:
      console.log("error");
      break;
  }
};
Array.prototype.removeHeap = function (type, index) {
  this.exchange(index, this.length - 1);
  switch (type) {
    case "max":
      this.maxHeap(index, this.length - 1);
      return this.pop();
    case "min":
      this.minHeap(index, this.length - 1);
      return this.pop();
    default:
      console.log("error");
      break;
  }
};
Array.prototype.heapSort = function (type) {
  let i = this.length;
  switch (type) {
    case "max":
      for (i; i > 1; i--) {
        this.exchange(0, i - 1);
        this.maxHeap(0, i - 1);
      }
      break;
    case "min":
      for (i; i > 1; i--) {
        this.exchange(0, i - 1);
        this.minHeap(0, i - 1);
      }
      break;
    default:
      break;
  }
};

var arr = [
  3,
  5,
  3,
  0,
  8,
  6,
  1,
  5,
  8,
  6,
  2,
  4,
  9,
  4,
  7,
  0,
  1,
  8,
  9,
  7,
  3,
  1,
  2,
  5,
  9,
  7,
  4,
  0,
  2,
  6,
];
