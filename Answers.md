Stack
Order of insertions: always put the new element to the top of the stack, which means newer element on top of the older element in order.
Order of removals: always delete the top element of the stack frist, which means the last one that was put into the stack will be removed first.

Queue
Order of insertions: always put the new element to the end of the queue, which means the newer element is behind the older elements, just like the queue in the real world.
Order of removal: always delete the element at the beginning of the queue first, which means the first element that was put into the queue will be removed first.

Linked List: retrival time complexity is O(n), n is the total number of elements in the linked list.

Hash table: retreival time complexity is O(n) in the worst case which means there are lots of collisions in the hash table and capacity of hash table is full. If there is few collisons in the hash table, the retreival time complexity is O(1) since the hash function can guarantee that if you have the same key, you will always get the same bucket that stores your (key, value) pair in the hash table. 

Binary Search Trees: retreival time complexity is O(logn), n is the total number of nodes of the tree.

Advantages to using a hash table over an array: 1. insertions, the time complexity will be constant time since the hash function will always give you the index of the bucket in hash table if the key comes in. And the resizing property will ensure the data will be allocated in the hash table with low occupancy. 2. retreivals, hash function will always give you the same bucket that stores the data in hash table if the same key comes in. The time complexity is also will be constant time in average. 3. deletion, since the index of the bucket will be given by the key through hash function right away,the data will be deleted immediately. The time complexity is constant time. 

While array is good for insertion. the time complexity is constant time. But talking about the retreieval and deletion, the time complexity will be O(n) since the arry needs to iterate every single element ensuring to find the data needed.