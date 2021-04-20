/* 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

 

示例 1：

输入：head = [1,3,2]
输出：[2,3,1] */


function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {number[]}
 */
// 链表转数组
var reversePrint = function (head) {
  const res = [];
  while (head) {
    res.unshift(head.val);
    head = head.next;
  }
  return res;
};