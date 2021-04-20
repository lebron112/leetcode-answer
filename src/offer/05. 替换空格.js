/* 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

 

示例 1：

输入：s = "We are happy."
输出："We%20are%20happy."
 

限制：

0 <= s 的长度 <= 10000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
const { testFn } = require('../utils');
/**
 * @param {string} s
 * @return {string}
 */
// ？为啥还考这种题
var replaceSpace = function (s) {
  // return s.replace(/[\s]/g,'%20');
  let str = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      str += '%20';
    } else {
      str += s[i];
    }
  }
  return str;
};
testFn(replaceSpace, "We are happy.") //"We%20are%20happy."