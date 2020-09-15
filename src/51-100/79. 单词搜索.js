/* 给定一个二维网格和一个单词，找出该单词是否存在于网格中。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

 

示例:

board =
[
  ['A','B','C','C'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

给定 word = "ABCCED", 返回 true
给定 word = "SEE", 返回 true
给定 word = "ABCB", 返回 false
给定 word = "ABCCEDFS", 返回 true

提示：

board 和 word 中只包含大写和小写英文字母。
1 <= board.length <= 200
1 <= board[i].length <= 200
1 <= word.length <= 10^3

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/word-search
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
// dfs
// 1暴力法 用一个hash 加记录搜索过的方向来找 超时
var exist = function (board, word) {
  if (!word.length || !board.length) return false;
  let res = false;
  const findWay = (x, y) => {
    const str = word[1];
    if (!str) {
      res = true;
      return;
    };
    const hash = {};
    hash[`${y}-${x}`] = 1;
    tryRoad(1, { x, y }, hash);
  };
  const tryRoad = (wordIndex, last, hash) => {
    const str = word[wordIndex];
    if (!str) {
      res = true;
      return;
    }
    const { x, y } = last;
    if (board[y - 1] && board[y - 1][x]) {
      const nextY = y - 1;
      const nextX = x;
      const copyHash = { ...hash };
      if (str === board[nextY][nextX] && !copyHash[`${nextY}-${nextX}`]) {
        copyHash[`${nextY}-${nextX}`] = 1;
        tryRoad(wordIndex + 1, { y: nextY, x: nextX }, copyHash);
      }
    }
    if (board[y + 1] && board[y + 1][x]) {
      const nextY = y + 1;
      const nextX = x;
      const copyHash = { ...hash };
      if (str === board[nextY][nextX] && !copyHash[`${nextY}-${nextX}`]) {
        copyHash[`${nextY}-${nextX}`] = 1;
        tryRoad(wordIndex + 1, { y: nextY, x: nextX }, copyHash);
      }
    }
    if (board[y] && board[y][x - 1]) {
      const nextY = y;
      const nextX = x - 1;
      const copyHash = { ...hash };
      if (str === board[nextY][nextX] && !copyHash[`${nextY}-${nextX}`]) {
        copyHash[`${nextY}-${nextX}`] = 1;
        tryRoad(wordIndex + 1, { y: nextY, x: nextX }, copyHash);
      }
    }
    if (board[y] && board[y][x + 1]) {
      const nextY = y;
      const nextX = x + 1;
      const copyHash = { ...hash };
      if (str === board[nextY][nextX] && !copyHash[`${nextY}-${nextX}`]) {
        copyHash[`${nextY}-${nextX}`] = 1;
        tryRoad(wordIndex + 1, { y: nextY, x: nextX }, copyHash);
      }
    }
  };
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const str = board[y][x];
      if (str === word[0]) {
        findWay(x, y);
        if (res) return true;
      }
    }
  }
  return false;
};

// 深度优先搜索加回溯
// 规定1234 4个方向 首先循环字符串 找到起始字符串位置 栈顶初始化一个空元素 开始查找时栈顶元素记录索引位 x,y
// 向4个方向尝试 并且栈顶记录将尝试过的方向 {[dir]:true},并且成功找到的坐标存入hash中 { x-y :1 } 然后丢入一个空元素到栈顶
// 重复上一步，如果当前前进方向4个方向都没有找到下一个字符串 则进行回溯 
// 回溯：弹出定层的栈的那个元素，并且将该弹出元素记录的索引在hash中置为空，表示该位置又下次可以重新尝试，
// 然后继续往栈顶元素其他没有记录过的方向继续找，如果还是没有，则继续回溯
// 当栈中没有元素时 说明不存在能完成的路径
// 循环完成 则有路径
var exist2 = function (board, word) {
  if (!word.length || !board.length) return false;
  if (word.length > board[0].length * board.length) return false;
  const findWay = ({ x, y }) => {
    const hash = {};
    const stack = [{}];// { x,y, 1:1,2:2,3:4,4:4 }
    hash[`${y}-${x}`] = 1;
    let i = 1;
    const jobs = (x, y, dir, index, last) => {
      const key = `${y}-${x}`;
      // 如果超过边界 则标记该方向尝试失败
      if (!board[y] || !board[y][x]) {
        last[dir] = true;
        return false;
      }
      // 如果值未存在hash中 且改方向没有尝试过 则标记该点的方向已经试过 并且记录到hash里 往栈里丢入一个未尝试过方向的索引位
      // 如果hash中存在 则 标记该方向不正确
      if (board[y][x] === word[index] && !hash[key] && !last[dir]) {
        hash[key] = true;
        last[dir] = true;
        stack.push({});
        return true;
      } else {
        last[dir] = true;
        return false;
      }
    };
    while (i < word.length) {
      // 上 右 下 左
      let dir = '↑' //↑→↓←;
      // isOk代表 在其中一个方向已经找到如果没找到 则需要进行回溯 并记录最后一次正确的索引
      let isOk, nextY, nextX;
      const last = stack[stack.length - 1];
      last.x = x;
      last.y = y;
      if (dir === '↑') {
        nextY = y - 1;
        isOk = jobs(x, nextY, dir, i, last);
        if (isOk) {
          y = nextY;
          i++;
        } else {
          dir = '→';
        }
      }
      if (dir === '→') {
        nextX = x + 1;
        isOk = jobs(nextX, y, dir, i, last);
        if (isOk) {
          x = nextX;
          i++;
        } else {
          dir = '↓';
        }
      }
      if (dir === '↓') {
        nextY = y + 1;
        isOk = jobs(x, nextY, dir, i, last);
        if (isOk) {
          y = nextY;
          i++;
        } else {
          dir = '←';
        }
      }
      if (dir === '←') {
        nextX = x - 1;
        isOk = jobs(nextX, y, dir, i, last);
        if (isOk) {
          x = nextX;
          i++;
        }
      }
      // 4个方向都没找到 进行回溯
      if (!isOk) {
        // 取最后一个值 将改hash索引位子置为空
        const remove = stack.pop();
        hash[`${remove.y}-${remove.x}`] = null; 
        // 取最后一个记录的的索引
        const last = stack[stack.length - 1];
        if (last) {
          x = last.x;
          y = last.y;
        } else {
          return false;
        }
        i--;
      }
    }
    return true
  };
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const str = board[y][x];
      if (str === word[0]) {
        const isOk = findWay({ x, y });
        if (isOk) return true;
      }
    }
  }
  return false;
};
let d = Date.now();
console.log(exist2([
  ['A', 'B', 'C', 'C'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E']
], 'ABCCED'));
console.log(exist2([
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E']
], 'SEE'));
console.log(exist2([
  ['A', 'B', 'C', 'C'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E']
], 'ABCB'));
console.log(exist2([
  ['A'],
], 'A'));
console.log(exist2([
  ["A", "B", "C", "E"],
  ["S", "F", "E", "S"],
  ["A", "D", "E", "E"]
], "ABCEFSADEESE"));
console.log(exist2([
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"], ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"], ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"], ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"], ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"], ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"], ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "b"]]
  , "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"))
console.log(Date.now() - d);