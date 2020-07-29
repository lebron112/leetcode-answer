/* 给定一个Excel表格中的列名称，返回其相应的列序号。

例如，

    A -> 1
    B -> 2
    C -> 3
    ...
    Z -> 26
    AA -> 27
    AB -> 28 
    ...
示例 1:

输入: "A"
输出: 1
示例 2:

输入: "AB"
输出: 28
示例 3:

输入: "ZY"
输出: 701

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/excel-sheet-column-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function (s) {
  let sum = 0;
  // 获取 A的 Assic码
  const st = 'A'.charCodeAt() - 1;
  // 倒叙 并且 累加26的 n次方乘以 减去初始Assic码获取到的值
  for (let i = s.length - 1; i >= 0; i--) {
    sum += Math.pow(26, s.length - i - 1) * (s[i].charCodeAt() - st);
  }
  return sum;
};