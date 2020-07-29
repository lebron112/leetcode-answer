/* 给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

 

示例 1：

输入：
  s = "barfoothefoobarman",
  words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoor" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
示例 2：

输入：
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
输出：[]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words
 */
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
// 基础暴力排序法  对words所有可能的情况进行排序 words长度过大时造成大内存溢出报错 不可取
var findSubstring = function (s, words) {
  let arr = [];
  if (!s || !words.length) return arr;
  const loopm = (arr, index) => {
    const res = [];
    const word = words[index];
    if (!word) return arr;
    for (let i = 0; i < arr.length; i++) {
      const strs = arr[i];
      for (let j = 0; j <= strs.length; j++) {
        let item = strs.slice(0, j);
        item.push(word);
        item = item.concat(strs.slice(j));
        res.push(item);
      }
    }
    return loopm(res, index + 1);
  };
  const result = loopm([[words[0]]], 1);
  for (let i = 0; i < result.length; i++) {
    const str = result[i].join('');
    let index = s.indexOf(str);
    if (index !== -1 && arr.indexOf(index) === -1) {
      arr.push(index);
    }
    if (index !== -1) {
      if (arr.indexOf(index) === -1) arr.push(index);
      while (index !== -1) {
        index = s.indexOf(str, index + 1);
        if (index !== -1 && (arr.indexOf(index) === -1)) {
          arr.push(index);
        }

      }
    }
  }
  return arr;
};
const findSubstring2 = (s, words) => {
  const len = words.join('').length;
  const res = [];
  if (!s || !words.length) return res;
  const sortWords = words.sort().join('');
  const length = words[0].length;
  for (let i = 0; i < s.length; i++) {
    let str = s.substr(i, len);
    if (str.length < len) break;
    let arr = [];
    while(str){
      let wo = str.substr(0, length);
      arr.push(wo);
      str = str.slice(length);  
    }
    const newStr = arr.sort().join('');
    arr = null;
    if (newStr === sortWords) {
      res.push(i);
    }
  }
  return res;
};

console.log(findSubstring2('wordgoodgoodgoodbestword', ['word', 'good', "best", "word"]));
console.log(findSubstring2('barfoothefoobarman', ["foo", "bar"]));
console.log(findSubstring2("foobarfoobar", ["foo", "bar"]));
console.log(findSubstring2("pjzkrkevzztxductzzxmxsvwjkxpvukmfjywwetvfnujhweiybwvvsrfequzkhossmootkmyxgjgfordrpapjuunmqnxxdrqrfgkrsjqbszgiqlcfnrpjlcwdrvbumtotzylshdvccdmsqoadfrpsvnwpizlwszrtyclhgilklydbmfhuywotjmktnwrfvizvnmfvvqfiokkdprznnnjycttprkxpuykhmpchiksyucbmtabiqkisgbhxngmhezrrqvayfsxauampdpxtafniiwfvdufhtwajrbkxtjzqjnfocdhekumttuqwovfjrgulhekcpjszyynadxhnttgmnxkduqmmyhzfnjhducesctufqbumxbamalqudeibljgbspeotkgvddcwgxidaiqcvgwykhbysjzlzfbupkqunuqtraxrlptivshhbihtsigtpipguhbhctcvubnhqipncyxfjebdnjyetnlnvmuxhzsdahkrscewabejifmxombiamxvauuitoltyymsarqcuuoezcbqpdaprxmsrickwpgwpsoplhugbikbkotzrtqkscekkgwjycfnvwfgdzogjzjvpcvixnsqsxacfwndzvrwrycwxrcismdhqapoojegggkocyrdtkzmiekhxoppctytvphjynrhtcvxcobxbcjjivtfjiwmduhzjokkbctweqtigwfhzorjlkpuuliaipbtfldinyetoybvugevwvhhhweejogrghllsouipabfafcxnhukcbtmxzshoyyufjhzadhrelweszbfgwpk" +
  "zlwxkogyogutscvuhcllphshivnoteztpxsaoaacgxyaztuixhunrowzljqfqrahosheukhahhbia" +
  "xqzfmmwcjxountkevsvpbzjnilwpoermxrtlfroqoclexxisrdhvfsindffslyekrzwzqkpeocilatftymodgztjgybtyheqgcpwogdcjlnlesefgvimwbxcbzvaibspdjnrpqtyeilkcspknyylbwndvkffmzuriilxagyerjptbgeqgebiaqnvdubrtxibhvakcyotkfonmseszhczapxdlauexehhaireihxsplgdgmxfvaevrbadbwjbdrkfbbjjkgcztkcbwagtcnrtqryuqixtzhaakjlurnumzyovawrcjiwabuwretmdamfkxrgqgcdgbrdbnugzecbgyxxdqmisaqcyjkqrntxqmdrczxbebemcblftxplafnyoxqimkhcykwamvdsxjezkpgdpvopddptdfbprjustquhlazkjfluxrzopqdstulybnqvyknrchbphcarknnhhovweaqawdyxsqsqahkepluypwrzjegqtdoxfgzdkydeoxvrfhxusrujnmjzqrrlxglcmkiykldbiasnhrjbjekystzilrwkzhontwmehrfsrzfaqrbbxncphbzuuxeteshyrveamjsfiaharkcqxefghgceeixkdgkuboupxnwhnfigpkwnqdvzlydpidcljmflbccarbiegsmweklwngvygbqpescpeichmfidgsjmkvkofvkuehsmkkbocgejoiqcnafvuokelwuqsgkyoekaroptuvekfvmtxtqshcwsztkrzwrpabqrrhnlerxjojemcxel",
  ["dhvf", "sind", "ffsl", "yekr", "zwzq", "kpeo", "cila", "tfty", "modg", "ztjg", "ybty", "heqg", "cpwo", "gdcj", "lnle", "sefg", "vimw", "bxcb"]))
console.log(findSubstring2("a", []));
console.log(findSubstring2("ababaab", ["ab", "ba", "ba"]));
