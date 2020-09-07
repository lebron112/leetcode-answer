/* 给定一个非负整数数组，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

你的目标是使用最少的跳跃次数到达数组的最后一个位置。

示例:

输入: [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
说明:

假设你总是可以到达数组的最后一个位置。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/jump-game-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} path
 * @return {string}
 */
// 动态规划
// 找出可以跳的距离内 跳的距离+到达那个位置后 可以到的最大值 即跳到某个位置后还能走的最远距离
// 如果一定距离内有相同的最大值，走到后面的哪个最大值再跳跃
// 拆分子问题， 变为在跳跃距离内，求出索引靠后的最大值的索引位
// 最后的情况处理，当剩下的步数正好能走完时直接加上当前索引位置的值 并让次数加1
// O(n) 次即可完成
var simplifyPath = function (nums) {
  // 长度只有1个 不用跳
  if (nums.length <= 1) return 0;
  // 特殊情况判断 只需一步就走完
  if (nums[0] >= nums.length - 1) return 1;
  let time = 0;
  const findMax = (index) => {
    let maxIndex = 1;
    let max = nums[index + 1] + 1;
    for (let i = 1; i <= nums[index]; i++) {
      if (nums[i + index] + i >= max) {
        max = nums[i + index] + i;
        maxIndex = i;
      }
    }
    return maxIndex;
  };
  for (let i = 0; i < nums.length - 1;) {
    // 找出本次能跳到的位置 + 下次可以到最远的 那个索引位
    i += findMax(i);
    time++;
    // 如果跳到当前位置 在当前索引位下能走完 那么只需要再走一步即可
    if (nums[i] + i >= nums.length - 1) {
      i += nums[i];
      time++;
    }
  }
  return time;
};
console.log(simplifyPath([2, 3, 0, 1, 4]));
console.log(simplifyPath([0]));
console.log(simplifyPath([5, 9, 3, 2, 1, 0, 2, 3, 3, 1, 0, 0]));
console.log(simplifyPath([1, 1, 1, 1]));
console.log(simplifyPath([5, 4, 0, 1, 3, 6, 8, 0, 9, 4, 9, 1, 8, 7, 4, 8]));
console.log(simplifyPath([3, 4, 3, 2, 5, 4, 3]));
console.log(simplifyPath([7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3]))