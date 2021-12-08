/* 
给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。

回文串 是正着读和反着读都一样的字符串。

 

示例 1：

输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
示例 2：

输入：s = "a"
输出：[["a"]]
 

提示：

1 <= s.length <= 16
s 仅由小写英文字母组成

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/palindrome-partitioning
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} s
 * @return {string[][]}
 */
// bfs搜索
// 循环，找出和【当前索引位的单词的第一个字】相同的下一个字母x，往x下一位为止开始找
// 双指针，分左右同时开始
var partition = function (s) {
  const res = [];
  const first = s.split('');
  res.push(first);
  const checkout = (str) => {
    let s = 0;
    let e = str.length - 1;
    while (s < e) {
      if (str[s] === str[e]) {
        s++;
        e--;
      } else {
        return false;
      }
    }
    return true;
  };
  const hash = new Map();
  const store2res = (list) => {
    const key = list.join('-');
    if (!hash.has(key)) {
      res.push(list);
      hash.set(key, 1);
    }
  };

  const bfsL2R = (list, index) => {
    let toLeft = index - 1;
    let toRight = index + 1;
    let cur = list[index];
    if (!cur) return;
    if (list[toLeft] || list[toRight]) {
       // 最右边和第一和相同(判断修改：左边第一个和右边最后一个相同)
      if (list[toLeft] === list[toRight]) {
        const copy = [...list];
        const isRev = checkout(copy[toLeft] + cur + copy[toRight]);
        if (!isRev) return;
        copy[toLeft] = copy[toLeft] + cur + copy[toRight];
        copy.splice(index, 2);
        store2res(copy);
        bfsL2R(copy, toLeft);
        bfsL2R(copy, toLeft + 1);
      }
      // 最左边和最后一个相等
      if (list[toRight] === cur[0]) {
        const copy = [...list];
        const isRev = checkout(cur + copy[toRight]);
        if (!isRev) return;
        copy[index] = cur + copy[toRight];
        copy.splice(toRight, 1);
        store2res(copy);
        bfsL2R(copy, index);
      }

      bfsL2R(list, index + 1);
    }
  };

  // for (let i = 0; i < first.length; i++) {
  //   bfsL2R(first, i);
  // }
  bfsL2R(first, 0);
  return res
};
// console.log(partition('aaab'));
/*[
["a","a","a","b"],
["a","aa","b"],
["aa","a","b"],
["aaa","b"]
]*/
// console.log(partition('a'));
// console.log(partition("aabccccbd"));

// console.log(partition("abbab"))
// console.log(partition("cbbbcc"))
const { findDifArray } = require('../utils');
const d = partition("ccaacabacb");
const dRes = [["c","c","a","a","c","a","b","a","c","b"],["c","c","a","a","c","aba","c","b"],["c","c","a","a","cabac","b"],["c","c","a","aca","b","a","c","b"],["c","c","aa","c","a","b","a","c","b"],["c","c","aa","c","aba","c","b"],["c","c","aa","cabac","b"],["c","caac","a","b","a","c","b"],["c","caac","aba","c","b"],["cc","a","a","c","a","b","a","c","b"],["cc","a","a","c","aba","c","b"],["cc","a","a","cabac","b"],["cc","a","aca","b","a","c","b"],["cc","aa","c","a","b","a","c","b"],["cc","aa","c","aba","c","b"],["cc","aa","cabac","b"]]
console.log(d.map(item => item.join(' , ')))
console.log(findDifArray(d,
  dRes).map(item => item.join(' , '))); // 16


// const d1111 = partition("aaabaa");
// const d1111res = [["a", "a", "a", "b", "a", "a"], ["a", "a", "a", "b", "aa"], ["a", "a", "aba", "a"], ["a", "aa", "b", "a", "a"], ["a", "aa", "b", "aa"], ["a", "aabaa"], ["aa", "a", "b", "a", "a"], ["aa", "a", "b", "aa"], ["aa", "aba", "a"], ["aaa", "b", "a", "a"], ["aaa", "b", "aa"]];
// console.log(d1111.length, d1111res.length)
// console.log(findDifArray(d1111, d1111res).map(item => item.join(' , ')))