/* 运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制 。
实现 LRUCache 类：

LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
 

进阶：你是否可以在 O(1) 时间复杂度内完成这两种操作？

 

示例：

输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
 

提示：

1 <= capacity <= 3000
0 <= key <= 10000
0 <= value <= 105
最多调用 2 * 105 次 get 和 put

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/lru-cache
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number} capacity
 */
// 要求O(1)的复杂度
// 使用链表维护, 头指针， 尾指针， 带上一项指针的listNode
// 使用一个hash hash[key=>lisNode]的形式
// get时 直接 获取hash存放的 listNode, 并更新这个链表，使得get得到的这个listNode， 
// 并把这个listNode的前一项的下一项的指针指向这个listNode的下一项
// 并且把listNode的上一项指针记为空，下一项为头指针，头指针更新 listNode
// put时，如果短于capacity长度，直接更新尾指针的下一项
//      否则，头指针后移，尾指针也后移

var LRUCacheO1 = function (capacity) {
  this.listFactory = function (key, val) {
    this.val = val;
    this.key = key;
    this.next = null;
    this.pre = null;
  }
  this.hash = new Map();
  this.listNode = null;
  this.top = null;
  this.end = null;
  this.size = capacity;
  this.refresh = (item) => {
    if (this.end !== item) {
      // 如果是链表头，
      if (this.top === item) {
        // 更新表头为下一个指针
        this.top = item.next;
        this.top.pre = null;
        // 修改尾指针
        this.end.next = item;
        item.pre = this.end;
        this.end = item;
        item.next = null;
      } else {
        console.log(item.pre.key, item.next.key)
        // 修改链接的指针
        const { pre, next } = item;
        pre.next = next;
        next.pre = pre;
        // 修改尾指针
        item.pre = this.end;
        this.end.next = item;
        this.end = item;
        item.next = null;
      }
    }
  };
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCacheO1.prototype.get = function (key) {
  const has = this.hash.has(key);
  if (!has) {
    return -1;
  } else {
    const item = this.hash.get(key);
    // 如果是最后一个不需要操作
    this.refresh(item);
    return item.val;
  }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCacheO1.prototype.put = function (key, value) {
  const List = this.listFactory;
  const list = new List(key, value);
  // 如果是更新
  if (this.hash.has(key)) {
    const item = this.hash.get(key);
    item.val = value;
    // 执行和get一样的操作
    this.refresh(item);
    return;
  }
  // 长度未够
  if (this.hash.size < this.size) {
    // 第一次插入
    if (!this.end) {
      this.top = this.end = list;
    } else {
      // 直接更新尾指针
      this.end.next = list;
      list.pre = this.end;
      this.end = list;
    }
  } else {
    // 更新尾指针
    this.end.next = list;
    list.pre = this.end;
    this.end = list;
    // 剔除头部指针
    const pre = this.top;
    this.top = pre.next;
    this.top.pre = null; // 切断链接
    pre.next = null; // 切断链接
    // 删除hash;
    this.hash.delete(pre.key);
  }
  this.hash.set(key, list);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// var lRUCache = new LRUCache(2);
// lRUCache.put(1, 0); //
// // console.log(lRUCache.hash.size, lRUCache.size )
// lRUCache.put(2, 2); //
// // console.log(lRUCache.hash.size)
// console.log(lRUCache.get(1), '----------get 1');    // 返回 0

// lRUCache.put(3, 3); //
// // console.log(lRUCache.hash)
// console.log(lRUCache.get(2), '----------get 2');    // 返回 -1 (未找到)
// // console.log(lRUCache.hash, lRUCache.end)
// lRUCache.put(4, 4); //
// // console.log(lRUCache.hash, lRUCache.end)
// console.log(lRUCache.get(1), '----------get 1');    // 返回 -1 (未找到)
// console.log(lRUCache.get(3), '----------get 3');    // 返回 3
// console.log(lRUCache.get(4), '----------get 4');    // 返回 4
