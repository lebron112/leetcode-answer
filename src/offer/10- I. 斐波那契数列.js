/* 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：

F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

 

示例 1：

输入：n = 2
输出：1
示例 2：

输入：n = 5
输出：5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number} n
 * @return {number}
 */
// 记忆法 a 为 F(n-1) b 为 F(n) c为 F(n+1) 每次循环更新值 为防止数字溢出，提前让c 取模
const { testFn } = require('../utils');
var fib = function (n) {
  let a = 0;
  let b = 1;
  let index = 0;
  let c = 0;
  while (index < n) {
    index++;
    c = (a + b) % 1000000007;
    a = b;
    b = c;
    if (index === n - 1) {
      return b
    }
  }
  return c;
};
let a = Date.now();
testFn(fib, 81); //0
// testFn(fib, 1); //1
// testFn(fib, 10); //55
console.log(Date.now() - a);