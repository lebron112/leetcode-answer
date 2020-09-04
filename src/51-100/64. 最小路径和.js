/* 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

示例:

输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-path-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
// 暴力dfs 先遍历所有的路径 1记为向左 右记为向下 遍历出所有路径后计算出最小的 不可取 超时
var minPathSum = function (grid) {
  let max = null;
  const i = grid[0].length - 1;
  const j = grid.length - 1;
  const pathStore = {};
  const dfs = (x, y, sum, path) => {
    if (path) {
      if (!pathStore[path]) {
        console.log(path);
        pathStore[path] = 1;
      } else {
        return;
      }
    }
    sum += grid[y][x];
    if (sum && max && sum > max) {
      return;
    }
    if (x === i && y === j) {
      max = max ? Math.min(sum, max) : sum;
      return;
    }
    if (x < i) {
      let nextX = x + 1;
      dfs(nextX, y, sum, path + '1');
    } else {
      if (y < j) {
        let nextY = y + 1;
        dfs(x, nextY, sum, path + '0');
      }
    }
    if (y < j) {
      let nextY = y + 1;
      dfs(x, nextY, sum, path + '0');
    } else {
      if (x < i) {
        let nextX = x + 1;
        dfs(nextX, y, sum, path + '1');
      }
    }

  };
  dfs(0, 0, 0, '');
  return max;
};
// 动态规划 解法和 62 63 类似
// 用一个相同长度的数组，存储到每一个索引位和的最小值
// 先算第一横向的值和第一纵向的值 
// 后面每一项的最小值 是该索引位的值 加上 横方向上一个x 纵方向上一个y  x y 取小的那个值
// 最后循环结束直接返回最后一个值即可
/* 
  例如
  [
  [1,3,1],
  [1,5,1],
  [4,2,1]
  ] 
  计算后为 关键步骤 取 (纵方向上一个↑,横方向上一个←)小的那个 + 当前格子的值
  [
  [1,4,5],
  [2,7,6],
  [6,8,7]
  ] 
 */
var minPathSum2 = (grid) => {
  let row = grid.length;
  let col = grid[0].length;
  let xsum = grid[0][0];
  let ysum = grid[0][0];
  // 初始化一个和grid一样的数组
  const arr = [...grid.map(item => [...item])];
  for (let x = 1; x < col; x++) {
    xsum += grid[0][x];
    // 替换更新第一横向的每一个值为和上一个值的累加值
    arr[0][x] = xsum;
  }
  for (let y = 1; y < row; y++) {
    // 替换更新第一纵向的每一个值为和上一个值的累加值
    ysum += grid[y][0];
    arr[y][0] = ysum;
  }
  for (let y = 1; y < row; y++) {
    for (let x = 1; x < col; x++) {
      // 从第二行的第二开始, 记录每一个值为 (上一横向格，上一纵向格)取小的那个值+当前格子的值
      arr[y][x] = Math.min(arr[y - 1][x], arr[y][x - 1]) + grid[y][x];
    }
  }
  return arr[row - 1][col - 1];
};
// console.log(Date.now() - d);