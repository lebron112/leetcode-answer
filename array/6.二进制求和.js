/* 给定两个二进制字符串，返回他们的和（用二进制表示）。

输入为非空字符串且只包含数字 1 和 0。

示例 1:

输入: a = "11", b = "1"
输出: "100"
示例 2:

输入: a = "1010", b = "1011"
输出: "10101" */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  // 先找到那个长度大的  并存在一个记录进位的值d 初始值0
  const len = Math.max(a.length, b.length);
  let res = '';
  let d = 0;
  for (let i = 0, al = a.length - 1, bl = b.length - 1; i < len; i++ , al-- , bl--) {
    let aa = 0;
    let bb = 0;
    if (a[al]) aa = Number(a[al]);
    if (b[bl]) bb = Number(b[bl]);
    let r = aa + bb + d;
    // 倒序排序 并同序号的索引值相加 + d，如果大于等于2 则更新记录新值的位置值为 新值 - 2 并使d = 1;
    if (r >= 2) {
      d = 1;
      res = ((r - 2) + '') + res;
    } else {
      d = 0;
      res = (r + '') + res;
    }
  }
  //  最后如果有进位1 则在最前面插入即可；
  if (d) res = '1' + res;
  return res;
};

console.log(addBinary('1011', '1011'));
console.log(addBinary(
  "10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101",
  "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"
));