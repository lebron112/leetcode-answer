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
// 二分搜索
const search2 = function (nums, target) {
  const find = (start, end) => {
    // console.log(start, end)
    const mid = start + Math.floor((end - start) / 2);
    if (nums[mid] === target) return mid;
    if (nums[end] === target) return end;
    if (nums[start] === target) return start;
    if (start >= end) return -1;
    if (target >= nums[start] && target <= nums[mid]) {
      return find(start, mid - 1);
    } else {
      if (nums[start] > nums[mid] && nums[mid] > target || nums[end] < target && nums[mid] < nums[end]) {
        return find(start, mid);
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