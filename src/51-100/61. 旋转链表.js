/* 给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。

示例 1:

输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
示例 2:

输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL
解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/rotate-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

var rotateRight = function (head, k) {
  if (!head || !k) return head;
  let i = 0;
  let store = head;
  let start = null;
 
  while (i < k) {
    // 用一个变量记住选择一次需要最少需要几次
    let t = 1;
    // 循环 创建一个链等于最外层的值, head = head.next; 创建一个链
    let origin = new ListNode(store.val);
    // start指针保存 该新建链的引用
    start = origin;
    t ++;
    store = store.next;
    if (store) {
      while (store.next) {
        t++;
        const next = new ListNode(store.val);
        origin.next = next;
        origin = next;
        store = store.next;
      }
      origin = new ListNode(store.val);
      origin.next = start;
      store = origin;
    } else {
      return head;
    }
    // 当选择次数大于最少需要需要旋转次数是
    if (k > t) {
      // 缩减旋转次数等于 已经转过一次的值加上取模后的值
      k = k % t + t;
    }
    i++;
  }
  return store;
};
const res = rotateRight(
  {
    val: 1, next:
    {
      val: 2, next:
      {
        val: 3, next:
        {
          val: 4, next:
          {
            val: 5, next: null,
          },
        }
      }
    }
  }, 500000002)
// console.log(rotateRight({ val: 1 }, 1))

console.log(JSON.stringify(res));