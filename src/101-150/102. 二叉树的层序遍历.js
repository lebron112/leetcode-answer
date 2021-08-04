/* 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

 

示例：
二叉树：[3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其层序遍历结果：

[
  [3],
  [9,20],
  [15,7]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal
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
 * @return {number[][]}
 */
// 递归
var levelOrder = function (root) {
  const arr = [];
  const mapTree = (tree, index) => {
    if (tree) {
      const { val, left, right } = tree;
      if (!arr[index]) {
        arr[index] = [];
      }
      arr[index].push(val);
      mapTree(left, index + 1);
      mapTree(right, index + 1);
    }
  };
  mapTree(root, 0)
  return arr;
};


/*
  利用队列从上向下进行广度遍历，
  可以得知，二叉树的广度遍历用队列，深度遍历用栈
 */
var levelOrder2 = function (root) {
  const arr = [root];
  if (!root) return [];
  const res = [];
  while (arr.length) {
    res.push([]);
    // 记录每一层的数量
    let len = arr.length;
    // 到层数用完时， 说明要要入下一层了，那么arr的长度，就是当前层数的总叶子数
    while (len--) {
      // 取出队头第一个值
      const top = arr.shift();
      const { val, left, right } = top;
      res[res.length - 1].push(val);
      // 丢入队尾
      left && arr.push(left);
      right && arr.push(right);
    }
  }
  return res;
};