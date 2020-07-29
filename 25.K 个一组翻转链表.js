/* 给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

示例 :

给定这个链表：1->2->3->4->5

当 k = 2 时，应当返回: 2->1->4->3->5

当 k = 3 时，应当返回: 3->2->1->4->5

说明 :

你的算法只能使用常数的额外空间。
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-nodes-in-k-group
 */

//  * Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if(!head) return head;
  const m = (list) => {
    if(!list.next) return list;
    let i = 0;
    let od = list;
    let x = list;
    const arr = [];
    while(i < k && od){
      arr.push(od.val);
      od = od.next;
      i++;
    }
    if(arr.length === k){
      while(arr.length){
        x.val = arr.pop();
        x = x.next;
      }
      return x && m(x);
    }      
  };
  m(head);
  return head;
};

const toListNode = (arr) => {
  let res = null;
  while (arr.length) {
    const v = new ListNode(arr.pop());
    v.next = res;
    res = v;
  }
  return res;

}
// console.log(reverseKGroup(toListNode([1, 2, 3, 4, 5]), 3));
console.log(reverseKGroup(toListNode([1, 2]), 2));