/* 给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 没有重复出现 的数字。

示例 1:

输入: 1->2->3->3->4->4->5
输出: 1->2->5
示例 2:

输入: 1->1->1->2->3
输出: 2->3

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

//  Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 递归即可
// 首先判断开头开始是否有重复的 如果有则一直找直到下一个链和头不一的 并把指针调换成下一个不一样的链头
// 判断当前链是否有下一节点 如果有下一个链 且新的链表头和下一个链值相等，则递归当前指针指向的链并覆盖
// 如果新的链表头和下一个链值不一样 把新链的下一个链作为参数递归 返回的值时 新链的下一个节点
var deleteDuplicates = function (head) {
  if (!head) return head;
  let item = head;
  let next = item.next;
  // 如果下一个链值和链表头是否相同
  if (next && next.val === item.val) {
    item = item.next;
    next = item.next;
    // 循环 找到链值和前一个链不相同的值
    while (next && next.val === item.val) {
      next = next.next;
    }
    // 指针去掉有重复的
    item = next;
  }
  if (item && item.next) {
    // 新的链表头和下一个链值相等，则递归当前指针指向的链并覆盖
    if (item.next.val === item.val) {
      item = deleteDuplicates(item);
      // 把新链的下一个链作为参数递归 返回的值时 新链的下一个节点
    } else {
      item.next = deleteDuplicates(item.next)
    }
  }
  return item;
};
console.log(deleteDuplicates({
  val: 1, next: {
    val: 2, next: {
      val: 3, next: {
        val: 3, next: {
          val: 4, next: {
            val: 4, next: {
              val: 5, next: null
            }
          }
        }
      }
    }
  }
}));
console.log(deleteDuplicates({
  val: 1, next: {
    val: 1, next: {
      val: 2, next: {
        val: 2, next: null,
      },
    }
  }
}));