/* 删除链表中等于给定值 val 的所有节点。

示例:

输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5
通过次数95,441提交次数207,087

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-linked-list-elements
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

// Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  if (!head) return null;
  if (head.val === val) {
    // 判断头是否相同 如果相等则让 head等于下一个next
    return removeElements(head.next, val);
  }
  // 用一个变量记录当前的值
  let res = new ListNode(head.val);
  // 记录下次的值
  let next = head.next;
  // 保持最外层的指针引用
  let s = res;
  while (next) {
    if (next.val !== val) {
      // 如果不相等 则新建1个链 等于当前遍历链的值
      res.next = new ListNode(next.val);
      res = res.next;
    }
    // 遍历链表
    next = next.next;
  }
  return s;
};
