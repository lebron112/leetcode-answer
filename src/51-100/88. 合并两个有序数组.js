/* 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

 

说明:

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 

示例:

输入:
nums1 = [1,3,4,0,0,0], m = 3
nums2 = [2,3,5,6],       n = 3

输出: [1,2,2,3,5,6]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-sorted-array */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 插值排序
// 先把数组1后面的0全部去除掉
// 然后循环数组一 对比 数组2的每一个头 挨个比较 插入即可 
// 最后若循环结束数组2 还有剩余 那么后面的数字一定是比数组1里最后一个还大的 直接插入即可
var merge = function (nums1, m, nums2, n) {
  nums1.length > m && nums1.splice(m, nums1.length - m);
  for (let i = 0; i < nums1.length; i++) {
    const first = nums2[0];
    let next = nums1[i + 1];
    const pre = nums1[i];
    if (first !== undefined) {
      if (next !== undefined) {
        if (first >= pre && first <= next) {
          nums1.splice(i + 1, 0, nums2.shift());
        } else if (first <= pre) {
          nums1.splice(i, 0, nums2.shift());
        }
      } else {
        first >= pre ? nums1.push(nums2.shift()) :
         nums1.splice(i, 0, nums2.shift());
      }
    } else {
      break;
    }
  }
  while (nums2.length) {
    nums1.push(nums2.shift());
  }
};
// console.log(merge([1, 2, 3, 0, 0,], 3, [4, 6]))
// console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6]))
// console.log(merge([4, 5, 6, 0, 0,], 3, [1, 2, 3], 0))
// console.log(merge([2, 0,], 1, [1], 0));
// console.log(merge([-1, 0, 0, 3, 3, 3, 0, 0, 0], 6, [1, 2, 2], 3));
// console.log(merge([-1, 0, 1, 1, 0, 0, 0, 0, 0], 4, [-1, 0, 2, 2, 3], 5));