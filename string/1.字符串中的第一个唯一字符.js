/* 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

案例:

s = "leetcode"
返回 0.

s = "loveleetcode",
返回 2. */
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  if(!s.length) return -1;
  if(s.length === 1) return 0;
  for(let i = 0; i < s.length; i++) {
    const nstr = s.slice(0, i) + s.slice(i + 1);
    if( nstr.indexOf(s[i]) === -1) {
      return i
    }
  }
  return -1;
}
console.log(firstUniqChar("loveleetcode"));
