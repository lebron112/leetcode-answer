/* 
n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

上图为 8 皇后问题的一种解法。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例:

输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
 

提示：

皇后，是国际象棋中的棋子，意味着国王的妻子。皇后只做一件事，那就是“吃子”。当她遇见可以吃的棋子时，就迅速冲上去吃掉棋子。当然，她横、竖、斜都可走一到七步，可进可退。（引用自 百度百科 - 皇后 ）

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/n-queens
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const hashStore = {};
  // 记忆化的序列 能大大减少运行时间
  const hasHas = {};
  // 初始化空棋牌的
  const mountRes = (n) => {
    let res = [];
    for (let i = 0; i < n; i++) {
      res.push('.'.repeat(n).split(''));
    }
    return res;
  };
  // 判断是否可以正确摆放
  const checkQueen = (result, row) => {
    const lastQueenIndex = result[row].indexOf('Q');
    // 竖线↑
    for (let y = row - 1; y >= 0; y--) {
      if (result[y][lastQueenIndex] === 'Q') {
        return false;
      }
    }
    // 斜对角往右上
    let rowCopy = row;
    for (let i = lastQueenIndex + 1; i < n; i++) {
      rowCopy--;
      if (rowCopy >= 0) {
        if (result[rowCopy][i] === 'Q') {
          return false;
        }
      } else {
        break;
      }
    }
    // 斜对角往左上
    rowCopy = row;
    for (let i = lastQueenIndex - 1; i >= 0; i--) {
      rowCopy--;
      if (rowCopy >= 0) {
        if (result[rowCopy][i] === 'Q') {
          return false;
        }
      } else {
        break;
      }
    }
    return true;
  };
  // 检查所有可能的情况
  const checkOut = (x, n, result, storeArr) => {
    const storeIndex = [...storeArr];
    storeIndex.forEach((v, i) => {
      result[i][v] = 'Q';
    });
    let y = storeIndex.length;
    let hasTry = false;
    for (; y < n; y++) {
      result[y][x] = 'Q';
      hasTry = true;
      if (hasTry && y === n - 1 && x > n - 1) {
        break;
      }
      if (y === 0) {
        storeIndex.push(x);
        x = 0;
      } else {
        if (checkQueen(result, y)) {
          storeIndex.push(x);
          x = 0;
        } else {
          // 进行回溯 storeIndex 的倒数第一个值弹出 如果弹出值为n - 1,
          // 则y回到上一层, storeIndex 再弹出一个值,x 为该弹出值加1
          result[y][x] = '.';
          x++;
          if (x === n) {
            y--;
            let last = storeIndex.pop();
            result[y][last] = '.';
            if (last === n - 1) {
              y--;
              last = storeIndex.pop();
              if (y < 0) break;
            }
            result[y][last] = '.';
            x = last + 1;
          }
          y--;
        }
      }
    }
    if (storeIndex.length === n) {
      hashStore[storeIndex.join('-')] = result.map(item => item.join(''));
      return storeIndex;
    } else {
      return null;
    }
  }
  const loopAll = (storeIndex) => {
    if (storeIndex.length < n) {
      let x = storeIndex.length ? (storeIndex[storeIndex.length - 1] + 1) : 0;
      for (; x < n; x++) {
        const res = checkOut(x, n, mountRes(n), storeIndex);
        if (res) {
          for (let i = storeIndex.length + 1; i < res.length; i++) {
            const a = res.slice(0, i);
            const cv = [...res].reverse();
            const b = cv.slice(0, i);
            // 记忆化对下一个子排序的可能结果记忆化
            if (!hasHas[a.join('-')]) {
              hasHas[a.join('-')] = 1;
              loopAll(a);
            }
            // 记忆化
            if (!hasHas[b.join('-')]) {
              hasHas[b.join('-')] = 1;
              loopAll(b);
            }
          }
        }
      }
    }
  };
  if (n === 1) return [['Q']];
  loopAll([]);
  return Object.values(hashStore);
};
let d = Date.now();
console.log(solveNQueens(11).length);
console.log(Date.now() - d);