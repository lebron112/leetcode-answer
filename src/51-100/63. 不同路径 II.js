/* 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？



网格中的障碍物和空位置分别用 1 和 0 来表示。

说明：m 和 n 的值均不超过 100。

示例 1:

输入:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
输出: 2
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/unique-paths-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
// 暴力法 dfs搜索树 枚举所有的路径 超时
var uniquePathsWithObstacles = function (obstacleGrid) {
  const col = obstacleGrid[0].length - 1;
  const row = obstacleGrid.length - 1;
  const pathMap = [];
  const hashStore = {};
  if (obstacleGrid[row][col] === 1 || obstacleGrid[0][0] === 1) return 0;
  const dfs = (x, y, path) => {
    if (path) {
      if (!hashStore[path]) {
        hashStore[path] = 1;
      } else {
        return;
      }
    }
    if (obstacleGrid[y][x] === 1) return;
    if (x === col && y === row) {
      console.log(pathMap.length);
      pathMap.push(path);
      return;
    } else {
      if (x < col) {
        const nextX = x + 1;
        dfs(nextX, y, path + '1');
      } else {
        if (y < row) {
          const nextY = y + 1;
          dfs(x, nextY, path + '0');
        }
      }
      if (y < row) {
        const nextY = y + 1;
        dfs(x, nextY, path + '0');
      } else {
        if (x < col) {
          const nextX = x + 1;
          dfs(nextX, y, path + '1');
        }
      }
    }
  };
  dfs(0, 0, '');
  return pathMap.length;
};
// 动态规划
// 解法和62 64类似
// 先算出第一横和第一纵列的解 对于障碍物遇到1就记为0，并且比较上一格是否也是0  判断最终有路径能到达该点即可
// 双层循环即可，如果当前索引位置是障碍物 则直接记录该索引位为0 如果不是则当前索引位的值等于 纵方向上一格 + 横方向上一格 的和
var uniquePathsWithObstacles2 = (obstacleGrid) => {
  const col = obstacleGrid[0].length - 1;
  const row = obstacleGrid.length - 1;
  const pathMap = [...obstacleGrid.map(item => [...item])];
  if (obstacleGrid[row][col] === 1 || obstacleGrid[0][0] === 1) return 0;
  for (let x = 0; x <= col; x++) {
    // 判断路径上是否有障碍物 有障碍物记为0 并且之后的都是0
    // const v = obstacleGrid[0][x];
    // if (v) {
    //   pathMap[0][x] = 0;
    // } else {
    //   // if (x > 0) {
    //   //   pathMap[0][x] = pathMap[0][x - 1] === 0 ? 0 : 1
    //   // } else {
    //   //   pathMap[0][x] = 1;
    //   // }
    // }
    // 简写
    pathMap[0][x] = obstacleGrid[0][x] ? 0 : x > 0 ? pathMap[0][x - 1] === 0 ? 0 : 1 : 1;
  }
  for (let y = 0; y <= row; y++) {
    // 判断路径上是否有障碍物 有障碍物记为0 并且之后的都是0
    // const v = obstacleGrid[y][0];
    // if (v) {
    //   pathMap[y][0] = 0;
    // } else {
    //   if (y > 0) {
    //     pathMap[y][0] = pathMap[y - 1][0] === 0 ? 0 : 1
    //   } else {
    //     pathMap[y][0] = 1;
    //   }
    // }
    // 简写
    pathMap[y][0] = obstacleGrid[y][0] ? 0 : y > 0 ? pathMap[y - 1][0] === 0 ? 0 : 1 : 1;
  }
  for (let y = 1; y <= row; y++) {
    for (let x = 1; x <= col; x++) {
      // 有障碍物直接标记为0 没有则为纵方向上一格 + 横方向上一格 的和
      // const v = obstacleGrid[y][x];
      // if (v === 1) {
      //   pathMap[y][x] = 0;
      // } else {
      //   pathMap[y][x] = pathMap[y - 1][x] + pathMap[y][x - 1];
      // }
      // 简写
      pathMap[y][x] = obstacleGrid[y][x] === 1 ? 0 : pathMap[y - 1][x] + pathMap[y][x - 1];
    }
  }
  return pathMap[row][col];
}
console.log(uniquePathsWithObstacles2(
  [[0, 0], [1, 1], [0, 0]]
))
console.log(uniquePathsWithObstacles2([
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]
]));
console.log(uniquePathsWithObstacles2([
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
]));