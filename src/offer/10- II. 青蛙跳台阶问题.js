/*一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

示例 1：

输入：n = 2
输出：2
示例 2：

输入：n = 7
输出：21
示例 3：

输入：n = 0
输出：1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。  */
/**
 * @param {number} n
 * @return {number}
 */
// 题目通10-I 求斐波那契数列
const { testFn } = require('../utils');
var numWays = function (n) {
  let a = 1;
  let b = 2;
  let c = 1;
  if (n === 0) return 1;
  if (n === 1) return a;
  if (n === 2) return b;
  for (let i = 3; i <= n; i++) {
    c = (a + b) % 1000000007;
    a = b;
    b = c;
  }
  return b;
};
testFn(numWays, 10);
