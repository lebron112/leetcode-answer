/* 路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

路径和 是路径中各节点值的总和。

给你一个二叉树的根节点 root ，返回其 最大路径和 。

 

示例 1：


输入：root = [1,2,3]
输出：6
解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
示例 2：


输入：root = [-10,9,20,null,null,15,7]
输出：42
解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
 

提示：

树中节点数目范围是 [1, 3 * 104]
-1000 <= Node.val <= 1000
通过次数176,776提交次数396,116

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-maximum-path-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
// 对于所有路径，不一定要到2个端
// 有一下情况
// 1，单节点，2，子叶，3，路径只是一段子树，4，左右路径
// 路径并非时一定要走完的情况

var maxPathSum = function (root) {
  // 记录最大值路径
  let rood = -Infinity;
  const map = (node) => {
    if (!node) return null;
    const { val, left, right } = node;
    let maxLeft, maxRight;
    const res = [val];
    // 如果有左子树，更新最大路径值
    if (left) {
      maxLeft = map(left);
      rood = Math.max(maxLeft, rood);
    }
    // 如果有右子树，更新最大路径值
    if (right) {
      maxRight = map(right);
      rood = Math.max(maxRight, rood);
    }
    // 更新左右最大子树的和
    const addL = val + (maxLeft || 0);
    const addR = val + (maxRight || 0);
    res.push(addL, addR);
    // 更新左右+跟的最大路径值
    rood = Math.max( val + (maxLeft || 0) + (maxRight || 0),rood);
    return Math.max(...res);
  }
  const v = map(root);
  return Math.max(rood, v);
};

console.log(maxPathSum({
  val: 1,
  left: {
    val: -2,
    right: { val: 3, }
  },
  right: { val: -3 },
})) // 3

console.log(maxPathSum({
  val: 1,
  left: {
    val: -2,
    left: { val: 1, },
    right: {
      val: 3,
      right: { val: -1 }
    }
  },
  right: {
    val: -3
  },
})) // 3
console.log(maxPathSum({
  val: 1,
  left: { val: -2 },
  right: { val: 3 },
})) // 4

console.log(maxPathSum({
  val: -1,
  left: { val: -2 },
  right: { val: -3 },
})) // -1
console.log(maxPathSum({
  val: 1,
  left: { val: 2 },
  right: { val: 3 },
})) //6

console.log(maxPathSum({
  val: -3,
})) //-3

console.log(maxPathSum({
  val: -10,
  left: { val: 9 },
  right: {
    val: 20,
    left: { val: 15 },
    right: { val: 7 },
  },
})) //42

console.log(maxPathSum({
  val: 10,
  left: { val: 9 },
  right: {
    val: 20,
    left: { val: 15 },
    right: { val: 7 },
  },
})) //54

console.log(maxPathSum({
  val: -10,
  left: { val: -9 },
  right: {
    val: -20,
    left: { val: 15 },
    right: { val: 7 },
  },
})) //15

console.log(maxPathSum({
  val: 10,
  left: { val: -9 },
  right: {
    val: 20,
    left: { val: -15 },
    right: { val: -7 },
  },
})) //30