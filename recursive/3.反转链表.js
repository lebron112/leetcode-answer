/* 输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL */

// Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head) return head;
  // 创建一个最外层值的listNode  
  let h = head.next;
  let newNode = new ListNode(head.val);
  console.log(newNode);
  while (h) {
    // 创建一个listNode 把一个next赋值给当前的值 把外层创建的那个值赋值给循环里创建的下一个next节点 然后把这个listNode更新为最外层
    const x = new ListNode(h.val);
    h = h.next;
    x.next = newNode;
    newNode = x;
    console.log(newNode);
  }
  return newNode;
};
console.log(reverseList({
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4
      }
    }
  }
}))