/* 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 O(log n) 级别。

如果数组中不存在目标值，返回 [-1, -1]。

示例 1:

输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
示例 2:

输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const mid = Math.floor((nums.length - 1) / 2);
  let st = 0;
  let et = nums.length - 1;
  const res = [];
  if (nums[0] > target || nums[nums.length - 1] < target) {
    return [-1, -1];
  }
  if (nums[mid] < target) st = mid;
  while (st <= et) {
    if (res[0] !== undefined && res[1] !== undefined) {
      break
    }
    if (nums[st] === target) {
      res[0] = st;
    } else {
      st++;
    }
    if (nums[et] === target) {
      res[1] = et;
    } else {
      et--;
    }
  }
  if (st > et) return [-1, -1];
  if (st === et && nums[st] !== target) return [-1, -1];
  return res;
};

console.log(searchRange([1,2,3,3,3,3,4,5,9], 3));
console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
console.log(searchRange([5, 7, 7, 8, 8, 10], 7));
console.log(searchRange([5, 7, 7, 8, 8, 10], 6));