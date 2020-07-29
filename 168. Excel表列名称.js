/* 给定一个正整数，返回它在 Excel 表中相对应的列名称。

例如，

    1 -> A
    2 -> B
    3 -> C
    ...
    26 -> Z
    27 -> AA
    28 -> AB 
    ...
示例 1:

输入: 1
输出: "A"
示例 2:

输入: 28
输出: "AB"
示例 3:

输入: 701
输出: "ZY"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/excel-sheet-column-title
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
var convertToTitle = function (n) {
  // 获取A的Assic码
  const aNum = 'A'.charCodeAt() - 1;
  let res = '';
  if (n <= 26) {
    return String.fromCharCode(n + aNum);
  }
  while (n > 0) {
    // 取模
    const dis = n % 26;
    // 如果等于0了 那么是整除的 直接加Z 并且让 n -1 
    if (dis === 0) {
      res = 'Z' + res;
      n--;
    // 否则根据取模的Assic值换算成 字符串放在最前面
    } else {
      res = String.fromCharCode(dis + aNum) + res;
    }
    // 除以 26 
    n = Math.floor(n / 26);
  }
  return res;
};
// 例如 26 * 26 * 26 * 7 + 26 * 26 * 7 + 26 * 5 + 8 
// 第一步取模 8
// 然后除以26的商 再取模得 5 
// 再除以 26的商 取模得7
// 再除以 26的商 取模得7
// GGEH