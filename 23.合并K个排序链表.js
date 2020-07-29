/* 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

示例:

输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-k-sorted-lists
 */

// Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// 暴力法 先生成数组 排序后再生成链表
var mergeKLists = function (lists) {
  const arr = [];
  if (!lists.length) return null;
  for (let i = 0; i < lists.length; i++) {
    let next = lists[i];
    while (next) {
      arr.push(next.val);
      next = next.next;
    }
  }
  if (!arr.length) return null;
  arr.sort((a, b) => a - b);
  let res = new ListNode(arr[arr.length - 1]);
  for (let i = arr.length - 2; i >= 0; i--) {
    const x = new ListNode(arr[i]);
    x.next = res;
    res = x;
  }
  return res;
};

console.log(mergeKLists([
  {
    val: 1, next: {
      val: 4, next: {
        val: 5, next: null
      }
    }
  },
  {
    val: 1, next:
    {
      val: 3, next:
        { val: 4, next: null }
    }
  },
  {
    val: 2, next:
    {
      val: 6, next: null
    }
  },
]));