/* 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:

输入: "()"
输出: true
示例 2:

输入: "()[]{}"
输出: true
示例 3:

输入: "(]"
输出: false
示例 4:

输入: "([)]"
输出: false
示例 5:

输入: "{[]}"
输出: true

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-parentheses
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let a = 0, // () 
    b = 0, // {}
    c = 0; //[]
  let str = [];
  // let str = '';
  // 模拟栈的对应关系，匹配的时候将栈的最后一个取出，如果不匹配则直接返回false
  if (s.length % 2 !== 0) return false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '[') {
      if (c >= 0) {
        c++;
        str.push(']');
        // str +=']';
      }
    }
    if (s[i] === '{') {
      if (b >= 0) {
        b++;
        str.push('}');
        // str +='}';
      }
    }
    if (s[i] === '(') {
      if (a >= 0) {
        a++;
        str.push(')');
        // str +=')';
      }
    }
    if (s[i] === ']') {
      if (c >= 1) {
        c--;
      }
      if (str[str.length - 1] === s[i]) {
        // str = str.slice(0, -1);
        str.pop();
      } else {
        return false;
      }
    }
    if (s[i] === '}') {
      if (b >= 1) {
        b--;
      }
      if (str[str.length - 1] === s[i]) {
        // str = str.slice(0, -1);
        str.pop();
      } else {
        return false;
      }
    }
    if (s[i] === ')') {
      if (a >= 1) {
        a--;
      }
      if (str[str.length - 1] === s[i]) {
        // str = str.slice(0, -1);
        str.pop();
      } else {
        return false;
      }
    }
  }

  if (a === 0 && b === 0 && c === 0 && !str.length) {
    return true;
  }
  return false;
};
console.log(isValid("()[]"));
console.log(isValid("([)]"));
console.log(isValid("{(})}"));