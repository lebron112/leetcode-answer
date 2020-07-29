/* 
给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

说明: 叶子节点是指没有子节点的节点。

示例: 
给定如下二叉树，以及目标和 sum = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1
返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/path-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
// 利用递归 查找出所有可能的值 当已经有值时 则不需要继续递归
var hasPathSum = function (root, sum) {
  if (!root) return false;
  let res;
  const reduceMap = (left, right, val) => {
    if (res === sum) return;
    if (left) {
      const nextVal = val + left.val;
      if (nextVal === sum && left.left === null && left.right === null) {
        res = sum;
        return true;
      }
      reduceMap(left.left, left.right, nextVal)
    }
    if (right) {
      const nextVal = val + right.val;
      if (nextVal === sum && right.left === null && right.right === null) {
        res = sum;
        return true;
      }
      reduceMap(right.left, right.right, nextVal);
    }
    return false;
  };
  reduceMap(root.left, root.right, root.val);
  if (!res && !root.left && !root.right) res = root.val;
  return res === sum;
};