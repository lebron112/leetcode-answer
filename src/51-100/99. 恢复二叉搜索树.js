/* 给你二叉搜索树的根节点 root ，该树中的两个节点被错误地交换。请在不改变其结构的情况下，恢复这棵树。

进阶：使用 O(n) 空间复杂度的解法很容易实现。你能想出一个只使用常数空间的解决方案吗？

 

示例 1：


输入：root = [1,3,null,null,2]
输出：[3,1,null,null,2]
解释：3 不能是 1 左孩子，因为 3 > 1 。交换 1 和 3 使二叉搜索树有效。
示例 2：


输入：root = [3,1,4,null,null,2]
输出：[2,1,4,null,null,3]
解释：2 不能在 3 的右子树中，因为 2 < 3 。交换 2 和 3 使二叉搜索树有效。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/recover-binary-search-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

const { testFn, arr2Tree } = require("../utils");

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
 * @return {void} Do not return anything, modify root in-place instead.
 */
/* 需要原地交换，不return 
  进行中序遍历
*/
var recoverTree = function (root) {
  const arr = [];
  let find = null;
  // 中序遍历
  const order = (tree) => {
    if (tree) {
      const { left, right } = tree;
      order(left);
      arr.push(tree);
      order(right);
    }
  };
  order(root);
  // 找到索引及
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1].val <= arr[i].val) {
      find = { cur: arr[i], i };
      break;
    }
  }
  console.log(arr.map(item => item.val))
  if (arr.length === 2) {
    const v = arr[0].val;
    arr[0].val = arr[1].val;
    arr[1].val = v;
    return
  }
  // 尝试进行两两交换 双向判断，把原来的位置用 arr[i]，arr[i]的位置用cur
  // 判断更换位置后 arr[i] > arr[index - 1] && arr[i] < arr[index + 1]
  // 同时 需要处理边界情况 cur在起始或者末尾的位置 cur不可能是最后一个值 cur和 arr[i]是连续的 arr[i]是最后一个值
  for (let i = 0; i < arr.length; i++) {
    const { i: index, cur } = find;
    const cNext = arr[index + 1];
    const cPre = arr[index - 1];
    const nNext = arr[i + 1];
    const n = arr[i];
    if (n.val !== cur.val) {
      if (index === 0) {
        if (n.val < cNext.val || nNext.val > cur.val && cur.val > n.val) {
          const v = n.val;
          n.val = cur.val;
          cur.val = v;
          break;
        }
      } else if (i === arr.length - 1) {
        const v = n.val;
        n.val = cur.val;
        cur.val = v;
        break;
      } else if (n.val > cPre.val && n.val < cNext.val || nNext.val > cur.val && cur.val > n.val) {
        const v = n.val;
        n.val = cur.val;
        cur.val = v;
        break;
      }
    }
  }
  console.log(arr.map(item => item.val))
};
testFn(recoverTree, arr2Tree([3, 1, 2]))
testFn(recoverTree, arr2Tree([1, 3, null, null, 2]))
testFn(recoverTree, arr2Tree([3, 1, 4, null, null, 2]))
testFn(recoverTree, arr2Tree([0, 1]))
testFn(recoverTree, arr2Tree([1, 2, 3]))
testFn(recoverTree, arr2Tree([146, 71, -13, 55, null, 231, 399, 321, null, null, null, null, null, -33]))