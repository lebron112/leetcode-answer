/* 给定一个三角形 triangle ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

 

示例 1：

输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
      2
     3 4
    6 5 7
   4 1 8 3
//9 9 9 1 1 
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
示例 2：

输入：triangle = [[-10]]
输出：-10

你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/triangle
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[][]} triangle
 * @return {number}
 */

// 递归法，最后一个用例超出最大内存了
var minimumTotal2 = function (triangle) {
  const list = [];
  const bfs = (level, index, sum) => {
    if (level < triangle.length - 1) {
      const next = triangle[level + 1][index];
      const next2 = triangle[level + 1][index + 1];
      bfs(level + 1, index, next + sum);
      bfs(level + 1, index + 1, next2 + sum);
    } else {
      list.push(sum);
    }
  };
  bfs(0, 0, triangle[0][0]);
  return Math.min(...list);
};



/*
      2
     3 4
    6 5 7
   4 1 8 3
//9 9 9 1 1  
 */
// 动态规划，原地修改，下一项的和最小值，为上一行的索引对应索引位 i i-1和当前数的和，最后取出最后一行的最小一行即可
var minimumTotal = function (triangle) {
  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      // 边界情况第一项，前一行没有 triangle[i - 1][ - 1]
      if (j === 0) {
        triangle[i][j] = triangle[i][j] + triangle[i - 1][j];
        // 边界情况最后一项，前一行没有triangle[i - 1][j]
      } else if (j === triangle[i].length - 1) {
        triangle[i][j] = triangle[i][j] + triangle[i - 1][j - 1];
      } else {
        // 取上一行小的那个值相加
        triangle[i][j] = triangle[i][j] + Math.min(triangle[i - 1][j - 1], triangle[i - 1][j])
      }
    }
  }
  return Math.min(...triangle[triangle.length - 1]);
};
