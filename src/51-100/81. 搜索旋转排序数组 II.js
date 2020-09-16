/* 假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,0,1,2,2,5,6] 可能变为 [2,5,6,0,0,1,2] )。

编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 true，否则返回 false。

示例 1:

输入: nums = [2,5,6,0,0,1,2], target = 0
输出: true
示例 2:

输入: nums = [2,5,6,0,0,1,2], target = 3
输出: false
进阶:

这是 搜索旋转排序数组 的延伸题目，本题中的 nums  可能包含重复元素。
这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
// 同33题 2分查找 多了一次去重的计算
// 即起始位的数字 和末索引位的数字 相同，则 尾索引一直减
// 第二种情况 倒数第一个数字和倒数第二个 数字相同 再缩减范围即可
var search = function (nums, target) {
  const find = (start, end) => {
    while (nums[start] === nums[end] && end > 0 && start !== end) {
      end--;
    }
    while (nums[end] === nums[end - 1] && end > 0) {
      end--;
    }
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
  return find(0, nums.length - 1) ;
};

// console.log(search([2, 5, 6, 0, 0, 1, 2], 0));
// console.log(search([2, 5, 6, 0, 0, 1, 2], 3));
console.log(search([ 1, 2, 3], 3));
