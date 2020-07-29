/* 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum-closest */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  let res = null, dis = null;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      let d;
      if (sum === target) return sum;
      if (sum < target) {
        d = target - sum;
        left++;
      } else {
        d = sum - target;
        right--;
      }
      if (!dis || dis > d) {
        dis = d;
        res = sum;
      }

    }
  }
  return res;
};
console.log(threeSumClosest([-4, -1, 1, 2], 1));
