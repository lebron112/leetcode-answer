/* 给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。

 

示例 1：


输入：root = [3,9,20,null,null,15,7]
输出：true
示例 2：


输入：root = [1,2,2,3,3,null,null,4,4]
输出：false
示例 3：

输入：root = []
输出：true
 

提示：

树中的节点数在范围 [0, 5000] 内
-104 <= Node.val <= 104
通过次数236,159提交次数420,602

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/balanced-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 任一节点对应的两棵子树的最大高度差为1，因此它也被称为高度平衡树。

// 记录左右最深的节点，并递归判断是否高度差小于2
var isBalanced = function (root) {
  if (!root) return true;
  const { left, right } = root;
  let l = 1;
  let r = 1;
  const checkDeep = (tree, deep, fn) => {
    if (tree) {
      let i = deep + 1;
      const { left, right } = tree;
      fn(i);
      checkDeep(left, i, fn);
      checkDeep(right, i,fn);
    }
  };
  checkDeep(left, 1, (v) => {
    l = Math.max(l, v)
  });
  checkDeep(right, 1, (v) => {
    r = Math.max(r, v)
  });
  return Math.abs(l - r) < 2 && isBalanced(left) && isBalanced(right);
};