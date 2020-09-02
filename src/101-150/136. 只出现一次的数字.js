/* 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:

输入: [2,2,1]
输出: 1
示例 2:

输入: [4,1,2,1,2]
输出: 4

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/single-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 暴力法 遍历所有的数字 查找后面索引是否含有
var singleNumber1 = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    let index = nums.indexOf(nums[i], i + 1);
    if (index !== -1) {
      nums.splice(index, 1);
      nums.splice(i, 1);
      i -= 2;
    }
  }
  return nums[0];
}
// hash字典记录 速度较快但是占用额外运行空间 O(2n)
var singleNumber1 = function (nums) {
  const hashStore = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (!hashStore[num]) {
      hashStore[num] = 1;
    } else {
      hashStore[num] = hashStore[num] + 1;
    }
  }
  for (const i in hashStore) {
    if (hashStore[i] === 1) {
      return Number(i);
    }
  }
}
// 位运算异或
var singleNumber1 = function (nums) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    // 当遇到相同时res 就会是上一次出现单次的那个值
    res = res ^ nums[i];
  }
  return res;
};