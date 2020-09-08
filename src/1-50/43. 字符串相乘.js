/* 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

示例 1:

输入: num1 = "2", num2 = "3"
输出: "6"
示例 2:

输入: num1 = "123", num2 = "456"
输出: "56088"
输入: num1 = "123456789", num2 = "987654321"
输出: "121932631112635269"
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/multiply-strings
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// 模拟大数的加法 和乘法即可
var multiply = function (num1, num2) {
  // 模拟加法
  const add = (a, b) => {
    if (!a) return b;
    a = a.toString();
    b = b.toString();
    let i = Math.max(a.length, b.length);
    a = '0'.repeat(i - a.length) + a;
    b = '0'.repeat(i - b.length) + b;
    let sum = '';
    let dir = 0;
    i--;
    while (a[i] || b[i]) {
      let s = (Number(a[i]) || 0) + (Number(b[i]) || 0) + dir;
      if (s > 9) {
        dir = 1;
        s = s - 10;
        // 进位
      } else {
        dir = 0;
      }
      sum = s + sum;
      i--;
    }
    if (dir) sum = 1 + sum;
    return sum;
  };
  // 模拟乘法
  const mul = (va, vb) => {
    va = va.toString();
    vb = vb.toString();
    if (vb === '0') return '0';
    let sum = '';
    let dirs = 0;
    let i = va.length - 1;
    while (i >= 0) {
      let val = Number(va[i]) * Number(vb) + Number(dirs);
      if (val > 9) {
        dirs = val.toString()[0];
        // 进位
        val = val.toString()[1];
      }else {
        dirs = '0';
      }
      sum = val + sum;
      i--;
    }
    if (Number(dirs)) sum = dirs + sum;
    return sum;
  };
  let sum = '';
  if (Number(num1) === 0 || Number(num2) === 0) return '0';
  let len = num2.length - 1;
  for (let i = len; i >= 0; i--) {
    // 累加
    const to = mul(num1, num2[i]) + '0'.repeat(len - i);
    sum = add(sum, to);
  }
  return sum;
};

console.log(multiply("123456789", '987654321'));

// console.log(mul("123456789", '9'));