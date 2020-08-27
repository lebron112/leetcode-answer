/* 给定一个正整数 n，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

示例:

输入: 3
输出:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/spiral-matrix-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number} n
 * @return {number[][]}
 */
// 
var generateMatrix = function (n) {
  if (n === 1) return [[1]];
  if (n === 2) return [[1, 2], [4, 3]];
  const res = [];
  for (let j = 0; j < n; j++) {
    res.push([]);
  }
  let x = 0;
  let y = 0;
  // 确定方向
  let dir = 1; //1→ 2↓ 3↑ 4↑
  // 确定4个边界 上下左右
  let right = n;
  let bottom = n;
  let left = 0;
  let top = 1; // 一开始从top 边界开始 所以top是1;
  let i = 0;
  while (i < n * n) {
    res[y][x] = i + 1;
    //  到达边界后边界 减少 改变方向 循环即可
    if (dir === 1) {
      x++;
      if (x >= right) {
        x = --right;
        dir = 2;
        y++;
      }
    } else if (dir === 2) {
      y++;
      if (y >= bottom) {
        y = --bottom;
        dir = 3;
        x--;
      }
    } else if (dir === 3) {
      x--;
      if (x < left) {
        x = left ++;
        dir = 4;
        y--;
      }
    } else if (dir === 4) {
      y--;
      if (y < top) {
        y = top ++;
        dir = 1;
        x++;
      }
    }
    i++;
  }
  return res;
};
console.log(generateMatrix(5));