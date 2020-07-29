/* 给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3  */

// Definition for a binary tree node.
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var i = 0;
var maxDepth = function (root) {
  if (!root) return 0;
  i++;
  let a = maxDepth(root.left);
  let b = maxDepth(root.right);
  return Math.max(a, b) + 1;
};

const f = maxDepth(
  {
    val: 3,
    right: {
      val: 20,
      right: {
        val: 15,
        left: {
          val: 9
        }
      },
      left: {
        val: 7,
      }
    },
    left: {
      val: 9,
    }
  }
);
console.log(f);