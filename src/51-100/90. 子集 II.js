/* 给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

输入: [1,2,2]
输出:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/subsets-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 同78题 这题要先排序 排序完成之后用一个hash记录已经出现过的值
// 从hash里去重即可
var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [[]];
  const hashStore = {};
  const dfs = (list, index) => {
    const key = list.join('-');
    if (hashStore[key]) {
      hashStore[key] = 1;
      res.push(list);
    }
    for (let i = index + 1; i < nums.length; i++) {
      const copy = [...list];
      copy.push(nums[i]);
      dfs(copy, i);
    }
  };
  for (let i = 0; i < nums.length; i++) {
    dfs([nums[i]], i);
  }
  return res;
};