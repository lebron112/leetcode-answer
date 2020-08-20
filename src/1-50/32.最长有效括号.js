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

//  包含动态规划和栈的问题 解题时要转化思路 分解为多个子问题
// 利用栈的先进先出实现 把无法匹配的位置置为1 所有能匹配的位置置为0 最后变为求最大连续0的长度 
// 需要拆分问题为2部分 第一部分，利用栈的先进后出 匹配括号 第二部分 变为求解最大连续0的长度
const longestValidParentheses = (s) => {
  let stack = [];
  let stackNum = [];
  // 倒序查找到最后一个1 置为0
  const toZero = () => {
    let i = stackNum.length - 1;
    while (i >= 0) {
      if (stackNum[i] === 1) {
        stackNum[i] = 0;
        break;
      } else {
        i--;
      }
    }
  }
  // 模拟栈的部分
  for (let i = 0; i < s.length; i++) {
    // 不存在长度时直接丢入栈底
    if (!stack.length) {
      stack.push(s[i]);
      stackNum.push(1);
    } else {
      // 左括号丢入栈顶 01栈丢入1
      if (s[i] === '(') {
        stack.push(s[i]);
        stackNum.push(1);
      } else {
        // 一对括号 () 如果最后一个可以匹配 则消掉栈顶的第一个元素 并且对 01栈 倒序最后一个1 置为0 
        // 否则丢入栈顶 同时 01栈丢入数字1
        if (stack[stack.length - 1] === '(') {
          stack.pop();
          toZero();
        } else {
          stack.push(s[i]);
          stackNum.push(1);
        }
      }
    }
  }
  let len = 0;
  let max = 0;
  // 最后只需要记录最长连续0的的长度即可
  for (let i = 0; i < stackNum.length; i++) {
    if (stackNum[i] === 0) {
      len++;
      max = Math.max(len, max);
    } else {
      len = 0;
    }
  }
  return max * 2;
};
console.log(longestValidParentheses("(()(((()"));//[1,0,1,1,1,0]
console.log(longestValidParentheses("(((()())(()")); // [1,1,]
console.log(longestValidParentheses(")()())()()("));

// console.log(longestValidParentheses("((()))())"));
// console.log(longestValidParentheses("())"));
// console.log(longestValidParentheses("()((()"));// 2
// console.log(longestValidParentheses("())((()")); // 2
// console.log(longestValidParentheses("(())((()")); //4
// console.log(longestValidParentheses('((()())())'));//10
// console.log(longestValidParentheses("(())())))()(())"));
// console.log(longestValidParentheses(")()())"));
// console.log(longestValidParentheses("(())())))'()((()())())"));
console.log(longestValidParentheses("(())())))()((()())())"));