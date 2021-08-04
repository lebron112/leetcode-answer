/* 给定一个二叉树，返回其节点值的锯齿形层序遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

例如：
给定二叉树 [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回锯齿形层序遍历如下：

[
  [3],
  [20,9],
  [15,7]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// [1, 2,3, 4,5,6,7, 8,9,10,11,12,13,14,15] [[1],[3,2],[4,5,6,7],[15,14,13,12,11,10,9,8]]

// 同102题，遍历即可，继续判断 res的长度%2 === 0如果是1则push 否则是unshift
var zigzagLevelOrder = function (root) {
  const arr = [root];
  const res = [];
  if (!root) return res;
  while (arr.length) {
    let len = arr.length;
    res.push([]);
    while (len--) {
      const top = arr.shift();
      const { val, right, left } = top;
      if (res.length % 2 === 1) {
        res[res.length - 1].push(val);
      } else {
        res[res.length - 1].unshift(val);
      }
      left && arr.push(left);
      right && arr.push(right);
    }
  }
  return res;
};