/* 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

示例 1:

输入: 1->1->2
输出: 1->2
示例 2:

输入: 1->1->2->3->3
输出: 1->2->3

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

// 遍历节点 如果当前节点值和下一节点值不相同则 重新建一个链作为新链的下一个节点 
// 继续往下找
var deleteDuplicates = function (head) {
  if(!head) return null;
  // 用一个变量存储一个最外层的链
  let item = new ListNode(head.val);
  const res = item;
  let d = head.next;
  // 循环
  while (d) {
    // 如果当前值和下一层的值不相等时，当前链的下一层等于一个新节点 并更新最外层的变量为下一个节点
    if (item.val !== d.val) {
      item.next = new ListNode(d.val);
      item = item.next;
    }
    d = d.next;
  }
  return res;
};