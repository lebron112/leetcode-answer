/* 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

 

示例:

给定 1->2->3->4, 你应该返回 2->1->4->3.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/swap-nodes-in-pairs */


// Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (head) {
    var a = head.val;
    var x = new ListNode(a);
    if (head.next) {
      var y = new ListNode(head.next.val);
      y.next = x;
      if (head.next.next) x.next = swapPairs(head.next.next);
      return y;
    }
    return head;
  } else {
    return head;
  }
};