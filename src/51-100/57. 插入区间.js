/* 给出一个无重叠的 ，按照区间起始端点排序的区间列表。

在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

 

示例 1：

输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
输出：[[1,5],[6,9]]
示例 2：

输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出：[[1,2],[3,10],[12,16]]
解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/insert-interval
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处 */
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
// 暴力法 合并区间后排序 排序完和执行合并区间相同的操作
var insert = function (intervals, newInterval) {
  intervals.push(newInterval);
  // 排序
  intervals.sort((a, b) => a[0] - b[0]);
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