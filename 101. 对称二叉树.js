/* 
给定一个二叉树，检查它是否是镜像对称的。

 

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

    1
   / \
  2   2
 / \ / \
3  4 4  3
 

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3 
   */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true;
  // 使用递归 判断左右是否相等
  const checkout = (left, right) => {
    if (left === null && right === null) {
      return true;
    }
    if (left === null || right === null) return false;
    if (left.val === right.val) {
      return checkout(left.left, right.right) && checkout(left.right, right.left);
    } else {
      return false;
    }
  };
  if (root.left !== null && root.right !== null) {
    return checkout(root.left, root.right);
  } else if (root.left === null && root.right === null) {
    return true;
  } else if (root.left === null || root.right === null) {
    return false;
  }
  return true;
};