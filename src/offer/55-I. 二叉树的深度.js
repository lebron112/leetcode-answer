/* 输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

例如：

给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。

 

提示：

节点总数 <= 10000
注意：本题与主站 104 题相同：https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof
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
// 递归
var maxDepth = function (root) {
  let deep = 0;
  const reduceDeep = (node, dp) => {
    if (node) {
      const { left, right } = node;
      dp++;
      deep = Math.max(deep, dp);
      reduceDeep(left, dp);
      reduceDeep(right, dp);
    }
  }
  reduceDeep(root, 0);
  return deep;
};
// 非递归
var maxDepth2 = function (root) {
  let deep = 0;
  if (!root) return deep;
  const stack = [[root, 1]];
  while (stack.length) {
    const [node, dp] = stack.pop();
    const { left, right } = node;
    deep = Math.max(deep, dp)
    left && stack.push([left, dp + 1])
    right && stack.push([right, dp + 1]);
  }
  return deep;
};
