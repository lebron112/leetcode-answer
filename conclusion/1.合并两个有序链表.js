
//  Definition for singly-linked list.
/* 示例：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
从小到大排列 非穿插排列
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let arr = [];
  let l2n = l2, l1n = l1;
  let res = null;
  while (l2n || l1n) {
    if (l2n) {
      arr.push(l2n.next);
      l2n = l2n.next;
    }
    if (l1n) {
      arr.push(l1n.next);
      l1n = l1n.next;
    }
  }
  arr = arr.sort((a, b) => a - b);
  for(let i = 0; i < arr.length; i++){
    const d = new ListNode(arr[i]);
    d.next = res;
    res = d;
  }
  return res;
};
