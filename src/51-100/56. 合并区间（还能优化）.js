/* 给出一个区间的集合，请合并所有重叠的区间。 

示例 1:

输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2:

输入: intervals = [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
注意：输入类型已于2019年4月15日更改。 请重置默认代码定义以获取新方法签名。

提示：
intervals[i][0] <= intervals[i][1]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-intervals
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 暴力法 先排序 里面每一项
var merge = function (intervals) {
  // 排序
  intervals.sort((a, b) => a[0] - b[0]);
  // 进行递归
  for (let i = 0; i < intervals.length; i++) {
    const [preSt, preEt] = intervals[i];
    if (!intervals[i + 1]) return intervals;
    const [nextSt, nextEt] = intervals[i + 1];
    // 如果后一项的 头小于等于前一项的头  且后一项的尾 小于等于前一项的尾 则进行合并
    if (preSt <= nextEt && nextSt <= preEt) {
      // 把新的那个改成前一项的头  尾改成2个尾较大的那个数
      intervals[i] = [preSt, Math.max(nextEt, preEt)];
      intervals.splice(i + 1, 1);
      i--;
    }
  }
  return intervals;
};

const sort = (arr, left = 0, right = arr.length - 1) => {
  if (left >= right) return;
  let l = left;
  let r = right;
  const baseVal = arr[r];
  while (l < r) {
    while (l < r && arr[l] <= baseVal) {
      l++;
    }
    arr[r] = arr[l];
    while (l < r && arr[r] >= baseVal) {
      r--;
    }
    arr[l] = arr[r];
  }
  arr[r] = baseVal;
  sort(arr, left, r - 1);
  sort(arr, r + 1, right);
  return arr;
};
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));
console.log(merge([[1, 4], [0, 4]]));
console.log(merge([[2, 3], [5, 5], [2, 2], [3, 4], [3, 4]]));

console.log(sort([12, 5, 6, 78, 59, 54, 2, 48, 90, 38]))