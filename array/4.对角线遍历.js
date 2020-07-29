/* 给定一个含有 M x N 个元素的矩阵（M 行，N 列），请以对角线遍历的顺序返回这个矩阵中的所有元素，对角线遍历如下图所示。

 

示例:

输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]

输出:  [1,2,4,7,5,3,6,8,9]

解释:
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const ad = () =>{
  const res = [];
  for(let i = 0; i < 10000; i++){
    let x = Math.floor((i + 1) / 100);
    if(!res[x]) res[x] = [];
    res[x].push(i + 1);
  }
  return res;
};

var findDiagonalOrder = function (matrix) {
  let dir = 1; // 1 up 2 down;
  let i = 0, j = 0; // i 横向 j 纵向
  const res = [];
  const len = (matrix.length - 1) * (matrix.length - 1) ;
  while (i * j <= len ) {
    if(j < matrix.length && i < matrix.length){
      res.push(matrix[j][i]); 
    }
    if (dir === 1) {
      j--;
      i++;
      if (j < 0) {
        j = 0;
        dir = 2;
      }
    } else if (dir === 2) {
      j++;
      i--;
      if (i < 0) {
        i = 0;
        dir = 1;
      }
    }
    console.log(j , i);
  }
  return res;
};
// console.log(findDiagonalOrder([
//   [1, 2],
//   [3, 4],
// ]));
// console.log(findDiagonalOrder([
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]));
// console.log(ad());
// console.log(findDiagonalOrder(ad()));

