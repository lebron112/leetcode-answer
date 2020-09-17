/* 给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

示例:

输入:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
输出: 6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximal-rectangle
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {character[][]} matrix
 * @return {number}
 */
// 看做是84题的变形题目
// 初始化用一个height 第一行的值
// 接下来每一行遇到1就在原索引上+1 否则置为0
// 算出height后计算高度
var maximalRectangle = function (matrix) {
  if (!matrix.length) return 0;
  let max = 0;
  let height = matrix[0].map(item => {
    max = Math.max(max, Number(item));
    return Number(item);
  });

  var largestRectangleArea = function (heights) {
    if (!heights.length) return 0;
    let maxSize = heights[0];
    const findSize = (index) => {
      let left = index - 1;
      let right = index;
      const val = heights[index];
      while (heights[left] && heights[left] >= val) {
        left--;
      }
      while (heights[right] && heights[right] >= val) {
        right++;
      }
      right--;
      maxSize = Math.max((right - left) * val, maxSize);
    };
    for (let index = 0; index < heights.length; index++) {
      findSize(index);
    }
    return maxSize;
  };
  max = Math.max(largestRectangleArea(height), max);
  for (let y = 1; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      height[x] = matrix[y][x] === '1' ? (height[x] + 1) : 0;
    }
    max = Math.max(largestRectangleArea(height), max);
  }
  return max;
};
console.log(maximalRectangle([
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"]
]));
/*[
  [1,0,1,0,0],
  [2,0,2,2,3],
  [3,2,3,4,6],
  [4,0,0,3,0]
]*/