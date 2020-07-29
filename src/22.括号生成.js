/* 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。

例如，给出 n = 3，生成结果为：

[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/generate-parentheses */
/**
 * @param {number} n
 * @return {string[]}
 */
// 最暴力的方法
var generateParenthesis = function (n) {
  const m = (strs, index) => {
    if (index === n) return strs;
    const res = [];
    for (let i = 0; i < strs.length; i++) { 
      for(let j = 0; j < strs[i].length; j++){
        const str = strs[i];
        const news = str.slice(0, j) + '()' + str.slice(j);
        if(res.indexOf(news) === -1) res.push(news);
      }
    }
    return m(res, index + 1);
  };
  return m(['()'], 1)
};
console.log(generateParenthesis(3));
console.log(generateParenthesis(4));
const x = ["(())(())"];