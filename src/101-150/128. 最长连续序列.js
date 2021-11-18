/* 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

 

示例 1：

输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
示例 2：

输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
 

提示：

0 <= nums.length <= 105
-109 <= nums[i] <= 109

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-consecutive-sequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 连续的
/*  
  用哈希表存储每个端点值对应连续区间的长度
  记录的是当前数字上的连续长度
  记录后，需要更新端点的长度，
    左端点为 n - (n上一个的长度)
    右端点为 n + (n下一个的长度)
 */
var longestConsecutive = function (nums) {

  const hashMap = new Map();
  let maxLen = 0;
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (!hashMap.has(n)) {
      const left = hashMap.get(n - 1) || 0;
      const right = hashMap.get(n + 1) || 0;
      const len = left + right + 1;
      maxLen = Math.max(maxLen, len);
      hashMap.set(n, len);
      // 更新2个端点的长度
      hashMap.set(n - left, len);
      hashMap.set(n + right, len);
      // console.log(n , n - left, n + right)
    } 
  }
  return maxLen;
};
// 4 连续序列 [4,1,3,2]
// console.log(longestConsecutive([100, 4, 200, 1, 3, 2])) 
//9 连续序列[3, 7, 2, 5, 8, 4, 6, 0, 1]
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));