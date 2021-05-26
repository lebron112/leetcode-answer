/* 在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

 

示例 1:

输入: 
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 12
解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物
 

提示：

0 < grid.length <= 200
0 < grid[0].length <= 200

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
  const res = [[]];
  let y = 1;
  let x = 0;
  grid[0].forEach((item, index) => {
    res[0][index] = index === 0 ? item : (item + res[0][index - 1]);
    x++;
  });
  for (; y < grid.length; y++) {
    if (!res[y]) {
      res[y] = [res[y - 1][0] + grid[y][0]];
    }
    x = 1;
    for (; x < grid[y].length; x++) {
      res[y][x] = Math.max(grid[y][x] + res[y - 1][x], grid[y][x] + res[y][x - 1]);
    }
  }
  return res[y - 1][x - 1];
};
console.log(maxValue([[0]]))
console.log(maxValue([[1,3,1],[1,5,1],[4,2,1]]))