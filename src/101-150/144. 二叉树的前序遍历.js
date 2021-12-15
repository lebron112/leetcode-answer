/* 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

 

示例 1：


输入：root = [1,null,2,3]
输出：[1,2,3]
示例 2：

输入：root = []
输出：[]
示例 3：

输入：root = [1]
输出：[1]
示例 4：


输入：root = [1,2]
输出：[1,2]
示例 5：


输入：root = [1,null,2]
输出：[1,2]
 

提示：

树中节点数目在范围 [0, 100] 内
-100 <= Node.val <= 100
 

进阶：递归算法很简单，你可以通过迭代算法完成吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-preorder-traversal
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
 * @return {number[]}
 */
// 递归版本
var preorderTraversalEasy = function (root) {
  const res = [];
  const mapHead = (node) => {
    if (node) {
      const { val, left, right } = node;
      res.push(val);
      mapHead(left);
      mapHead(right);
    }
  };
  mapHead(root);
  return res;
};

// 非递归版本 分左右队列，从左取出最后一个，右取出第一个，但是优先判断有左的进去左循环
var preorderTraversal1 = function (root) {
  const res = [];
  const leftQueue = []; 
  const rightQueue = [];
  root && leftQueue.push(root);
  while (leftQueue.length || rightQueue.length) {
    while (leftQueue.length) {
      const head = leftQueue.shift();
      const { val, left, right } = head;
      res.push(val);
      if (left) leftQueue.push(left);
      if (right) rightQueue.push(right);
    }
    loopRight: while (rightQueue.length) {
      const head = rightQueue.pop();
      const { val, left, right } = head;
      res.push(val);
      if (left) leftQueue.push(left);
      if (right) rightQueue.push(right);
      // 判断左
      if (leftQueue.length) {
        break loopRight;
      }
    }
  }
  return res;
};

// 第二版，优先存入右，可以保证栈顶一直是最左的
const preorderTraversal = (root) => {
  const list = [];
  const res = [];
  root && list.push(root);
  while (list.length) {
    const head = list.pop();
    const { val, left, right } = head;
    res.push(val);
    if (right) list.push(right);
    if (left) list.push(left);
  }
  return res;
};

console.log(preorderTraversal({
  val: 3,
  // left: { val: 1 },
  right: {
    val: 2,
    left: { val: 1 },
    right: { val: 4 }
  }
}));

console.log(preorderTraversal({
  val: 2,
  left: {
    val: 1,
    left: { val: 3 },
  },
  right: {
    val: 4,
  }
}))