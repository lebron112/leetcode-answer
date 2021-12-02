/* 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
 

示例 1：


输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
示例 2：

输入：board = [["X"]]
输出：[["X"]]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/surrounded-regions
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */


// 深度遍历， 冲边界查找 O 找到一个既开始进行深度遍历
// 用一个二维数组 road 对能够深度遍历到的位置记为1，
// 再次循环矩阵，对应位置几位1的不设为X
// 深度遍历方法，查找4个方向，进行递归, 需要进行去重操作，即下一个边界0开始查找时，对road内记录的位置进行判断 找过则不进行

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  const road = board.map(item => ([]));
  const checkDfs = (x, y, dir) => {
    //  ↓ ↑ ← →
    if (dir === '↓') {
      dfs(x, y + 1, '↓');
      dfs(x + 1, y , '→');
      dfs(x - 1, y, '←');
    }
    if (dir === '↑') {
      dfs(x, y - 1, '↑');
      dfs(x + 1, y, '→');
      dfs(x - 1, y, '←');
    }
    if (dir === '→') {
      dfs(x, y - 1, '↑');
      dfs(x + 1, y, '→');
      dfs(x, y + 1, '↓');
    }
    if (dir === '←') {
      dfs(x, y - 1, '↑');
      dfs(x - 1, y, '←');
      dfs(x, y + 1, '↓');
    }
  };
  const dfs = (x, y, dir) => {
    if (y < 0 || y > board.length - 1) { return; }
    if (x < 0 || x > board[0].length - 1) { return; }
    if (road[y][x] === 1) return;
    if (board[y][x] === 'O') {
      road[y][x] = 1;
      checkDfs(x, y, dir);
    }
  };
  for (let i = 0; i < board[0].length; i++) {
    const d = board[0][i];
    if (d === 'O') {
      road[0][i] = 1;
      checkDfs(i, 0, '↓');
    }
  }
  for (let i = 0; i < board[board.length - 1].length; i++) {
    const d = board[board.length - 1][i];
    if (d === 'O') {
      road[board.length - 1][i] = 1;
      checkDfs(i, board.length - 1, '↑');
    }
  }
  for (let i = 0; i < board.length; i++) {
    const d = board[i][board[0].length - 1];
    if (d === 'O') {
      road[i][board[0].length - 1] = 1;
      checkDfs(board[0].length - 1, i, '←');
    }
  }
  for (let i = 0; i < board.length; i++) {
    const d = board[i][0];
    if (d === 'O') {
      road[i][0] = 1;
      checkDfs(0, i, '→');
    }
  }

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const ox = board[y][x];
      if (road[y][x] !== 1 && ox === 'O') {
        board[y][x] = 'X';
      }
    }
  }
  return board;
};

console.log(solve([
  ["O", "X", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "X", "X"]
]))
console.log(solve([
  ["O", "O", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "X", "X"]
]))
console.log(solve([
  ["X", "X", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "X", "X"]
]))
console.log(solve([
  ["O", "O", "O", ],
  ["O", "O", "O", ],
  ["O", "O", "O", ],
]))