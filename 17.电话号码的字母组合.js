/* 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。



示例:

输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if(!digits.length) return [];
  const numbers = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };
  const res = [];
  for (let i = 0; i < digits.length; i++) {
    const digit = numbers[digits[i]];
    res.push(digit.split(''));
  }
  // 因循环的数量不固定 可以使用递归循环组合 将每一次需要循环的数量作为下一次的循环组合
  const m = (list, index) => {
    if(index >= res.length) return list;
    const result = [];
    for(let i  = 0; i < list.length; i ++) {
      for(let j = 0; j < res[index].length; j++){
        result.push(list[i] + res[index][j]);
      }
    }
    return m(result, index + 1);
  };
  return m(res[0], 1);
};
console.log(letterCombinations('234'));