/* 编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

输入: ["flower","flow","flight"]
输出: "fl"
示例 2:

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let res = '';
  let i = 1;
  let j = 0;
  let hasBreak = false;
  if (!strs.length) return '';
  if (strs.length === 1) return strs[0];
  lab: for (j = 0; j < strs[0].length; j++) {
    res = res + strs[0][j];
    i = 1;
    labIn: for (; i < strs.length; i++) {
      if (strs[i].indexOf(res)) {
        hasBreak = true;
        if (i === 1 && j === 0) return '';
        break lab;
      }
    }
  }
  return hasBreak ? res.slice(0, -1) : res;
};

console.log(longestCommonPrefix(["c", "acc", "ccc"]));
console.log(longestCommonPrefix(["aa", "ab"]));
console.log(longestCommonPrefix(["c", "c", "c"]));
console.log(longestCommonPrefix(["flower", "flow", "flight"]));