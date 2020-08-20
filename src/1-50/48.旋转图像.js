/* 给定一个 n × n 的二维矩阵表示一个图像。

将图像顺时针旋转 90 度。

说明：

你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

示例 1:

给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
示例 2:

给定 matrix =
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
], 

原地旋转输入矩阵，使其变为:
[
  [13, 9, 5, 1],
  [14, 10, 6, 2],
  [15, 11, 7, 3],
  [16, 12, 8, 4]
] */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

//  原地旋转 
var rotate = function (matrix) {
  let index = 0;
  let length = matrix.length - 1;
  // 递归函数
  const tranFn = (matrix, x, y, maxNum) => {
    let i = 0;
    // 2个变量  轮流记录更换后被替换下的那个值
    let old;
    let tran = matrix[y][x];
    // 定义4个方向 ↑←↓→
    // →
    if (i === 0) {
      old = matrix[x][maxNum]; // ↓ 最右从右至下
      matrix[x][maxNum] = tran;  // 换值操作A
      i++;
    }
    // ↓
    if (i === 1) {
      tran = matrix[maxNum][length - x]; // ← 最下一行从右向左
      matrix[maxNum][length - x] = old; // 换值操作B
      i++;
    }
    // ←
    if (i === 2) {
      old = matrix[length - x][y];// ↑ 最左一行从下往上
      matrix[length - x][y] = tran; // 换值操作C
      i++;
    }
    // ↑
    if (i === 3) {
      matrix[y][x] = old; // → 从右向左第一个  换值操作D
    }
    // 完成一轮交换后 索引递增
    x++;
    // 因为倒序操作AB有倒序操作，横向倒序位已经被改变过值 判断是否到了最大倒序位
    if (x === maxNum) {
      //横向循环完后从 第二行开始， 已换值操作D过 所以从后面那个开始
      index++;
      x = index;
      y++;
      // AB操作的记录倒序最大值要减1
      maxNum--;
    }
    if (y < maxNum) {
      tranFn(matrix, x, y, maxNum);
    }
  }

  return tranFn(matrix, 0, 0, matrix.length - 1);
};

let test1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];
let test2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
let test3 = [
  [1, 2],
  [3, 4]
];
let test4 = [
  [6, 7],
  [10, 11]
];
rotate(test1);
console.log(test1);
rotate(test2);
console.log(test2);
rotate(test3);
console.log(test3); // [[3, 1],[4, 2]]
rotate(test4);
console.log(test4); 