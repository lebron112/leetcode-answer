/* 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/subsets
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 遍历即可 每次循环到一个数字 先生成数组 然后递归的生成新的子集即可

var subsets = function (nums) {
  if (!nums.length) return [];
  const res = [[]];
  // 每次都递归
  const dfs = (list, index) => {
    res.push(list);
    while (++index < nums.length) {
      const copy = [...list];
      copy.push(nums[index]);
      dfs(copy, index);
    }
  };
  for (let i = 0; i < nums.length; i++) {
    dfs([nums[i]], i);
  }
  return res;
};
console.log(subsets([1, 2, 3]));
console.log(subsets([1, 2, 3, 4]));