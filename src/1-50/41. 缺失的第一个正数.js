/* 给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。

 

示例 1:

输入: [1,2,0]
输出: 3
示例 2:

输入: [3,4,-1,1]
输出: 2
示例 3:

输入: [7,8,9,11,12]
输出: 1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/first-missing-positive
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 暴力 排序后 再根据政府判断
var firstMissingPositive = function (nums) {
  if (!nums.length) return 1;
  nums.sort((a, b) => a - b);
  // 排序完最后一个小于 0 那么直接返回1  排序完第一个比2大 也返回1
  if (nums[nums.length - 1] < 0 || nums[0] >= 2) return 1;
  for (let i = 0; i < nums.length - 1; i++) {
    const next = nums[i + 1];
    const now = nums[i];
    if (next !== undefined) {
      // 前后都是大于 0 的 情况
      if (next > 0 && now >= 0) {
        if (next - now > 1) {
          return now + 1;
        }
        // 前者小于0 后者大于0
      } else if (next > 0 && now < 0) {
        if (next > 1) return 1;
      }
    }
  }
  return nums[nums.length - 1] + 1;
};
console.log(firstMissingPositive([3, 4, -1, 1]));
