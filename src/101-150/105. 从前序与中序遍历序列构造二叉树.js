/* 给定一棵树的前序遍历 preorder 与中序遍历  inorder。请构造二叉树并返回其根节点。

 

示例 1:


Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
示例 2:

Input: preorder = [-1], inorder = [-1]
Output: [-1]
 

提示:

1 <= preorder.length <= 3000
inorder.length == preorder.length
-3000 <= preorder[i], inorder[i] <= 3000
preorder 和 inorder 均无重复元素
inorder 均出现在 preorder
preorder 保证为二叉树的前序遍历序列
inorder 保证为二叉树的中序遍历序列

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
/*
  递归法
  从前序遍历取出第一个前序遍历的点，创建字数head
  从中序遍历中找到这个头的索引位，左边为左子树a，右边为右子树
  那么head的左子数，为下一次递归左子数的结果（下一次递归的前序遍历为去除右字数的结果，中序遍历为左子树）
  右子数，为下一次递归右子数的结果（下一次递归的前序遍历为去除左字数的结果，中序遍历为右子树）
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length) return null;
  const root = preorder.shift();
  let i = 0;
  for (; i < inorder.length; i++) {
    if (inorder[i] === root) {
      break;
    }
  }
  let left = inorder.slice(0, i);
  let right = inorder.slice(i + 1);
  let head = new TreeNode(root);
  // 下一次递归的前序遍历为去除右字数的结果
  let np = preorder.filter(item => left.includes(item));
   // 下一次递归的前序遍历为去除左字数的结果
  let nr =  preorder.filter(item => right.includes(item));
  head.left = buildTree(np, left);
  head.right = buildTree(nr, right);
  return head;
};

/* 递归优化  
  无需删除前序遍历的左右分区子树，因为是重复操作
*/
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;
  const root = preorder.shift();
  let i = 0;
  for (; i < inorder.length; i++) {
    if (inorder[i] === root) {
      break;
    }
  }
  let left = inorder.slice(0, i);
  let right = inorder.slice(i + 1);
  let head = new TreeNode(root);
  head.left = buildTree(preorder, left);
  head.right = buildTree(preorder, right);
  return head;
};