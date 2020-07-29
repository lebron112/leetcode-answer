const lengthOfLongestSubstring = function (s) {
  let arr = [];
  let ans = 0, i = 0, j = 0;
  while (i < s.length && j < s.length) {
    if (!arr.includes(s[j])) {
      arr.push(s[j++]);
      ans = Math.max(ans, j - i);
    } else {
      arr = arr.filter(item => item !== s[i]);
      i++;
    }
  }
  return ans;
};
// test 原理 [i,j) 丢入数组  有重复的 则将重复那个删掉 然后i++ 否则一直j++ 并存储最大长度的值

console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('bbbbbbbbb'));
console.log(lengthOfLongestSubstring('pwwkew'));
console.log(lengthOfLongestSubstring('dvdf'));