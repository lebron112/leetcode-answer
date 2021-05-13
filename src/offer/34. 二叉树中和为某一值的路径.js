/* 
输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。

示例:
给定如下二叉树，以及目标和 target = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
返回:

[
   [5,4,11,2],
   [5,8,4,5]
]

提示：

节点总数 <= 10000
注意：本题与主站 113 题相同：https://leetcode-cn.com/problems/path-sum-ii/

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof
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
 * @param {number} target
 * @return {number[][]}
 */
//  dfs搜索树， 要注意 值会有正数和负数，所以只需要在路径结束是判断 同时要用一个hash去处理重复的情况
var pathSum = function (root, target) {
  if (!root) return [];
  const res = [];
  const hash = {};
  const dfs = (node, arr, leftOrRight, other) => {
    if (!node && !other) {
      let total = 0;
      let key = '';
      let r = [];
      arr.forEach(a => {
        key += `${a.dir}${a.val}&`;
        r.push(a.val);
        total += a.val;
      });
      if (total === target) {
        if (!hash[key]) {
          hash[key] = 1;
          arr.length > 1 && res.push(r);
        }
      }
      return;
    }
    if (node) {
      const { val, left, right } = node;
      const copy = [...arr, { val, dir: leftOrRight }];
      dfs(left, copy, 'a', right);
      dfs(right, copy, 'b', left);
    }
  };
  const { val, left, right } = root;
  if (!left && !right) {
    if (val === target) res.push([val]);
  }
  dfs(root, [], '');
  return res;
};