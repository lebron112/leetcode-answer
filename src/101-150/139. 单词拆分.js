/* 给你一个字符串 s 和一个字符串列表 wordDict 作为字典，判定 s 是否可以由空格拆分为一个或多个在字典中出现的单词。

说明：拆分时可以重复使用字典中的单词。

 

示例 1：

输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
示例 2：

输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
     注意你可以重复使用字典中的单词。
示例 3：

输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
 

提示：

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s 和 wordDict[i] 仅有小写英文字母组成
wordDict 中的所有字符串 互不相同
通过次数220,416提交次数424,124

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/word-break
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// 题目表述有问题 ，应改为
// 是否可以利用字典中出现的单词拼接出s，
// 不要求字典中出现的单词全部都使用，
// 并且字典中的单词可以重复使用；
// var wordBreak = function (s, wordDict) {
//   let str = s;
//   for (let i = 0; i < wordDict.length; i++) {
//     const w = wordDict[i];
//     const index = str.indexOf(w);
//     if (index === -1) return false;
//     let l = str.length - w.length;
//     if (l < 0) return false;
//     const start = str.slice(0, index);
//     l -= start.length;
//     str = start + str.slice(index + w.length, index + w.length + l);
//   }
//   return true;
// };

// 用一个数字记录wordDict可以组成s的索引
// 例如"catsandogcat", ["cats", "dog", "sand", "and", "cat", "an"]
// 第一次找到 [0] [4]
// 第二次找到 [0, 3] [0, 5] , [4, 2]
// 第三次查找 [0, 3]不通, [0, 5, 1],  [4, 2]不通
// 第三次查钊 [0, 5, 1, 4] 
// 这时候一级满足条件了找到了
// 超时了 需要加一个记忆化hash 判断是否走过，走过则直接返回false；
var wordBreakDfs = function (s, wordDicts) {
  const hash = new Map();
  // 找打一个最短的字符串长度
  const min = Math.min(...wordDicts.map(item => item.length));
  const dfs = (restStr) => {
    // 记忆化路径，如果有走过的路径，则直接返回fasle
    const has = hash.has(restStr);
    if (!has) {
      hash.set(restStr, 1);
    } else {
      return false;
    }
    // dfs终止条件
    if (!restStr) return true;
    // 当剩余字符串字数不够时，说明无法匹配上
    if (restStr.length < min) return false;
    const res = [];
    for (let i = 0; i < wordDicts.length; i++) {
      const w = wordDicts[i];
      // 找出所有可能截断的结果
      const isOk = restStr.slice(0, w.length) === w;
      if (isOk) res.push(restStr.slice(w.length));
    }
    if (res.length) {
      for (let i = 0; i < res.length; i++) {
        // 递归
        if (dfs(res[i])) return true;
      }
    }
    return false;
  };

  for (let i = 0; i < wordDicts.length; i++) {
    const w = wordDicts[i];
    // 查找
    const isOk = s.slice(0, w.length) === w;
    if (isOk) {
      // 尝试进行深度搜索
      const res = dfs(s.slice(w.length));
      if (res) return true;
    }
  }
  return false;
}
//  dp 动态规划 类似北保问题
const wordBreak = (s, wordDicts) => {
  const res = [true];
  for (let i = 1; i <= s.length; i++) {
    inLab: for (let j = 0; j < i; j++) {
      const str = s.slice(j, i);
      // 背包问题，如果可以匹配上，如果下一个也能匹配上，那么对应的索引位是true
      if (res[j]) {
        if (wordDicts.indexOf(str) > -1) {
          res[i] = true;
          break inLab;
        }
      }
    }
  }
  return res[s.length ] === true;
};

console.log(wordBreak('leetcode', ['leet', 'code']))// true
console.log(wordBreak('applepenapple', ["apple", "pen"]))// true
console.log(wordBreak('catsandog', ["cats", "dog", "sand", "and", "cat"]))// false
console.log(wordBreak('catsan', ["dog", "sand", "and", "cat"]))// false
console.log(wordBreak("bb", ["a", "b", "bbb", "bbbb"]));// true
console.log(wordBreak("cars", ["car", "ca", "rs"]));// true
console.log(wordBreak("ccbb", ["bc", "cb"]));// false
console.log(wordBreak("ccaccc", ["cc", "ac"]));// true
console.log(wordBreak("ddadddbdddadd", ["dd", "ad", "da", "b"]));//true
console.log(wordBreak("catsandogcat", ["cats", "dog", "sand", "and", "cat", "an"]))// true
console.log(wordBreak("cats", ["dogd"]))// false