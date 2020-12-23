/* 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

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

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/climbing-stairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number} n
 * @return {number}
 */
// 求斐波那契数列
// 利用递归和hash缓存已经存在的值 如果不存在则进行递归查找 
var climbStairs = function (n) {
  const cacheHash = {};
  const fn = (n) => {
    if (cacheHash[n]) {
      return cacheHash[n];
    }
    let res;
    if (n <= 1) {
      res = 1;
      return res;
    } else if (n === 2) {
      res = 2;
      return res;
    } else {
      res = fn(n - 1) + fn(n - 2);
    }
    cacheHash[n] = res;
    return res;
  };
  return fn(n);
};
console.log(climbStairs(4));
console.log(climbStairs(5));
console.log(climbStairs(10));