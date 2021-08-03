/* 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

 

示例:

输入: head = 1->4->3->2->5->2, x = 3
输出: 1->2->2->4->3->5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/partition-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

const { arrToNode, nodeToArr } = require("../utils");

//  * Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
// 找出 head里第x 开始 ，后面比x小的 ，并且要按顺序，即x前是1,4，后面是2，插入到1后面，4之前, 后面的在这个插入的节点之后进行移动
/* 
  解法一，先循环遍历一遍，找出值为x的指针，分成前后2个链，然后遍历后面的链，把小于x值的链，取出来，遍历前面的链，
  找到一个可以插入的位置即 插入值大于等于前一个值，小于等于后一个值，记住该位置，后面所有小于x的值 都取出放到这个位置后面
 */
var partitionOld = function (head, x) {
  let left = head;
  const nodes = [];
  let right = null;

  while (head) {
    const next = head.next;
    if (next) {
      if (head.val === x) {
        right = next;
        head.next = null;
        break;
      } else if (next.val === x) {
        right = next.next;
        next.next = null;
        head = next;
        break;
      }
    } else {
      break;
    }
    head = next;
  }
  // console.log(nodeToArr(left), nodeToArr(right),'----')
  // 剔除比x小的 放入nodes里, 把大的拼接到head后面
  while (right) {
    if (right.val < x) {
      nodes.push(right);
    } else {
      head.next = new ListNode(right.val);
      head = head.next;
    }
    right = right.next;
  }
  // console.log(nodeToArr(left), nodeToArr(right), nodes.length, '-');
  // 接着，遍历nodes 生产一个全新的链。
  let insetNode = null;
  let insetHead = null;
  while (nodes.length) {
    const node = new ListNode(nodes.shift().val);
    if (!insetNode) {
      insetNode = node;
      insetHead = node;
    } else {
      insetHead.next = node;
      insetHead = insetHead.next;
    }
  }
  // 把整个链重新插入到left里
  // console.log(nodeToArr(insetNode), nodes.length, '--')
  if (insetNode) {
    const v = insetNode.val;
    if (left.val < v) {
      let leftHead = left;
      while (true) {
        const next = leftHead.next;
        if (next.val > v) {
          leftHead.next = insetNode;
          insetHead.next = next;
          break;
        } else {
          leftHead = leftHead.next;
        }
      }
    } else {
      insetHead.next = left;
      left = insetNode;
    }
  }
  return left;
};

/* 
题目描述有问题 【你应当保留两个分区中每个节点的初始相对位置】，理解为，大于等于x的节点直接抽出来放到链表最后，
这样题目就更简单了
*/
const partition = function (head, v) {
  let left = null;
  let right = null;
  let leftPo = null;
  let rightPo = null;
  if (!head) return head;
  while (head) {
    const node = new ListNode(head.val);
    // 把 >= v 的全部剔除 生成一个右链
    if (head.val >= v) {
      if (!right) {
        right = node;
        rightPo = node;
      } else {
        rightPo.next = node;
        rightPo = rightPo.next;
      }
      // 把比v小的 全部剔除 生成一颗左链
    } else {
      if (!left) {
        left = node;
        leftPo = node;
      } else {
        leftPo.next = node;
        leftPo = leftPo.next;
      }
    }
    head = head.next;
  }
  //进行拼接，过滤特殊情况，即所有链的值都大于v，那么就会没有左链
  if (left) {
    leftPo.next = right;
  }
  return left || right;
}
console.log(nodeToArr(partition(arrToNode([1, 4, 3, 2, 5, 2]), 3)));

console.log(nodeToArr(partition(arrToNode([1, 4, 3, 0, 2, 5, 2]), 3)));// [1,0,2,2,4,3,5]

console.log(nodeToArr(partition(arrToNode([2, 1]), 2)));

console.log(nodeToArr(partition(arrToNode([3, 2, 1]), 3)));

console.log(nodeToArr(partition(arrToNode([3, 2, 1]), 2)));

console.log(nodeToArr(partition(arrToNode([1, 4, 3, 9, 2, 5, 6, 8]), 9))); // [1,4,3,2,5,6,8,9]


console.log(nodeToArr(partition(arrToNode([1]), 0)));