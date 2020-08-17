/* 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

说明：

所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 
示例 1：

输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[
  [7],
  [2,2,3]
]
示例 2：

输入：candidates = [2,3,5], target = 8,
所求解集为：
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let res = [];
  candidates = candidates.sort((a, b) => b - a);
  const loop = (startIndex, loopRes, loopTarget) => {
    let item = candidates[startIndex];
    if (!item) return;
    while (loopTarget >= item) {
      loopTarget -= item;
      loopRes.push(item);
    }
    console.log(loopRes,  loopTarget, item);
    if (loopTarget === 0) {
      res.push(loopRes);
    } else {
      startIndex++;
      const next = candidates[startIndex];
      if (next > loopTarget) {
        loopRes.pop();
        loopTarget += item;
      }
      loop(startIndex, loopRes, loopTarget);
    }
  };
  for (let i = 0; i < candidates.length; i++) {
    const item = candidates[i];
    if (item > target) break;
    // if (i == 1)
    loop(i, [], target);
  }
  return res;
};
console.log(combinationSum([5, 3, 2], 7));
// console.log(combinationSum([2], 8));

// console.log(combinationSum([4, 3, 2], 24));

// console.log(combinationSum([7, 6, 3, 2], 9));


// console.log(combinationSum([2, 1], 1));
// console.log(combinationSum([2, 1], 2));
// console.log(combinationSum([2, 1], 4));

// console.log(combinationSum([5, 4, 3, 2, 1], 120));