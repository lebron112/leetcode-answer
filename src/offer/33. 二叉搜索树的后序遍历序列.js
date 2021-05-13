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
var verifyPostorder = function (postorder) {
  const stack = [];
  const root = stack.pop();

};