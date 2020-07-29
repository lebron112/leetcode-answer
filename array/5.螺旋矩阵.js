/* 给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

示例 1:

输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
示例 2:

输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7] */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  if(!matrix.length) return [];
  let m = matrix.length;//↓
  let n = matrix[0].length;//→
  let len = m * n;
  const res = [];
  let dir = 1; // 1→ 2↓ 3← 4↑
  let j = 0, i = 0; // i→ j↓
  let maxM = m, maxN = n, minM = 0, minN = 0;
  for (let x = 0; x < len; x++) {
    res.push(matrix[j][i]);
    // 先横向走 都到头 最大长度减1 再变更放心如此循环即可
    if(dir === 1){
      i++;
      if(i === maxN){
        i = maxN - 1;
        maxN --;
        dir = 2;
      }
    }
    if(dir === 2){
      j++;
      if(j === maxM){
        j = maxM - 1;
        maxM --;
        dir = 3
      }
    }
    if(dir === 3){
      i --;
      if(i < minN){
        i = minN;
        minN ++;
        dir = 4;
      }
    }
    if(dir === 4){
      j --;
      if(j === minM){
        minM ++;
        j = minM;
        dir = 1;
        i ++;
      }
    }
  }
  return res;
};
console.log(spiralOrder([
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
 ]));
 console.log(spiralOrder([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
 ]));
