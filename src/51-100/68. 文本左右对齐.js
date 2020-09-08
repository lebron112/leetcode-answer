/* 给定一个单词数组和一个长度 maxWidth，重新排版单词，使其成为每行恰好有 maxWidth 个字符，且左右两端对齐的文本。

你应该使用“贪心算法”来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 ' ' 填充，使得每行恰好有 maxWidth 个字符。

要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，则左侧放置的空格数要多于右侧的空格数。

文本的最后一行应为左对齐，且单词之间不插入额外的空格。

说明:

单词是指由非空格字符组成的字符序列。
每个单词的长度大于 0，小于等于 maxWidth。
输入单词数组 words 至少包含一个单词。
示例:

输入:
words = ["This", "is", "an", "example", "of", "text", "justification."]
maxWidth = 16
输出:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
示例 2:

输入:
words = ["What","must","be","acknowledgment","shall","be"]
maxWidth = 16
输出:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
解释: 注意最后一行的格式应为 "shall be    " 而不是 "shall     be",
     因为最后一行应为左对齐，而不是左右两端对齐。       
     第二行同样为左对齐，这是因为这行只包含一个单词。
示例 3:

输入:
words = ["Science","is","what","we","understand","well","enough","to","explain",
         "to","a","computer.","Art","is","everything","else","we","do"]
maxWidth = 20
输出:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/text-justification
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
// 基本的业务题
// 首先对输入字符循环，用一个数组存储被切分后的数字
/* 
定义item itemLen 丢入第一个字符串，itemLen =第一个字符的长度 + 1，判断第二个字符+itemLen 是否超过最大宽度
如果超过，把item丢入二维数组存储起来，否则把下一个字符串丢入 item数组，更新itemLen为丢入字符长度+1 + 原来的itemLen长度
 */
// 再对每个被切分的一行进行处理
/* 每一行的处理
平均分割每一项除了最后一项的空格，再把多出来的空格再分割一遍即可
 */
var fullJustify = function (words, maxWidth) {
  let res = [];
  // 一定一个记录器容器和记录器容器字符的长度
  let item = [];
  let itemlen = 0;
  const formateStr = (strArr, islast = false) => {
    const totalLen = strArr.join('').length;
    let resLen = maxWidth - totalLen;
    // 最后一行特殊处理 左对齐
    if (islast) {
      let i = 0;
      strArr = strArr.map((item, index) => {
        if (index !== strArr.length - 1) {
          item = item + ' ';
          i++;
        }
        return item;
      });
      // 填充多余的空格
      return strArr.join('') + ' '.repeat(maxWidth - i - totalLen);

    } else {
      if (strArr.length > 1) {
        // 计算平均分割数，最后一个字符无需加空格
        const spaceLen = Math.floor((maxWidth - totalLen) / (strArr.length - 1));
        strArr = strArr.map((item, index) => {
          if (index !== strArr.length - 1) {
            item = item + ' '.repeat(spaceLen);
            resLen = resLen - spaceLen;
          }
          return item;
        });
        // 还有空格没瓜分完，再瓜分一次即可
        if (resLen) {
          strArr = strArr.map((item, index) => {
            if (index !== strArr.length - 1 && resLen > 0) {
              item = item + ' ';
              resLen--;
            }
            return item;
          });
        }
      } else {
        // 只有一个字符串 直接填空即可
        strArr[0] = strArr[0] + ' '.repeat(maxWidth - totalLen);
      }
      return strArr.join('');
    }
  };
  for (let i = 0; i <= words.length; i++) {
    const str = words[i];
    if (!str) {
      item.length && res.push(item);
      break;
    }
    if (!item.length) {
      item.push(str);
      itemlen += str.length + 1;
    } else {
      // 预测下一个连接后的字符串长度是否在最大宽度范围内
      const len = str.length + itemlen;
      // 正好相等的情况 重新让记录器置为空即可
      if (len === maxWidth) {
        item.push(str);
        res.push(item);
        item = [];
        itemlen = 0;

      } else if (len < maxWidth) {
        item.push(str);
        itemlen = len + 1;
        // 超出 把记录器存入，并清空记录器
      } else {
        res.push(item);
        item = [];
        item.push(str);
        itemlen = str.length + 1;
      }
    }
  }
  return res.map((item, index) => formateStr(item, index === res.length - 1));
};
console.log(fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16));
console.log(fullJustify(["What", "must", "be", "acknowledgment", "shall", "be"], 16));
console.log(fullJustify(["Science", "is", "what", "we", "understand", "well", "enough", "to", "explain",
  "to", "a", "computer.", "Art", "is", "everything", "else", "we", "do"], 20));
console.log(fullJustify(["The", "important", "thing", "is", "not", "to", "stop", "questioning.",
  "Curiosity", "has", "its", "own", "reason", "for", "existing."], 17))
console.log(fullJustify(["ask", "not", "what", "your", "country", "can", "do", "for", "you", "ask", "what", "you", "can", "do", "for", "your", "country"], 16))
// console.log(fullJustify(["a", "computer.", "Art", "is", "everything", "else", "we", "do"], 20))