/* 数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
空白格用 '.' 表示。


一个数独。

[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],
["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],
[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]

答案被标成红色。

Note:

给定的数独序列只包含数字 1-9 和字符 '.' 。
你可以假设给定的数独只有唯一解。
给定数独永远是 9x9 形式的。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sudoku-solver
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

var solveSudoku = function (board) {

  /* 检查是否摆放正确 */
  const checkSudoKu = () => {
    const yHashList = {}; // { 1:{1,2,3},2：{1,2,3}, ...}
    const padHashList = {}; // { '1-2':{1,2,3,4}...}
    for (let i = 0; i < board.length; i++) {
      const itemRow = board[i];
      const xHash = {};// {1,2,3}
      for (let j = 0; j < itemRow.length; j++) {
        const num = itemRow[j];
        if (num !== '.') {
          if (!xHash[num]) {
            xHash[num] = 1;
          } else {
            return false;
          }
          if (!yHashList[j]) {
            yHashList[j] = {};
          }
          if (!yHashList[j][num]) {
            yHashList[j][num] = 1;
          } else {
            return false;
          }
          const x = Math.floor((j) / 3) + 1;
          const y = Math.floor((i) / 3) + 1;
          const key = `${x}-${y}`;
          if (!padHashList[key]) {
            padHashList[key] = {};
          }
          if (!padHashList[key][num]) {
            padHashList[key][num] = 1;
          } else {
            // console.log('padHashList' + key, padHashList[key], num );
            return false;
          }
        }
      }
    }
    return true;
  };
  /*  首次执行记忆化缺的值 */
  const mountedList = () => {
    const resList = [];
    // 纵向
    const yHashList = {};
    // 区块
    const padHashList = {};
    // 横向
    const xHashList = {};
    for (let i = 0; i < board.length; i++) {
      const item = [];
      xHashList[i] = {};
      const itemRow = board[i];
      for (let j = 0; j < itemRow.length; j++) {
        const num = itemRow[j];
        if (num === '.') {
          const rowOne = { index: j, val: null };
          item.push(rowOne);
        } else {
          if (!yHashList[j]) {
            yHashList[j] = {};
          }
          yHashList[j][num] = 1;
          xHashList[i][num] = 1;
        }
        const x = Math.floor((j) / 3) + 1;
        const y = Math.floor((i) / 3) + 1;
        const key = `${x}-${y}`;
        if (!padHashList[key]) {
          padHashList[key] = {};
        }
        if (num !== '.') {
          padHashList[key][num] = 1;
        }
      }
      resList.push(item);
    }
    // 记录不能取的值
    for (let i = 0; i < resList.length; i++) {
      const itemRow = resList[i];
      for (let j = 0; j < itemRow.length; j++) {
        const index = itemRow[j].index;
        const x = Math.floor((index) / 3) + 1;
        const y = Math.floor((i) / 3) + 1;
        const key = `${x}-${y}`;
        const list = [...Object.keys(yHashList[index]), ...Object.keys(xHashList[i]), ...Object.keys(padHashList[key])];
        itemRow[j].store = Array.from(new Set(list));
        itemRow[j].memory = [];
      }
    }
    return resList;
  };
  /* 随机选择一个数 比顺序遍历更快  */
  const choose = (arr) => {
    // 用一个hash去记录已有的数
    const hash = {};
    const randomList = [];
    arr.forEach(ele => hash[ele] = 1);
    for (let i = 1; i < 10; i++) {
      if (!hash[i]) randomList.push(i + '');
    }
    // 随机选择一个
    const randomIndex = Math.floor(Math.random() * randomList.length);
    return randomList[randomIndex];
  };
  // 回溯函数
  const recallBack = (list, x, y) => {
    while (y < list.length) {
      let row = list[y];
      // 可以跳出的内循环
      loopIn: for (; x < row.length;) {
        let item = row[x];
        // 第一步判断如果首次记录和尝试过的数字都含有1-9 就进行回溯、即调出循环
        // 第二布 随机选择一个值没有记录和尝试过的值
        // 第三步 检查是否有结果 如有结果 ，则进行检查， 如果检查通过 则重复回到第二步， 
        // 继续上一步 如果检查失败 则丢进尝试过的数组里，清空那个borad的值，返回第二步
        // 第四步 如果没有 清空尝试过的值 并清空该索引位borad的值 回到上一个值，把上一个尝试过的值记录进已试过的值里，表示上一个的值也需要更换 
        if (item.store.length + item.memory.length === 9) {
          board[y][item.index] = '.';
          item.val = null;
          item.memory = [];
          x--;
          if (x < 0) {
            y--;
            x = list[y].length - 1;
          }
          const pre = list[y][x];
          pre.memory.push(pre.val);
          pre.val = null;
          board[y][pre.index] = '.';
          row = list[y];
          break loopIn;
        }
        const num = choose([...item.memory, ...item.store]);
        if (num) {
          board[y][item.index] = num;
          if (checkSudoKu()) {
            x++;
            item.val = num;
          } else {
            board[y][item.index] = '.';
            item.memory.push(num);
          }
        } else {
          // 清空当前的值
          item.memory = [];
          board[y][item.index] = '.';
          x--;
          if (x < 0) {
            y--;
            x = list[y].length - 1;
          }
          // 把上一个成功的值丢入尝试失败的记录里 
          const pre = list[y][x];
          pre.memory.push(pre.val);
          pre.val = null;
          board[y][pre.index] = '.';
          // return recallBack(list, x, y);
        }

      }
      if (x >= row.length) {
        x = 0;
        y++;
      }
    }
  };

  const startList = mountedList();
  recallBack(startList, 0, 0);
};
const test1 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];
let d = Date.now();
solveSudoku(test1);
console.log(test1, Date.now() - d);

const test2 = [
  [".", ".", "9", "7", "4", "8", ".", ".", "."],
  ["7", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", "2", ".", "1", ".", "9", ".", ".", "."],
  [".", ".", "7", ".", ".", ".", "2", "4", "."],
  [".", "6", "4", ".", "1", ".", "5", "9", "."],
  [".", "9", "8", ".", ".", ".", "3", ".", "."],
  [".", ".", ".", "8", ".", "3", ".", "2", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "6"],
  [".", ".", ".", "2", "7", "5", "9", ".", "."]
];
let d1 = Date.now();
solveSudoku(test2);
console.log(test2, Date.now() - d1);

