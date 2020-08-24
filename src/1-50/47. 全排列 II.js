
/* 给定一个可包含重复数字的序列，返回所有不重复的全排列。

示例:

输入: [1,1,2]
输出:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
] */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 暴力法 找出所有可能 然后去重
var permuteUnique = function (nums) {
  var permute = function (nums) {
    const result = [];
    if (nums.length === 1) result.push(nums);
    const mulSort = (start, arr) => {
      let i = 0;
      const res = [];
      if (arr.length > 2) {
        const copy = [...arr];
        for (let i = 0; i < copy.length; i++) {
          const [head] = copy.splice(i, 1);
          copy.unshift(head);
          const resIn = mulSort(head, copy.slice(1));
          res.push(...resIn.map(item => [start, ...item]));
        }
      } else {
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
      const copy = [...nums];
      const [head] = copy.splice(i, 1);
      copy.unshift(head);
      const res = mulSort(head, copy.slice(1));
      result.push(...res);
    }
    return result;
  };
  // 去重
  let result = permute(nums);
  result = Array.from(new Set(permute(nums).map(item => item.join(',')))).map(item => item.split(','))
  return result;
};