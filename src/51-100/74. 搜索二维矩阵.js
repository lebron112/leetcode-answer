/* 74. 搜索二维矩阵
编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

每行中的整数从左到右按升序排列。
每行的第一个整数大于前一行的最后一个整数。
示例 1:

输入:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 3
输出: true
示例 2:

输入:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 13
输出: false */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// 因为已排序好 所以直接二分查找
var searchMatrix = function (matrix, target) {
  const twoPadFind = (arr) => {
    if (arr[arr.length - 1] < target) return false;
    // 取中间值
    const mid = Math.floor((arr.length - 1) / 2);
    if (arr[mid] === target) {
      return true;
    } else {
      // 未找到 只剩一个值 说明找不到了
      if (arr.length <= 1) return false
      // 目标值大于中间值？取右边的 否则取左边的再进行查找
      // if (target > arr[mid]) {
      //   return twoPadFind(arr.slice(mid + 1));
      // } else {
      //   return twoPadFind(arr.slice(0, mid));
      // }
      return twoPadFind(target > arr[mid] ? arr.slice(mid + 1) : arr.slice(0, mid));
    }
  };
  for (let i = 0; i < matrix.length; i++) {
    const len = matrix[i].length;
    // 找到范围
    if (target >= matrix[i][0] && target <= matrix[i][len - 1]) {
      return twoPadFind(matrix[i]);
    }
  }
  return false;
};


console.log(searchMatrix([
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
], 34));
