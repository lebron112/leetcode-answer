/* 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的句子。

说明：

分隔时可以重复使用字典中的单词。
你可以假设字典中没有重复的单词。
示例 1：

输入:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]
输出:
[
  "cats and dog",
  "cat sand dog"
]
示例 2：

输入:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
输出:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
解释: 注意你可以重复使用字典中的单词。
示例 3：

输入:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
输出:
[]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/word-break-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
// 类似139题 bfs广度搜索 + 剪纸
var wordBreak = function (s, wordDict) {
  const res = [];
  const min = Math.min(...wordDict.map(item => item.length));
  const bfs = (str, restStr) => {
    if (restStr.length < min) {
      // 没有剩余字符串并且 没办法继续剪纸了  restStr = ''
      return (str.length && !restStr.length) && res.push(str);
    }

    for (let i = 0; i < wordDict.length; i++) {
      const w = wordDict[i];
      const s = restStr.slice(0, w.length);
      // 匹配到相同的了
      if (w === s) {
        // 继续进行剪纸
        bfs(str + ' ' + w, restStr.slice(w.length));
      }
    }

  };
  for (let i = 0; i < wordDict.length; i++) {
    const w = wordDict[i];
    const str = s.slice(0, w.length);
    if (w === str) {
      // 进行剪纸，只需要剩余未匹配的字符串
      bfs(w, s.slice(w.length));
    }
  }
  return res;
};

console.log(wordBreak("catsanddog",
  ["cat", "cats", "and", "sand", "dog"]))
console.log(wordBreak("pineapplepenapple",
  ["apple", "pen", "applepen", "pine", "pineapple", "penapple"]))
  console.log(wordBreak("dddddd",
  ["d", "dd", "ddd", "dddd", "ddddd", "dddddd"]))
