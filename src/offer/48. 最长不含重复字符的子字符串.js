/* 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

 

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 
提示：
s.length <= 40000
注意：本题与主站 3 题相同：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */


const { testFn } = require('../utils');
// 滑动窗口 "abcabcbb" 滑动窗口 快慢指针，快指针先遍历，遇到没有重复的更新数组，如果遇到重复的了，那么让窗口重新从重复的地方开始
var lengthOfLongestSubstring = function (s) {
  if (!s) return 0;
  let arr = [];
  let max = 1, i = 0, j = 0;
  while (i < s.length && j < s.length) {
    if (!arr.includes(s[i])) {
      arr.push(s[i]);
      max = Math.max(max, arr.length);
      i++;
    } else {
      arr = arr.filter(item=> item !== s[j]);
      j ++;
    }
  }
  return max;
};

testFn(lengthOfLongestSubstring, "pwwkew")