/* 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

示例 1：

输入: 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1
示例 2:

输入: 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36
提示：

2 <= n <= 58

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/jian-sheng-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

/**
 * @param {number} n
 * @return {number}
 */
// 其实就是计算n个 3的问题
var cuttingRope = function (n) {
  if (n === 1) return 1;
  if (n === 2) return 1;
  if (n === 3) return 2;
  if (n === 4) return 4;
  if (n === 5) return 6;
  let sum = 3;
  n -= 3;
  while (n >= 2) {
    if (n === 4) {
      sum *= 4;
      break;
    } if (n === 2) {
      sum *= 2;
      break;
    } else {
      n -= 3;
      sum *= 3;
    }
  }
  return sum;
};
const { testFn } = require("../utils");
testFn(cuttingRope, 2);
testFn(cuttingRope, 8);
testFn(cuttingRope, 10);// 36 3 3 4
testFn(cuttingRope, 15);// 243
testFn(cuttingRope, 58);