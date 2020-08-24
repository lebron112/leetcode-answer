/* 给定一个 没有重复 数字的序列，返回其所有可能的全排列。

示例:

输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/permutations
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

//  递归或回溯
var permute = function (nums) {
  const result = [];
  if (nums.length === 1) result.push(nums);
  const mulSort = (start, arr) => {
    let i = 0;
    const res = [];
    // 如果长度大于二 则拆分进行拆分 直到拆分成arr 参数长度等于2为止
    if (arr.length > 2) {
      const copy = [...arr];
      for (let i = 0; i < copy.length; i++) {
        // 拆分 头和后面的数字进行排列
        const [head] = copy.splice(i, 1);
        copy.unshift(head);
        // 递归调用
        const resIn = mulSort(head, copy.slice(1));
        // 对每一项进行最前插入头
        res.push(...resIn.map(item => [start, ...item]));
      }
    } else {
      // 低于或等于2个的时候进行全排序
      while (i < arr.length) {
        let head = arr.shift();
        arr.push(head);
        res.push([start, ...arr]);
        i++;
      }
    }
    return res;
  };

  for (let i = 0; i < nums.length; i++) {
    const copy = [...nums]
    // 取第一个 对第一个及后面的数进行全排序
    const [head] = copy.splice(i, 1);
    copy.unshift(head);
    const res = mulSort(head, copy.slice(1));
    result.push(...res);
  }
  return result;
};
console.log(permute([1]));
console.log(permute([1, 2]));
console.log(permute([1, 2, 3]));
console.log(permute([1, 2, 3, 4]).length);
