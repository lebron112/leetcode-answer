/* 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。

参考以下这颗二叉搜索树：

示例 1：
     5
    / \
   3   2
  / \
 1   6
输入: [1,6,3,2,5]
输出: false
示例 2：
      5
    /   \
   2     6
  / \   / \
 1   3 4   7
 [1,3,2,4,7,6,5] true
输入: [1,3,2,6,5]
输出: true

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} postorder
 * @return {boolean}
 */

// 二叉搜索树的左子树均小于根节点，右子树均大于根节点。
// 先找出跟节点，即最后一个，
// 然后找出左子树和右子树, 右子树是循环开始,找到一个比跟节点大的 就是右子树
// 然后判断右子树的值全部大于跟节点集合,
// 满足条件就继续递归
// 直到没有或只有一个是根节点, 直接true
const { testFn } = require('../utils');
var verifyPostorder = function (postorder) {
  if (postorder.length < 2) return true;
  let i = 0;
  const len = postorder.length - 1;
  const root = postorder[len];
  for (; i < len; i++) {
    if (postorder[i] > root) break;
  }
  const left = postorder.slice(0, i);
  const right = postorder.slice(i, len);
  const isOk = right.every(item => item > root);
  if (isOk) {
    return verifyPostorder(left) && verifyPostorder(right);
  } else {
    return false;
  }
};
testFn(verifyPostorder, [1, 3, 2, 4, 7, 6, 5]);
testFn(verifyPostorder, [1, 3, 2, 6, 5]);