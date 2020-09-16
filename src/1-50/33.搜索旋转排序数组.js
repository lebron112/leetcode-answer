/* 假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 O(log n) 级别。

示例 1:

输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
示例 2:

输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
// 暴力法 O(n)的复杂度
const search = function (nums, target) {
  return nums.indexOf(target);
};
// 二分搜索 递归
// 取一个中间值 中间值等于 1段区间内中间的那个数字
// 如果起始数字大于等于末尾数字 则找不到
// 如果目标值 大于起始位置且小于中间位置 取前面部分递归查找
// 如果起始位置大于中间值,且 中间值比目标值小 说明前半部分进行了翻转  后面部分是顺序排列的
// 或者尾巴数字比目标值小,且 中间值小于尾巴值 说明后面是顺序排列的，一定不在后面部分
// 如果都不满足上面的情况 那么就从后面那部分找
const search2 = function (nums, target) {
  const find = (start, end) => {
    // 取中间索引
    const mid = start + Math.floor((end - start) / 2);
    if (nums[mid] === target) return mid;
    if (start >= end) return -1;
    if (target >= nums[start] && target <= nums[mid]) {
      return find(start, mid - 1);
    } else {
      if (nums[start] > nums[mid] && nums[mid] > target ||
        nums[end] < target && nums[mid] < nums[end]) {
        return find(start, mid - 1);
      }
      return find(mid + 1, end);
    }
  };
  return find(0, nums.length - 1);
}

console.log(search2([2, 3, 4, 5, 6, 7, 8, 0, 1], 0));
console.log(search2([4, 5, 6, 7, 0, 1, 2], 3));
console.log(search2([5, 1, 3], 5));
console.log(search2([5, 1, 3], 3));
console.log(search2([1, 3], 3));
console.log(search2([1, 2, 3, 4, 5, 6], 4));
console.log(search2([5, 1, 2, 3, 4], 1));
console.log(search2([5, 1, 2, 3, 4], 3));
console.log(search2([4, 5, 1, 2, 3], 5));
console.log(search2([4, 5, 6, 7, 8, 1, 2, 3], 8));
console.log(search2([1], 5));