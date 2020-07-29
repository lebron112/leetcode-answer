/* 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

 

示例 1:

输入: [3,2,3]
输出: 3
示例 2:

输入: [2,2,1,1,1,2,2]
输出: 2

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/majority-element
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 暴力法 把每个数的出现次数记录到一个对象中 遇到就 +1 然后找出最大的那个值的 key
var majorityElement = function (nums) {
  let obj = {};
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    if (obj[num] === undefined) {
      obj[num] = 1;
    } else {
      obj[num] = obj[num] + 1;
    }
  }
  let max = Math.max(...Object.values(obj));
  for (let key in obj) {
    if (obj[key] === max) {
      return Number(key);
    }
  }
};
// 从第一个数开始count=0，遇到相同的就加1，遇到不同的就减1，减到0就重新换个数开始计数，总能找到最多的那个
var majorityElement = function (nums) {
  let index = 1;
  let res = nums[0]
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    if (num === res) {
      index++
    } else {
      index--;
    }
    if (index === 0) {
      res = nums[i + 1];
    }
  }
  return res;
};