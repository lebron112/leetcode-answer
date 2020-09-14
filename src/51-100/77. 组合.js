/* 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

示例:

输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combinations
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// 排列问题
// dfs搜索树即可

var combine = function (n, k) {
  let res = [];
  if (k === 0) return [[]];
  const dfs = (item, j) => {
    if (item.length === k) {
      res.push(item);
    } else {
      // 进行循环排列即可 每次循环放入一个数字
      while(j + 1 < n) {
        const list = [...item];
        j++;
        list.push(j + 1);
        dfs(list, j);
      }
    }
  };
  for (let i = 0; i < n; i++) {
    dfs([i + 1], i);
  }
  return res;
};

console.log(combine(4, 2));