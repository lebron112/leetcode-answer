/* 
给定一个单链表 L 的头节点 head ，单链表 L 表示为：

L0 → L1 → … → Ln - 1 → Ln
请将其重新排列后变为：

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

 

示例 1：



输入：head = [1,2,3,4]
输出：[1,4,2,3]
示例 2：



输入：head = [1,2,3,4,5]
输出：[1,5,2,4,3]
 

提示：

链表的长度范围为 [1, 5 * 104]
1 <= node.val <= 1000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reorder-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
// 先构建一个反转后的链表，然后交叉插入
// 当只有2个时不进行交叉，所以应该是 （长度-2）/2 
// 判断长度如果 不大于 2 则不需要进行交换，如果大于2的情况， 对长度取模后再剪断
var reorderList2 = function (head) {
  let len = 0;
  let res = head;
  let node = null;
  // 进行反转
  while (res) {
    const newNode = new ListNode(res.val);
    newNode.next = node;
    node = newNode;
    res = res.next;
    len++;
  }
  // -2 再相除 长度为3则进行1次 
  let times = (len - 2) / 2;
  while (times > 0) {
    const d = head.next;
    head.next = node;
    node = node.next;
    head.next.next = d;
    head = d;
    times--;
  };
  if (len > 2) {
    // 判断奇偶
    if (len % 2) {
      head.next = null;
    } else {
      head.next.next = null;
    }
  }
};
var { arr2Node, node2Arr } = require('../utils');

// 双端指针解法
// 用一个数组存储 链，每项没有下一个节点，只记录值
// 然后从2端开始，把左链的下一个节点赋值给右链的节点，同时，右链的下个几点变成左链
var reorderList = (head) => {
  const res = [];
  let len = 0;
  // 数组记录每一个链
  while (head) {
    const n = head.next;
    head.next = null;
    res.push(head);
    head = n;
    len++;
  }
  let i = 0;
  let j = len - 1;
  // 双指针
  while (i < j) {
    // 头指针等于尾指针
    res[i].next = res[j];
    // 判断，防止链成环
    if (res[i + 1] !== res[j]) {
      // 头指针的第二项等于尾指针的下一项，这样就能串起来，
      res[j].next = res[i + 1];
    }
    i++;
    j--;
  }
};


const node0 = arr2Node([1]);
reorderList(node0)
console.log(node2Arr(node0));//[1]

const node3 = arr2Node([1, 2]);
reorderList(node3)
console.log(node2Arr(node3));//[1,2]

const node1 = arr2Node([1, 2, 3, 4, 5]);
reorderList(node1)
console.log(node2Arr(node1));//[1,5,2,4,3]

const node2 = arr2Node([1, 2, 3, 4, 5, 6]);
reorderList(node2)
console.log(node2Arr(node2));//[1,6,2,5,3,4]