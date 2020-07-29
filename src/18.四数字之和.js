/* 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

注意：

答案中不可以包含重复的四元组。

示例：

给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/4sum */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b);
  const res = [];
  if (nums.length >= 4) {
    if (nums[0] === target && nums[nums.length - 1] === target) return [[0, 0, 0, 0]];
    for (let i = 0; i < nums.length - 3; i++) {
      for (let k = i + 1; k < nums.length - 2; k++) {
        let left = k + 1, right = nums.length - 1;
        while (left < right) {
          const sum = nums[i] + nums[k] + nums[left] + nums[right];
          if (sum === target) {
            res.push([nums[i], nums[k], nums[left], nums[right]])
          }
          if (sum <= target) {
            while (left < right && nums[left] === nums[left + 1]) { left++; }
            left++;
          } else {
            while (left < right && nums[right] === nums[--right]) { }
          }
        }
        while (nums[k] === nums[k + 1]) { k++; }
      }
      // 方法类似三树之和 只不过比三树之和多套一层算法和去重判断
      while (nums[i] === nums[i + 1]) { i++; }
    }
  }
  return res;
};
// console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
console.log(fourSum([-1, 0, 1, 2, -1, -4], -1));
console.log(fourSum([-5, -5, -3, -1, 0, 2, 4, 5], -7));