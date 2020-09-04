/* 验证给定的字符串是否可以解释为十进制数字。

例如:

"0" => true
" 0.1 " => true
"abc" => false
"1 a" => false
"2e10" => true
" -90e3   " => true
" 1e" => false
"e3" => false
" 6e-1" => true
" 99e2.5 " => false
"53.5e93" => true
" --6 " => false
"-+3" => false
"95a54e53" => false

说明: 我们有意将问题陈述地比较模糊。在实现代码之前，你应当事先思考所有可能的情况。这里给出一份可能存在于有效十进制数字中的字符列表：

数字 0-9
指数 - "e"
正/负号 - "+"/"-"
小数点 - "."
当然，在输入中，这些字符的上下文也很重要。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} s
 * @return {boolean}
 */
// 投机取巧
var isNumber = function (s) {
  s = s.trim();
  if (!s) return false;
  return !isNaN(s);
};
/* 
1、空格只能出现在开头或末尾
2、正负号只能在数字最前（或指数最前）出现，并且不能超过一个
3、.的前、后只要有数字就认为可以接受，如果前后都无数字则拒绝
4、e后只能出现正负号、纯数字和空格，并且至少有一位纯数字
 */
var isNumber = (s) => {
  s = s.trim();
  if (!s) return false;
  // todo
};