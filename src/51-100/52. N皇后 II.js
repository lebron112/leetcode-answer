/**
 * @param {number} n
 * @return {number}
 */
// 和N皇后问题相同 无非是不需要记录结果 只需计算有几种
var totalNQueens = function (n) {
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
      hashStore[storeIndex.join('-')] = 1;
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
  if (n === 1) return 1;
  loopAll([]);
  return Object.values(hashStore).length;
};