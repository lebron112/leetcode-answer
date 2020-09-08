/* 给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。

示例 1:

输入: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
输出: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
示例 2:

输入: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
输出: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
进阶:

一个直接的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
你能想出一个常数空间的解决方案吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/set-matrix-zeroes
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 用一个hash有0的 xy 值 结束后再遍历即可
var setZeroes = function (matrix) {
  const hash = [];
  const toZero = (x, y) => {
    for (let i = 0, j = matrix[y].length - 1; i <= j;) {
      matrix[y][i] = 0;
      matrix[y][j] = 0;
      i++;
      j--;
    }
    for (let i = 0, j = matrix.length - 1; i <= j;) {
      matrix[i][x] = 0;
      matrix[j][x] = 0;
      i++;
      j--;
    }
  };
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 0) {
        hash.push([x, y]);
      }
    }
  }
  for (let i = 0; i < hash.length; i++) {
    toZero(hash[i][0], hash[i][1]);
  }
  return matrix;
};

// console.log(setZeroes([
//   [1, 1, 1],
//   [1, 0, 1],
//   [1, 1, 1]
// ]));
console.log(setZeroes([
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5]
]));