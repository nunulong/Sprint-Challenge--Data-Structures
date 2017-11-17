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
    this.size = 0;
  }
  insertNode(key, value) {
    const mapData = new Map();
    mapData.set(key, value);
    const node = {
      data: mapData,
      next: null
    };
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
      this.size++;
    } else if (!this.containsNode(key)) {
      this.tail.next = node;
      this.tail = node;
      this.size++;
    } else {
      this.updateNode(key, value);
    }
  }
  containsNode(key) {
    if (!this.head) return false;
    let myHead = this.head;
    while (myHead.next) {
      if (myHead.data.has(key)) return true;
      myHead = myHead.next;
    }
    return myHead.data.has(key);
  }
  removeNode(key) {
    if (!this.containsNode(key)) return undefined;
    if (this.head.data.has(key)) {
      this.head = this.head.next;
      this.size--;
      return this;
    }
    let current = this.head.next;
    let previous = this.head;
    while (current.next) {
      if (current.data.has(key)) {
        previous.next = current.next;
        this.size--;
        return this;
      }
      previous = current;
      current = current.next;
    }
    if (this.tail.data.has(key)) {
      this.tail = previous;
      this.size--;
      return this;
    }
  }
  retrieveNode(key) {
    if (!this.containsNode(key)) return undefined;
    let current = this.head;
    while (current.next) {
      if (current.data.has(key)) return current;
      current = current.next;
    }
    if (this.tail.data.has(key)) return this.tail;
  }
  updateNode(key, value) {
    if (this.containsNode(key)) {
      const node = this.retrieveNode(key);
      node.data.set(key, value);
    }
    return this;
  }
  loopList(cb) {
    let current = this.head;
    if (!current) return;
    for (let i = 0; i < this.size; i++) {
      cb(current);
      if (current.next) {
        current = current.next;
      } else {
        return;
      }
    }
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
  LinkedList
};
