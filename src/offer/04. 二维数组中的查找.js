/* 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

示例:

现有矩阵 matrix 如下：

[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
给定 target = 5，返回 true。

给定 target = 20，返回 false。

 

限制：

0 <= n <= 1000

0 <= m <= 1000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// 最骚写法
var findNumberIn2DArray2 = function (matrix, target) {
  return matrix.flat().includes(target);
};
// 正常操作 →递增 ↓递增 那么右边的那个数 一定比左边的大 比下边的小
// 由此 可以从右上角开始 比在右上角值大就下移否则左移 类似二叉搜索树 直到到达左下角索引越界
var findNumberIn2DArray = function (matrix, target) {
  if (!matrix[0]) return false;
  let y = 0;
  let x = matrix[y].length - 1;
  while (matrix[y] && matrix[y][x] !== undefined) {
    if (matrix[y][x] === target) return true;
    if (target > matrix[y][x]) {
      y ++;
    } else {
      x --;
    }
  }
  return false;
};
const { testFn } = require('../utils');
testFn(findNumberIn2DArray, [
  [1, 1],
], 1)
testFn(findNumberIn2DArray, [
  [-5],
], -5);
testFn(findNumberIn2DArray, [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], 18);//true
testFn(findNumberIn2DArray, [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], 20);//false
testFn(findNumberIn2DArray, [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], 5);//true