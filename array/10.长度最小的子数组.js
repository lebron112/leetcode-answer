/* 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组。如果不存在符合条件的连续子数组，返回 0。

示例: 

输入: s = 7, nums = [2,3,1,2,4,3]
输出: 2
解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。
进阶:

如果你已经完成了O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法 */
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (s, nums) {
  let min = nums.length;
  let has = false;
  label: for (let i = 0; i < nums.length; i++) {
    let sum = nums[i];
    if (sum >= s) return 1;
    labelIn: for (let j = i + 1; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= s) {
        min = Math.min(min, j - i + 1);
        has = true;
        break labelIn;
      }
    }
  }
  return !has ? 0 : min;
};
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
console.log(minSubArrayLen(11, [1, 2, 3, 4, 5]));
