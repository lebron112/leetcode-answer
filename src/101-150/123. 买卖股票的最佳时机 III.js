/* 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

 

示例 1:

输入：prices = [3,3,5,0,0,3,1,4]
输出：6
解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
示例 2：

输入：prices = [1,2,3,4,5]
输出：4
解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。   
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
示例 3：

输入：prices = [7,6,4,3,1] 
输出：0 
解释：在这个情况下, 没有交易完成, 所以最大利润为 0。
示例 4：

输入：prices = [1]
输出：0

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

/**
 * @param {number[]} prices
 * @return {number}
 */
// 类似 122 题，(不能这么做 )不直接累加，找出总共可以交易的次数的获利，，进行排序，找出最大的2个相加就行；
var maxProfit2 = function (prices) {
  const gets = [];
  const checkDist = (startIndex) => {
    let min = prices[startIndex];
    let sum = 0;
    for (let i = startIndex; i < prices.length; i++) {
      min = Math.min(min, prices[i]);
      let next = prices[i + 1];
      if (next === undefined) {
        gets.push(sum);
      } else {
        sum = Math.max(sum, next - min);
        if (next < prices[i]) {
          gets.push(sum);
          checkDist(i + 1);
          break;
        }
      }
    }
  };
  checkDist(0);
  gets.sort((a, b) => b - a);
  return (gets[0] || 0) + (gets[1] || 0);
};

// 枚举法
/*
  在121的基础上，对交易次数进行分割，分第一次交易和第二次交易，最后找出和最大的那个值   超时了
 */
var maxProfit = (prices) => {
  const checkDist = (st, et) => {
    let min = prices[st];
    let sum = 0;
    for (let i = st; i < et - 1; i++) {
      min = Math.min(min, prices[i]);
      sum = Math.max(prices[i + 1] - min, sum);
    }
    return sum;
  };
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    const leftSum = checkDist(0, i);
    const rightSum = checkDist(i, prices.length);
    max = Math.max(leftSum + rightSum, max);
  }
  return max;
};

// 动态规划
// 在上一个枚举法的基础上进行修改，去除重复执行的步数 看评论解题
/* 
  只需考虑 4个状态
  fstBuy: 在该天第一次买入股票可获得的最大收益 
  fstSell: 在该天第一次卖出股票可获得的最大收益
  secBuy: 在该天第二次买入股票可获得的最大收益
  secSell: 在该天第二次卖出股票可获得的最大收益
  分别对四个变量进行相应的更新, 最后secSell就是最大
 */
var maxProfitDp = (prices) => {
  // 买入后钱，负收益
  let b1 = -prices[0];
  let s1 = 0;
  // 买入后钱，负收益
  let b2 = -prices[0];
  let s2 = 0;
  for (let i = 0; i < prices.length; i++) {
    const p = prices[i];
    // 第一次买入股票可获得的最大收益 , 因为买入花钱，所以是一个负收益
    b1 = Math.max(b1, - p);
    // 第一次卖出股票可获得的最大收益，因为卖掉了，增加数就是股票卖掉的价格
    s1 = Math.max(s1, b1 + p);
    // 第二次买入股票可获得的最大收益，等于第一次的最大收益 - 买入的价格
    b2 = Math.max(b2, s1 - p);
    // 第二次卖掉股票获得的最大收益，等于第二次买入时的最大收益 + 股票卖掉的价格
    s2 = Math.max(s2, b2 + p);
  }
  return s2;
};

console.log(maxProfitDp([7, 1, 5, 3, 6, 4]));//7
console.log(maxProfitDp([1, 2, 3, 4, 5]));//4
console.log(maxProfitDp([1, 2, 4, 2, 5, 7, 2, 4, 9, 0]));// 13