class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}
/** 数组转二叉树  */
const arrToTree = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('deserialize(): expect parameter to be an array, actual: ' + typeof array);
  }
  if (array.length === 0) {
    return null;
  }
  // 拷贝数组
  const remainingValues = [...array];
  // 一个节点队列
  const nodeQueue = [];
  const rootValue = remainingValues.shift(); //取第一个数字为二叉树顶层节点
  const tree = new TreeNode(rootValue);
  nodeQueue.push(tree); //丢入栈中
  while (remainingValues.length > 0) {
    // 从左往右 每次循环取出1个队列 然后从拷贝数组头队列取出2个元素
    const node = nodeQueue.shift(); //从队列取出第一个节点
    const leftValue = remainingValues.shift(); // 从拷贝数字从出第一个数字
    // 如果去除的数字不是null 则丢入队列尾
    if (leftValue !== null && leftValue !== undefined) {
      node.left = new TreeNode(leftValue);
      nodeQueue.push(node.left);
    }
    // 右边一样
    const rightValue = remainingValues.shift();
    if (rightValue !== null && rightValue !== undefined) {
      node.right = new TreeNode(rightValue);
      nodeQueue.push(node.right);
    }
  }
  return tree;
};

const testFn = (fn, ...args) => {
  console.log(fn(...args));
};
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
const arrToNode = (array) => {
  if (!array.length) return null;
  let next = new Node(array.shift());
  let head = next;
  while (array.length) {
    const node = new Node(array.shift());
    next.next = node;
    next = node;
  }
  return head;
}

const nodeToArr = (node) => {
  const res = [];
  while (node) {
    res.push(node.val);
    node = node.next;
  }
  return res;
};

module.exports = {
  nodeToArr,
  arrToNode,
  arrToTree,
  testFn,
};
