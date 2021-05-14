/* 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

说明：

所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。 
示例 1:

输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
示例 2:

输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
/* 
  解题思路
 */
var combinationSum2 = function (candidates, target) {
  const res = [];
  candidates.sort((a, b) => a - b);
  // console.log(candidates);
  const dfs = (total, arr, i) => {
    if (i === candidates.length) return;
    if (total === 0) {
      res.push(arr);
    } else {
      dfs(total, arr, i + 1);
      const v = candidates[i + 1];
      if (total - v >= 0) {
        dfs(total - v, [...arr, v], i);
      }
    }
  };
  dfs(target, [], 0);
  return res;
};
console.log(combinationSum2([5, 3, 2], 7));
console.log(combinationSum2([3, 5, 8], 11));
console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
console.log(combinationSum2([2, 5, 2, 1, 2], 5));