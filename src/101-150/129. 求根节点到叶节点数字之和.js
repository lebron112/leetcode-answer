/* 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
每条从根节点到叶节点的路径都代表一个数字：

例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
计算从根节点到叶节点生成的 所有数字之和 。

叶节点 是指没有子节点的节点。

 

示例 1：


输入：root = [1,2,3]
输出：25
解释：
从根到叶子节点路径 1->2 代表数字 12
从根到叶子节点路径 1->3 代表数字 13
因此，数字总和 = 12 + 13 = 25
示例 2：


输入：root = [4,9,0,5,1]
输出：1026
解释：
从根到叶子节点路径 4->9->5 代表数字 495
从根到叶子节点路径 4->9->1 代表数字 491
从根到叶子节点路径 4->0 代表数字 40
因此，数字总和 = 495 + 491 + 40 = 1026
 

提示：

树中节点的数目在范围 [1, 1000] 内
0 <= Node.val <= 9
树的深度不超过 10

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sum-root-to-leaf-numbers
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
 * @return {number}
 */
// 递归+计算即可
var sumNumbers = function (root) {
  const nums = [];
  let max = 0;
  const reduceNode = (node, arr) => {
    const copyArr = [...arr];
    if (node) {
      const { left, right, val } = node;
      copyArr.unshift(val);
      // 递归到没有左右节点时，说明时叶子节点
      if (!left && !right) {
        max = Math.max(max, copyArr.length);
        return nums.push(copyArr);
      }
      reduceNode(left, copyArr);
      reduceNode(right, copyArr);
    }
  };
  reduceNode(root, []);
  let sum = 0;
  for (let i = 0; i < max; i++) {
    nums.forEach(item => {
      if (item[i]) {
        sum += item[i] * Math.pow(10, i);
      }
    });
  }
  return sum;
};

console.log(sumNumbers({
  val: 4,
  left: {
    val: 9,
    left: { val: 5 },
    right: { val: 1 }
  },
  right: { val: 0 }
}))