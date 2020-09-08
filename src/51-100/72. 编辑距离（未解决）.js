/* 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

插入一个字符
删除一个字符
替换一个字符
 

示例 1：

输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
示例 2：

输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/edit-distance
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
// 动态规划问题
// 首先求出word1最多相似的索引位，然后从该索引位的左右2变分别开始计算，
var minDistance = function (word1, word2) {
  let time = 0;
  if (word1 === word2) return time;
  for (let i = 0; i < word2.length; i++) {

  }
};
console.log(minDistance('horse', 'ros'));
console.log(minDistance('inten', 'execu'));
console.log(minDistance('ieten', 'execu'));
console.log(minDistance('intention', 'execution'));