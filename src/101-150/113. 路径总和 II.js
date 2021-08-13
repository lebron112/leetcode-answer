/* 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

说明: 叶子节点是指没有子节点的节点。

示例:
给定如下二叉树，以及目标和 sum = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
返回:

[
   [5,4,11,2],
   [5,8,4,5]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/path-sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
const { arr2Tree } = require('../utils');
//   Definition for a binary tree node.
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
// 递归即可
// 遍历到树枝节点, 计算存入数组中的总和是否等于目标值即可 easy~
const pathSum = (root, sum) => {
  const res = [];
  const reduceMap = (tree, arr) => {
    const copy = [...arr];
    if (tree) {
      const { val, left, right } = tree;
      copy.push(val);
      // 树枝节点 计算路径的总和
      if (!left && !right) {
        const sums = copy.reduce((a, b) => a + b);
        if (sums === sum) {
          res.push(copy);
        }
      } else {
        left && reduceMap(left, copy);
        right && reduceMap(right, copy);
      }
    }
  };
  reduceMap(root, []);
  return res;
};
console.log(
  pathSum(
    arr2Tree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]), 22
  )
);//[[5,4,11,2], [5,8,4,5]]