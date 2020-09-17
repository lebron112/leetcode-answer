/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 转为数组 倒序相加 然后再转为链表
const addTwoNumbers = function (l1, l2) {
  function toArr(obj) {
    const arr = [];
    while (true) {
      if (obj.next) {
        arr.push(obj.val);
        obj = obj.next;
      } else {
        arr.push(obj.val);
        return arr;
      }
    }
  }
  const result = [];
  !Array.isArray(l1) && (l1 = toArr(l1));
  !Array.isArray(l2) && (l2 = toArr(l2));
  let max = l1, min = l2, store = 0;
  if (l2.length >= l1.length) {
    max = l2;
    min = l1;
  }
  for (let i = 0; i < max.length; i++) {
    const plus = max[i] + (min[i] || 0) + store;
    store = plus > 9 ? 1 : 0;
    result.push(plus % 10);
  }
  store === 1 && (result.push(store));
  return result;
};
// test
console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));
console.log(addTwoNumbers(
  {
    val: 2,
    next: {
      val: 4,
      next: {
        val: 3,
        next: null
      }
    }
  },
  {
    val: 5,
    next: {
      val: 6,
      next: {
        val: 4,
        next: null
      }
    }
  }));