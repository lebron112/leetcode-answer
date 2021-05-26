/* 输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

 

示例 1:

给定二叉树 [3,9,20,null,null,15,7]

    3
   / \
  9  20
    /  \
   15   7
返回 true 。

示例 2:

给定二叉树 [1,2,2,3,3,null,null,4,4]

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
返回 false 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof
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
 * @return {boolean}
 */
/* 
自底向上递归方法：如果一棵二叉树是平衡二叉树，它必须满足3个条件：
它自己根节点的左右子树深度差不超过1
它的左子树是平衡二叉树
它的右子树是平衡二叉树
*/

var isBalanced = function (root) {
  if (!root) return true;
  const checkDeep = (root) => {
    if (!root) return 0;
    const { left, right } = root;
    return Math.max(checkDeep(left), checkDeep(right)) + 1;
  }
  const { left, right } = root;
  return Math.abs(checkDeep(left) - checkDeep(right)) <= 1 && isBalanced(left) && isBalanced(right);
};