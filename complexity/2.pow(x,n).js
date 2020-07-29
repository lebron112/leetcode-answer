/* 
实现 pow(x, n) ，即计算 x 的 n 次幂函数。

示例 1:

输入: 2.00000, 10
输出: 1024.00000
示例 2:

输入: 2.10000, 3
输出: 9.26100
示例 3:

输入: 2.00000, -2
输出: 0.25000
解释: 2-2 = 1/22 = 1/4 = 0.2 
*/
// 暴力法 速度很慢
var myPow = function (x, n) {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let res = x;
  let ans = 1;
  for (let i = n; Math.floor(i); i /= 2) {
    if (Math.floor(i % 2) === 1) {
      ans = ans * res;
    }
    res = res * res;
  }
  return ans;
};
var a = Date.now();
console.log('======', myPow(2, -23565656));
console.log(Date.now() - a);