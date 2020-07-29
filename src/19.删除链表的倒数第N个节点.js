/* 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：

给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
说明：

给定的 n 保证是有效的。

进阶：

你能尝试使用一趟扫描实现吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list
 */

// Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const res = new ListNode(null);
  res.next = head;
  let start = res, end = res;
  // 三指针指向一个新的next start指针指向n + 1 次更新start指针 
  for (let i = 0; i <= n; i++) {
    start = start.next;
  }
  // 执行完此步骤后 end的指针遍历到 要去掉的那位的前一位
  while(start) {
    start = start.next;
    end = end.next;
  }
  // 直接跳过要去掉的那一位即可；
  end.next = end.next.next;
  return res.next;
};