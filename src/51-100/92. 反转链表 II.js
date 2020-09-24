/* 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明:
1 ≤ m ≤ n ≤ 链表长度。

示例:

输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-linked-list-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

// Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
// 递归的思路
// 1，判断m === n如果相同 无需反转
// 2，判断m === 1 如果是则进行反转操作 
// 3，反转操作 一个更新链指向最外层的链 用一个last 指向这个最外层的链 新建一个链节点 改链节点的next是上一次更新的链 最后再把新建的那个链指向更新链 
// 直到n === index的时候结束 last指向head的下一个节点（此时last是反转后第n个链了） 然后返回更新链，注意如果n===链表深度时  最后也要返回那个更新链
// 4，如果 m !== 1 则更新head  用一个index记录深度 直到深度index + 1 === m时 说明可以进行递归操作了，只需更新head的next节点即可，
// next节点是 递归传入 下一个节点,m 为1 n为 原n - 深度index
var reverseBetween = function (head, m, n) {
  if (!head || m === n) return head;
  let index = 1;
  if (m === 1) {
    let res = new ListNode(head.val);
    head = head.next;
    let last = res;
    while (head) {
      if (index === n) {
        last.next = head;
        return res;
      } else {
        const next = new ListNode(head.val);
        head = head.next;
        next.next = res;
        res = next;
        index++;
      }
    }
    return res;
  } else {
    let out = head;
    while (head.next) {
      if (index + 1 === m) {
        head.next = reverseBetween(head.next, 1, n - index);
        return out;
      } else {
        head = head.next;
        index++;
      }
    }
  }
};
// console.log(JSON.stringify(reverseBetween({
//   val: 1, next: {
//     val: 2, next: {
//       val: 3, next: {
//         val: 4, next: {
//           val: 5, next: {
//             val: 6, next: {
//               val: 7, next: null
//             }
//           }
//         }
//       }
//     }
//   }
// }, 2, 5)));
console.log(JSON.stringify(reverseBetween({
  val: 1, next: {
    val: 2, next: null
  }
}, 1, 2)));