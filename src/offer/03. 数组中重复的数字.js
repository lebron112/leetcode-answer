/* 找出数组中重复的数字。


在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

示例 1：

输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// hash
var findRepeatNumber = function (nums) {
  const hash = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (!hash.get(nums[i])) {
      hash.set(nums[i], true);
    } else {
      return nums[i];
    }
  }
};
/* 原地交换
  交换 nums[索引] 和 nums[索引值]的位置 如果索引值那项正好和索引相同 则跳过
  直到找到一项  nums[索引] 和 nums[索引值]相同 且索引和索引值不同的 就是重复元素
*/
const findRepeatNumber2 = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    let item = nums[i];
    if (nums[item] !== nums[i]) {
      [nums[item], nums[i]] = [nums[i], nums[item]];
    } else {
      if (nums[i] !== i) {
        return item;
      }
    }
  }
};

const { testFn } = require('../utils');
// testFn(findRepeatNumber2, [2, 3, 1, 0, 2, 5, 3]);
testFn(findRepeatNumber2, [0, 1, 2, 3, 4, 11, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
