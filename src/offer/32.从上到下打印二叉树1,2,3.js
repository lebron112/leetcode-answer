/* 从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

 

例如:
给定二叉树: [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回：

[3,9,20,15,7]
 

提示：

节点总数 <= 1000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof
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
 * @return {number[]}
 */
// 不能直接push 要和第二题一样处理
 var levelOrder = function (root) {
  const res = [];
  const mapNode = (node, i) => {
    if (node) {
      const { val, left, right } = node;
      if(!res[i]){
        res[i] = []
      }
      res[i].push(val);
      mapNode(left, i + 1);
      mapNode(right, i + 1);
    }
  };
  mapNode(root, 0);
  return res.flat();
};

var levelOrder2= function (root) {
  let result = [];
  const mapNode = (root, index) => {
    if (root) {
      if (!result[index]) {
        result[index] = [];
      }
      const { val, left, right } = root;
      result.push(val);
      map(left, index + 1);
      map(right, index + 1);
    }
  };
  mapNode(root, 0);
  return result;
};

var levelOrder3= function (root) {
  const res = [];
  const mapNode = (node, i) => {
    if (node) {
      const { val, left, right } = node;
      if (!res[i]) {
        res[i] = []
      }
      i % 2 ? res[i].unshift(val) : res[i].push(val);
      mapNode(left, i + 1);
      mapNode(right, i + 1);
    }
  };
  mapNode(root, 0);
  return res;
};