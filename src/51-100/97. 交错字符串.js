/* 给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。

两个字符串 s 和 t 交错 的定义与过程如下，其中每个字符串都会被分割成若干 非空 子字符串：

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
交错 是 s1 + t1 + s2 + t2 + s3 + t3 + ... 或者 t1 + s1 + t2 + s2 + t3 + s3 + ...
提示：a + b 意味着字符串 a 和 b 连接。

 

示例 1：


输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
输出：true
示例 2：

输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
输出：false
示例 3：

输入：s1 = "", s2 = "", s3 = ""
输出：true
 

提示：

0 <= s1.length, s2.length <= 100
0 <= s3.length <= 200
s1、s2、和 s3 都由小写英文字母组成

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/interleaving-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */

const isInterleave = function (s1, s2, s3) {
  const os1 = s1;
  const os2 = s2;
  const os3 = s3;
  const fn = (s1, s2, s3) => {
    let next = 1;
    let str;
    while (s3.length) {
      if (s1.length || s2.length) {
        str = next === 1 ? s1 : s2;
        if (!str) {
          next = next === 1 ? 2 : 1;
          str = next === 1 ? s1 : s2;
        }
        loop: for (let i = 0; i < str.length;) {
          if (str[i] === s3[i]) {
            i++;
            if (!str[i]) {
              if (next === 1) {
                s1 = s1.slice(i);
              } else {
                s2 = s2.slice(i);
              }
              next = next === 1 ? 2 : 1;
              s3 = s3.slice(i);
            }
          } else {
            if (i === 0) {
              return false;
            }
            if (next === 1) {
              s1 = s1.slice(i);
            } else {
              s2 = s2.slice(i);
            }
            next = next === 1 ? 2 : 1;
            s3 = s3.slice(i);
            break loop;
          }
        }
      } else {
        break;
      }
    }
    return !s3.length && !s1.length && !s2.length;
  };
  return fn(os1, os2, os3) || fn(os2, os1, os3);
};
console.log(isInterleave('aa', 'ab', 'aaba'));
console.log(isInterleave('ab', 'aa', 'aaba'));
console.log(isInterleave('a', 'b', 'a'));
console.log(isInterleave('', 'b', 'b'));
console.log(isInterleave('aabcc', 'dbbca', 'aadbbcbcac'));
console.log(isInterleave('aabcc', 'dbbca', 'aadbcbbcac'));
console.log(isInterleave('aabcc', 'dbbca', 'aadbbbaccc'));