/* 字典 wordList 中从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列：

序列中第一个单词是 beginWord 。
序列中最后一个单词是 endWord 。
每次转换只能改变一个字母。
转换过程中的中间单词必须是字典 wordList 中的单词。
给你两个单词 beginWord 和 endWord 和一个字典 wordList ，找到从 beginWord 到 endWord 的 最短转换序列 中的 单词数目 。如果不存在这样的转换序列，返回 0。

 
示例 1：

输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
输出：5
解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。
示例 2：

输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
输出：0
解释：endWord "cog" 不在字典中，所以无法进行转换。
 

提示：

1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000
wordList[i].length == beginWord.length
beginWord、endWord 和 wordList[i] 由小写英文字母组成
beginWord != endWord
wordList 中的所有字符串 互不相同

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/word-ladder
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */

// bfs 广度搜索  当wordList 长度多大时将超时
var ladderLength2 = function (beginWord, endWord, wordList) {
  const findIsNext = (wordA, wordB) => {
    let i = 0;
    for (let index = 0; index < wordA.length; index++) {
      if (wordA[index] !== wordB[index]) i++;
    }
    return i == 1;
  }

  const bfs = (index, list, next, timer, load) => {
    const loadCopy = [...load];
    loadCopy.push(next);

    const copyList = [...list];
    copyList.splice(index, 1);
    if (next === endWord) {
      timer++;
      console.log(loadCopy, timer)
      ways.push(timer);
      return;
    }

    for (let i = 0; i < copyList.length; i++) {
      const word = copyList[i];
      const isNext = findIsNext(next, word);
      if (isNext) {
        bfs(i, copyList, word, timer + 1, loadCopy);
      }
    }
  };
  const ways = [];
  if (endWord.length == 1) {
    return wordList.length - 1;
  }
  for (let i = 0; i < wordList.length; i++) {
    const cur = wordList[i];
    const isNext = findIsNext(beginWord, cur);
    if (isNext) {
      bfs(i, wordList, cur, 1, []);
    }
  }
  return ways.length ? Math.min(...ways) : 0;
};

var ladderLength = (beginWord, endWord, wordList) => {
  const ways = [];
};

console.log(ladderLength("hit", 'cog', ["hot", "dot", "dog", "lot", "log", "cog"]));// 5
// console.log(ladderLength("hit", 'cog', ["hot", "dot", "dog", "lot", "log"]));// 0

// console.log(ladderLength("hot", "dog", ["hot", "dog", "dot"]));// 3
// console.log(ladderLength("a", 'c', ["a", "b", "c"])); // 3
let a = Date.now();
var d = [
  "si", "go", "se", "cm", "so", "ph", "mt", "db", "mb", "sb", "kr", "ln", "tm", "le", "av", "sm", "ar",
  "ci", "ca", "br", "ti", "ba", "to", "ra", "fa", "yo", "ow", "sn", "ya", "cr", "po", "fe", "ho",
  "ma", "re", "or", "rn", "au", "ur", "rh", "sr", "tc", "lt", "lo", "as", "fr", "nb", "yb", "if",
  "pb", "ge", "th", "pm", "rb", "sh", "co", "ga", "li", "ha", "hz", "no", "bi", "di", "hi", "qa",
  "pi", "os", "uh", "wm", "an", "me", "mo", "na", "la", "st", "er", "sc", "ne", "mn", "mi", "am",
  "ex", "pt", "io", "be", "fm", "ta", "tb", "ni", "mr", "pa", "he", "lr", "sq", "ye"
];
// 超时 fail
console.log(d.length);
// console.log(ladderLength(
//   "qa",
//   "sq",
//   d.slice(0, 27)
// ));
// console.log(Date.now() - a);