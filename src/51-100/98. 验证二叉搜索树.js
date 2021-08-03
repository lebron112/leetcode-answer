/* 给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。
示例 1:

输入:
    2
   / \
  1   3
输出: true
示例 2:

输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/validate-binary-search-tree
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
 * @return {boolean}
 */

const { arr2Tree } = require("../utils");

// 二叉搜索树，左子树小于根节点，右字数大于跟节点
// root 一定会有值

/*
  节点的左子树只包含小于当前节点的数。
  节点的右子树只包含大于当前节点的数。
  所有左子树和右子树自身必须也是二叉搜索树
  根据这个规则，则只需要进行中序遍历，并且验证中序遍历是递增的
 */
var isValidBST = function (root) {
  const arr = [];
  // 中序遍历
  const order = (tree) => {
    if (tree) {
      const { val, left, right } = tree;
      order(left);
      arr.push(val);
      order(right);
    }
  };
  order(root);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] <= arr[i]) {
      return false;
    }
  }
  return true;
};

console.log(isValidBST(arr2Tree([2, 2, 2])))
console.log(isValidBST(arr2Tree([5, 4, 6, null, null, 3, 7])))