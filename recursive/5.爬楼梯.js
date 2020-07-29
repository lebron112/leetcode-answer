/* 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
注意：给定 n 是一个正整数。

示例 1：
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
示例 2：

输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶 
1:1,2:2,3:3,4:5;  修改斐波那契数列算法即可
*/
var climbStairs = function (n) {
  const cache = {};
  let res;
  const m = function (N) {
    if (cache[N]) {
      return cache[N];
    } else {
      if (N <= 2) {
        res = N;
      } else {
        res = m(N - 1) + m(N - 2);
      }
      cache[N] = res;
      return res;
    }
  };
  return m(n);
};
console.log(climbStairs(7));