/* 根据一棵树的中序遍历与后序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

中序遍历 inorder = [9,3,15,20,7]
后序遍历 postorder = [9,15,7,20,3]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7
通过次数122,164提交次数169,595

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
/* 
  递归，类似105，反着来，后序遍历的最后一个是树的头节点
 */
var buildTree = function (inorder, postorder) {
  if (!inorder.length || !postorder.length) return null;
  // 取后序遍历最后一个构建树
  const v = postorder.pop();
  const head = new TreeNode(v);
  const i = inorder.indexOf(v);
  const left = inorder.slice(0, i);
  const right = inorder.slice(i + 1);
  head.right = buildTree(right, postorder);
  head.left = buildTree(left, postorder);
  return head;
};