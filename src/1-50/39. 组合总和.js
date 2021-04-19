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
/*  回溯算法dfs算法 利用递归 
  解题思路， 暴击解决法
  循环：从candidates的每一项开始
  计算下一项加当前存储值和若小于 目标值，继续进行dfs查找
  直到和未目标值，结束递归
  需要对特殊情况进行处理，并去重
*/
var combinationSum = function (candidates, target) {
  const res = [];
  const hash = new Map();
  const dfs = (arr, index, sum) => {
    if (index > candidates.length) return;
    const item = candidates[index];
    if (arr.length === 0) {
      if (item < target) {
        arr.push(item);
        // 进行dfs
        for (let i = index; i < candidates.length; i++) {
          dfs(arr, i, item);
        };
      } else if (item === target) {
        res.push([item]);
      }
    } else {
      const total = sum + item;
      if (total < target) {
         // 进行dfs
        for (let i = index; i < candidates.length; i++) {
          dfs([...arr, item], i, total);
        };
      } else if (total === target) {
        const result = [...arr, item];
        // 去重
        if (!hash.get(result)) {
          hash.set(result, 1);
          res.push(result);
        }
      }
    }
  };
  for (let i = 0; i < candidates.length; i++) {
    dfs([], i, 0);
  }
  return res;
};
console.log(combinationSum([5, 3, 2], 7));
console.log(combinationSum([5, 3, 2], 8));
console.log(combinationSum([7, 6, 3, 2], 7));
console.log(combinationSum([3, 5, 8], 11));
// console.log(combinationSum([2], 8));

// console.log(combinationSum([4, 3, 2], 24));

// console.log(combinationSum([7, 6, 3, 2], 9));
// console.log(combinationSum([2, 1], 1));
// console.log(combinationSum([2, 1], 2));
// console.log(combinationSum([2, 1], 4));

// console.log(combinationSum([5, 4, 3, 2, 1], 120));