/* 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

例如：
给定二叉树 [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其自底向上的层次遍历为：

[
  [15,7],
  [9,20],
  [3]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
var levelOrderBottom = function (root) {
  const res = [];
  // 递归并且存储层数
  const check = (left, right, index) => {
    if (left || right) {
      if (!res[index]) res[index] = [];
      if (left) {
        left.val !== null && res[index].push(left.val);
        check(left.left, left.right, index + 1);
      }
      if (right) {
        right.val !== null && res[index].push(right.val)
        check(right.left, right.right, index + 1);
      }
    } else {
      return
    }
  };
  if (root) {
    res.unshift([root.val]);
    check(root.left, root.right, 1);
  }
  return res.reverse();
};