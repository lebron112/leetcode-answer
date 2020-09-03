/* 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？



例如，上图是一个7 x 3 的网格。有多少可能的路径？

 

示例 1:

输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右
示例 2:

输入: m = 7, n = 3
输出: 28

提示：
1 <= m, n <= 100
题目数据保证答案小于等于 2 * 10 ^ 9

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/unique-paths
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 可以看出是求01全排序问题 m-1个1和n-1个0的全排序问题 3*2=>011 101 110 
// 3*3=> 0011 0101 0110 1001 1010 1100
// 4*3=> 00111 01011 01101 01110 10011 10101 10110 11001 11010 11100 
/*
  1-1=>1   2-1=>1   3-1=>1
  2-2=>2   3-2=>3   4-2=>4   5-2=>5   ...
  3-3=>6   4-3=>10  5-3=>15  6-3=>21  7-3=>28  8-3=>36
  4-4=>20  5-4=>35  6-4=>56  7-4=>84  8-4=>120
  5-5=>70  6-5=>126
 */
// 找规律即可 数学问题 hashStore也可以用二维数组代替
var uniquePaths = function (m, n) {
  const x = m - 1;
  const y = n - 1;
  const mul = (x, y) => {
    let hashStore = {};
    for (let i = 2; i <= x; i++) {
      hashStore[`${i}-${2}`] = i;
    }
    for (let i = 3; i <= y; i++) {
      for (let j = i; j <= x; j++) {
        if (j === i) {
          hashStore[`${j}-${i}`] = hashStore[`${j}-${i - 1}`] * 2;
        } else {
          hashStore[`${j}-${i}`] = hashStore[`${j - 1}-${i}`] + hashStore[`${j}-${i - 1}`];
        }
      }
    }
    return hashStore[`${x}-${y}`];
  };
  if (x <= 0 || y <= 0) {
    return 1;
  } else if (x === 1 || y === 1) {
    return Math.max(m, n);
  } else {
    return mul(Math.max(m, n), Math.min(m, n));
  }
};
// console.log(uniquePaths(7, 3));
console.log(uniquePaths(3, 7));