/* 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

 

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

 

示例 1:

输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
输出: 2


限制：

1 <= 数组长度 <= 50000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 普通hash map
var majorityElement = function (nums) {
  const map = new Map();
  const len = nums.length / 2;
  for (let i = 0; i < nums.length; i++) {
    let num = 1;
    if (!map.has(nums[i])) {
      map.set(nums[i], num);
    } else {
      num = map.get(nums[i]);
      map.set(nums[i], num + 1);
    }
    if (num > len) {
      return nums[i];
    }
  }
};
// 摩尔投票法 遇见相同就加，否则就减
var majorityElement2 = function (nums) {
  let count = 0;
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) {
      res = nums[i];
      count++;
    } else {
      res === nums[i] ? (count++) : (count--);
    }
  }
  return res;
};
