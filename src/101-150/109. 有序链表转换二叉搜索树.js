/* 给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

给定的有序链表： [-10, -3, 0, 5, 9],

一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
通过次数81,525提交次数106,825

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
// 暴力法 链表转数组
var sortedListToBST = function (head) {
  if (!head) return null;
  const arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  const make = (st, end) => {
    const mid = Math.floor((st + end) / 2);
    const node = new TreeNode(arr[mid]);
    if (mid >= st && mid <= end) {
      node.left = make(st, mid - 1);
      node.right = make(mid + 1, end);
      return node;
    } else {
      return null;
    }
  }
  return make(0, arr.length - 1)
};
