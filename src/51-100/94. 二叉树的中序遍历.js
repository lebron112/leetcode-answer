/* 给定一个二叉树的根节点 root ，返回它的 中序 遍历。
输入：root = [1,null,2,3]
输出：[1,3,2]
示例 2：

输入：root = []
输出：[]
示例 3：

输入：root = [1]
输出：[1]
示例 4：


输入：root = [1,2]
输出：[2,1]
示例 5：


输入：root = [1,null,2]
输出：[1,2]
 

提示：

树中节点数目在范围 [0, 100] 内
-100 <= Node.val <= 100
 

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-inorder-traversal
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
 * @return {number[]}
 */
// 中序遍历 首先访问左子树，再访问跟子树，最后再访问右子数
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归
var inorderTraversal = function (root) {
  const res = [];
  const order = (node) => {
    if (node) {
      const { left, right, val } = node;
      order(left);
      res.push(val);
      order(right);
    }
  };
  order(root)
  return res;
};
// 迭代
var inorderTraversal2 = function (root) {
  const stack = [];
  const res = [];
  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    const head = stack.pop();
    res.push(head.val);
    root = head.right;
  }
  return res;
};