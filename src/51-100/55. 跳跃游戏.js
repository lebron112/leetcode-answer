/* 给定一个非负整数数组，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个位置。

示例 1:

输入: [2,3,1,1,4]
输出: true
解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。
示例 2:

输入: [3,2,1,0,4]
输出: false
解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ， 所以你永远不可能到达最后一个位置。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/jump-game
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 类似积攒能量，在索引0出开始代表第一次可以跳的最远距离，
// 接下来每跳一步获取到达索引处的能量 如果获取的能量和不足以到下一步，则永远无法到达
var canJump = function (nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    // 攒的能量不足以到下一步 就直接跳出循环
    if (i > sum) return false;
    // 跳跃攒的能量等于最远能够到达的步数
    sum = Math.max(sum, i + num);
    // 在没到终点时能量总和大于长度 说明一定可以到达 直接跳出循环 
    if (i < nums.length - 1 && sum > nums.length - 1) return true;
  }
  return true;
};
// console.log(canJump([0]));
// console.log(canJump([1, 2, 3]));
// console.log(canJump([0, 1]));
console.log(canJump([2, 3, 1, 1, 4]));
// console.log(canJump([2, 0]));
// console.log(canJump([2, 0, 0]));
console.log(canJump([3, 2, 1, 0, 4]));
// console.log(canJump([2, 0, 0, 0]));
// console.log(canJump([1, 1, 2, 2, 0, 1, 1]))