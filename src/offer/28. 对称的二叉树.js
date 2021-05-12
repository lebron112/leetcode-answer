/* 请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

    1
   / \
  2   2
 / \ / \
3  4 4  3
但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3

 

示例 1：

输入：root = [1,2,2,3,4,4,3]
输出：true
示例 2：

输入：root = [1,2,2,null,3,null,3]
输出：false
 

限制：

0 <= 节点个数 <= 1000

注意：本题与主站 101 题相同：https://leetcode-cn.com/problems/symmetric-tree/

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof
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
var isSymmetric = function (root) {
  const check = i => i !== null;
  if (!check(root)) return true;
  const checkout = (left, right) => {
    if (check(left) && check(right)) {
      if (left.val === right.val) {
        return checkout(left.left, right.right) && checkout(left.right, right.left)
      } else {
        return false;
      }
    } else if (check(left) || check(right)) {
      return false;
    } else {
      return true;
    }
  };
  const { left, right } = root;
  if (check(left) && check(right)) {
    if (left.val === right.val) {
      return checkout(left.left, right.right) && checkout(left.right, right.left)
    } else {
      return false;
    }
  } else if (check(left) || check(right)) {
    return false;
  } else {
    return true;
  }
};