/* 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 dividend 除以除数 divisor 得到的商。

示例 1:

输入: dividend = 10, divisor = 3
输出: 3
示例 2:

输入: dividend = 7, divisor = -3
输出: -2
说明:

被除数和除数均为 32 位有符号整数。
除数不为 0。
假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  (2^31) − 1]。本题中，如果除法结果溢出，则返回 231 − 1。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/divide-two-integers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
/* 除法原理 (太难还不能理解)
 >> 右移运算例如 8>>1=4 ( 1000 => 0100 ) 即乘以2  
 << 左移运算例如 4<<1=8 ( 0100 => 1000 ) 即除以2  
 ^ 异或运算符 
 */
var divide = function (dividend, divisor) {
  const max = Math.pow(2, 31) - 1;
  const min = Math.pow(-2, 31);
  let result = 0;
  if (divisor === 0) return result;
  const l = dividend ^ divisor;
  let t = Math.abs(dividend);
  let d = Math.abs(divisor);
  for (let i = 31; i >= 0; i--) {
    // 判断右移一个极大的数后是否比除数大 一个a 除以b可以看成是 a /(2^n) 
    const tt = Math.abs((t >> i));
    if (tt >= d) {
      result += Math.pow(2, i);
      t -= Math.abs(d << i);
    }
  }
  let res = l >= 0 ? result : (-result);
  if (res < min) res = min;
  if (res > max) res = max;
  return res;
};
console.log(divide(10, 3));