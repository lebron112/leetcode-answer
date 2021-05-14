/* 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

 

示例 1：

输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
示例 2：

输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 

限制：

0 <= matrix.length <= 100
0 <= matrix[i].length <= 100
注意：本题与主站 54 题相同：https://leetcode-cn.com/problems/spiral-matrix/

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let type = 1; // 1 2 3 4
  let i = 0;
  let j = 0;
  if (!matrix[0]) return [];
  let res = [];
  const dir = {
    left: 0,
    down: 0,
    right: 0,
    up: 1,
  };
  if (matrix[0].length === 1) return matrix.flat();
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      res.push(matrix[j][i]);
      if (type === 1) {
        i++;
        if (i === matrix[j].length - 1 - dir.left) {
          dir.left++;
          type = 2;
        }
      } else if (type === 2) {
        j++;
        if (j === matrix.length - 1 - dir.down) {
          dir.down++;
          type = 3;
        }
      } else if (type === 3) {
        i--;
        if (i === dir.right) {
          dir.right++;
          type = 4;
        }
      } else {
        j--;
        if (j === dir.up) {
          dir.up++;
          type = 1;
        }
      }
    }
  }
  return res;
};

const { testFn } = require('../utils');

testFn(spiralOrder, [
  [3],
  [2]]);

testFn(spiralOrder, [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]]);

testFn(spiralOrder, [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]])