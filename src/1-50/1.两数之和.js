/* 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

 

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

// 暴力法 双层循环查找
const twoSum = function (nums, target) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        res.push(i, j);
        return res;
      }
    }
  }
  return res;
};

// 优化
// 用一个hash 记录 target - nums[i] 或者 nums[i] 即可 一次循环
const twoSum2 = function (nums, target) {
  const res = [];
  const hashMap = {};
  for (let i = 0; i < nums.length; i++) {
    const dis = target - nums[i];
    if (hashMap[dis] !== undefined) {
      res[0] = hashMap[dis];
      res[1] = i;
      break;
    } else {
      hashMap[nums[i]] = i;
    }
  }
  return res;
};
// test 
console.log(twoSum2([2, 7, 11, 15], 9));
// console.log(twoSum2([3, 2, 4], 6));