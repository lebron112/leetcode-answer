/* 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const res = [];
  nums = nums.sort((a, b) => a - b);
  if (nums[0] >= 0 && nums[nums.length - 1] > 0) return res;
  if (nums.length >= 3) {
    if (nums[0] === 0 && nums[nums.length - 1] === 0) return [[0, 0, 0]];
    for (let i = 0; i < nums.length - 2; i++) {
      // 先从小到大排序 设置左边值和右边值相加和索引的值相加  如果太大 右边的往左靠 如果太小 左边的往右靠 
      let left = i + 1, right = nums.length - 1;
      if (nums[i] <= 0) {
        while (left < right) {
          const sum = nums[i] + nums[left] + nums[right];
          if (sum === 0) {
            res.push([nums[i], nums[left], nums[right]]);
          }
          // 如果值小于等于0那么 左移一位 跳过相同值的值  右边也一样 （注意2种写法的区别，第二种简写是无论条件成功与否都自减）
          if (sum <= 0) {
            while (left < right && nums[left] === nums[left + 1]) { left++; }
            left++;
          } else {
            while (left < right && nums[right] === nums[--right]) { }
          }
        }
        while (nums[i] === nums[i + 1]) { i++; }
      }
    }
  }
  return res;
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));
console.log(threeSum([-4, -1, -1, 0, 1, 2]));
console.log(threeSum([-1, 0, 1, 0]));
console.log(threeSum([0, 0, 0]));
console.log(threeSum([3, 0, -2, -1, 1, 2]));
console.log(threeSum([-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6]));