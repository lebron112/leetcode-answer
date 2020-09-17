/* 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:

输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-subarray
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 动态规划问题
// 利用一个变量记录连续的和 另一个记录最大的值
// 一次循环即可 如果上次连续和大于0 再加上当前索引的数字  否则从把当前数字作为初始值 并重新新开始计算连续和
// 最后比较最大值和连续值和即可
var maxSubArray = function (nums) {
  let currentSum = nums[0],
    maxSum = nums[0];
  for (var i = 1; i < nums.length; i++) {
    if (currentSum > 0) {
      // 如果大于 0，表示 currentSum 对于后续计算最大子序和，具有增益效果 buff
      // 基于 currentSum，加上数组第 i 项，继续计算最大子序和
      currentSum += nums[i];
    } else {
      // 如果小于等于 0，表示 currentSum 对于后续计算最大子序和，具有减益效果 debuff 或者无效果
      // 于是基于数组第 i 项，重新开始计算当前最大子序和
      currentSum = nums[i];
    }
    // 每次循环结束前，比较并更新一下最大子序和 maxSum
    maxSum = Math.max(currentSum, maxSum);
  }
  // 返回最大子序和
  return maxSum;
};