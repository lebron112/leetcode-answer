/* 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

示例 1:

输入: "(()"
输出: 2
解释: 最长有效括号子串为 "()"
示例 2:

输入: ")()())"
输出: 4
解释: 最长有效括号子串为 "()()"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
// 利用栈的先进先出实现
var longestValidParentheses = function (s) {
  const exc = (s, maxLen = 0, i = 0) => {
    if (!s.length) return maxLen;
    // 用一个栈存储()
    let stack = [];
    let len = 0;
    let max = 0;
    for (let i = 0; i < s.length; i++) {
      if (!stack.length) {
        stack.push(s[i]);
      } else {
        if (s[i] === '(') {
          stack.push(s[i]);
        } else {
          if (stack[stack.length - 1] === ')') {
            len = 0;
          }
          if (stack[stack.length - 1] === '(') {
            stack.pop();
            len++;
            max = Math.max(len, max);
            console.log(max, maxLen, '---');
            if (!stack.length) {
              return exc(s.slice(i + 1), max + maxLen, i + 1);
            }
          }
        }
      }
    }
    return Math.max(max, maxLen);
  };
  const res = exc(s, 0, 0)
  return res * 2;
};
console.log(longestValidParentheses("(()(((()"));
// console.log(longestValidParentheses(")()())()()("));

// console.log(longestValidParentheses("((()))())"));
// console.log(longestValidParentheses("())"));
// console.log(longestValidParentheses("()((()"));// 2
// console.log(longestValidParentheses("())((()")); // 2
// console.log(longestValidParentheses("(())((()")); //4
// console.log(longestValidParentheses('((()())())'));//10
// console.log(longestValidParentheses("(())())))()(())"));
// console.log(longestValidParentheses(")()())"));
// console.log(longestValidParentheses("(())())))'()((()())())"));
// console.log(longestValidParentheses("(())())))()((()())())"));