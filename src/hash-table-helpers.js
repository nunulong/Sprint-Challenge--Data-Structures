// A special array class that can only store the number of items specified by the `limit` argument
class LimitedArray {
  constructor(limit) {
    // You should not be directly accessing this array from your hash table methods
    // Use the getter and setter methods included in this class to manipulate data in this class
    this.storage = [];
    this.limit = limit;
  }

  checkLimit(index) {
    if (typeof index !== 'number') throw new Error('The supplied index needs to be a number');
    if (this.limit <= index) {
      throw new Error('The supplied index lies out of the array\'s bounds');
    }
  }

  each(cb) {
    for (let i = 0; i < this.storage.length; i++) {
      cb(this.storage[i], i);
    }
  }
  // Use this getter function to fetch elements from this class
  get(index) {
    this.checkLimit(index);
    return this.storage[index];
  }

  get length() {
    return this.storage.length;
  }
  // Use this setter function to add elements to this class
  set(index, value) {
    this.checkLimit(index);
    this.storage[index] = value;
  }
}
// Linked List is used to address collision in hash table
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  insert(key, value) {
    const mapData = new Map();
    mapData.set(key, value);
    const node = {
      data: mapData,
      next: null,
    };
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else if (!this.contains(key)) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.update(key, value);
    }
  }
  contains(key) {
    if (!this.head) return false;
    let myHead = this.head;
    while (myHead.next) {
      if (myHead.data.has(key)) return true;
      myHead = myHead.next;
    }
    return myHead.data.has(key);
  }
  remove(key) {
    if (!this.contains(value)) return undefined;
    if (this.head.data.has(key)) {
      const node = this.head;
      this.head = this.head.next;
      return this;
    } else {
      let current = this.head.next;
      let previous = this.head;
      while (current.next) {
        if (current.data.has(key)) {
          const node = current;
          previous.next = current.next;
          return this;
        }
        previous = current;
        current = current.next;
      }
      if (this.tail.data.has(key)) {
        const node = this.tail;
        this.tail = previous;
        return this;
      }
    }
  }
  retrieve(key) {
    if (!this.contains(key)) return undefined;
    let current = this.head;
    while (current.next) {
      if (current.data.has(key)) return current;
      current = current.next;
    }
    if (this.tail.data.has(key)) return this.tail;
  }
  update(key, value) {
    if (this.contains(key)) {
      const node = this.retrieve(key);
      node.data.set(key, value);
    }
  }
  isEmpty() {
    return this.head === null ? true : false;
  }
} 

/* eslint-disable no-bitwise, operator-assignment */
// This is hash function you'll be using to hash keys
// There's some bit-shifting magic going on here, but essentially, all it is doing is performing the modulo operator
// on the given `str` arg (the key) modded by the limit of the limited array
// This simply ensures that the hash function always returns an index that is within the boundaries of the limited array
const getIndexBelowMax = (str, max) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % max;
};

module.exports = {
  LimitedArray,
  getIndexBelowMax,
  LinkedList,
};
