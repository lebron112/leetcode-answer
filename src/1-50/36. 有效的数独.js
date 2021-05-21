/* 请你判断一个 9x9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
数独部分空格内已填入了数字，空白格用 '.' 表示。

注意：

一个有效的数独（部分已被填充）不一定是可解的。
只需要根据以上规则，验证已经填入的数字是否有效即可。
 

示例 1：


输入：board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
输出：true
示例 2：

输入：board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
输出：false
解释：除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。 但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-sudoku
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  let cArr = {};
  let room9 = {};
  for (let i = 0, j = 0; i < board.length; i++) {
    let rowArr = []; // 横向
    for (j = 0; j < board.length; j++) {
      // 纵开始
      if (!cArr[i]) cArr[i] = [];
      const r = board[j][i];
      if (!isNaN(r)) {
        if (cArr[i].indexOf(r) === -1) {
          cArr[i].push(r);
        } else {
          return false;
        }
      }
      // 纵结束 

      // 横开始
      const d = board[i][j];
      if (!isNaN(d)) {
        if (rowArr.indexOf(d) === -1) {
          rowArr.push(d)
        } else {
          return false;
        };
      }
      // 横结束

      // 9宫格开始
      const numj = Math.floor(j / 3) + 1;
      const numi = Math.floor(i / 3) + 1;
      const str = `${numj}${numi}`;
      if (!room9[str]) room9[str] = [];
      if (!isNaN(d)) {
        if (room9[str].indexOf(d) === -1) {
          room9[str].push(d);
        } else {
          return false;
        }
      }
    }
  }
  return true;
};