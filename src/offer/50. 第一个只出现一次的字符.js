/* 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

示例:

s = "abaccdeff"
返回 "b"

s = "" 
返回 " "
 

限制：

0 <= s 的长度 <= 50000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} s
 * @return {character}
 */
// hash + 一个list
var firstUniqChar = function (s) {
  const list = [];
  const hash = new Map();
  for (let i = 0; i < s.length; i++) {
    const w = s[i];
    const index = list.indexOf(w);
    const v = hash.has(w);
    if (!v) {
      if (!v) {
        list.push(w);
        hash.set(w, 1);
      }
    } else {
      if (index !== -1) {
        list.splice(index, 1)
      }
    }
  }
  return list[0] || ' ';
};

console.log(firstUniqChar("cc"))