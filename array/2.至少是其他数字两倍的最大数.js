/* 在一个给定的数组nums中，总是存在一个最大元素 。

查找数组中的最大元素是否至少是数组中每个其他数字的两倍。

如果是，则返回最大元素的索引，否则返回-1。

示例 1:

输入: nums = [3, 6, 1, 0]
输出: 1
解释: 6是最大的整数, 对于数组中的其他整数,
6大于数组中其他元素的两倍。6的索引是1, 所以我们返回1.
 

示例 2:

输入: nums = [1, 2, 3, 4]
输出: -1
解释: 4没有超过3的两倍大, 所以我们返回 -1. */
var dominantIndex = function (nums) {
  // 想找出最大值的索引 并记录
  const max = Math.max.apply(null, nums);
  let res = nums.indexOf(max);
  for (let i = 0; i < nums.length; i++) {
    if (i !== res) {
      // 一旦没有超过2倍 就返回-1
      if (max / nums[i] < 2) res = -1;
    }
  }
  return res;
};
console.log(dominantIndex([3, 6, 1, 0]))
console.log(dominantIndex([1, 2, 3, 4]))