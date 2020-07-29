/* 实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须原地修改，只允许使用额外常数空间。

以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/next-permutation
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

var nextPermutation = (nums) => {
  if (!nums || !nums.length) return nums;
  let i = nums.length;
  let j;
  let numVal
  while (i > 0) {
    for (j = 0; j < i - 1; j++) {
      if (nums[j] < nums[j + 1]) {
        [nums[j + 1], nums[j]] = [nums[j], nums[j + 1]];
      }
      numVal = Number([...nums].reverse().join(''));
      console.log(numVal);
    }
    // return nums.reverse();
    i--;
  }
  if (i === 0) {
    // nums.reverse();
  }
};
// var ar = [3, 2, 4, 9, 1, 5, 7, 6, 8];
// // nextPermutation(ar);
// console.log(ar);

// let arr = [1, 3, 2, 4];
// nextPermutation(arr);
// console.log(arr);

// let arr1 = [1, 2, 3];
// nextPermutation(arr1);
// console.log(arr1);

const arr_ = [1, 3, 2];
nextPermutation(arr_);
console.log(arr_);

// const arr2 = [3, 2, 1];
// nextPermutation(arr2);
// console.log(arr2);

// const arr3 = [1, 1, 5];
// nextPermutation(arr3);
// console.log(arr3);

// const arr5 = [6, 7, 5, 3, 5, 6, 2, 9, 1, 2, 7, 0, 9];
// nextPermutation(arr5);
// console.log(arr5);