/* 给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点。

 

示例 1：


输入：root = [3,9,20,null,null,15,7]
输出：2
示例 2：

输入：root = [2,null,3,null,4,null,5,null,6]
输出：5
 

提示：

树中节点数的范围在 [0, 105] 内
-1000 <= Node.val <= 1000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-depth-of-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 递归即可，根据题意，左右子节点都不存在的最小层，
// 每次归到下一层层数+1，判断是否有左右节点，没有则说明遍历到了数的枝头上，记录进数组内，最后数组内找出最小数就是最小的深度
var minDepth = function (root) {
  if (!root) return 0;
  const min = [];
  const deep = (tree, d) => {
    if (tree) {
      const { left, right } = tree;
      if (!left && !right) {
        min.push(d);
      } else {
        left && deep(left, d + 1);
        right && deep(right, d + 1);
      }
    }
  };
  deep(root, 1);
  return Math.min(...min);
};