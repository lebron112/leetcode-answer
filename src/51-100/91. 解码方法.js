/* 一条包含字母 A-Z 的消息通过以下方式进行了编码：

'A' -> 1
'B' -> 2
...
'Z' -> 26
给定一个只包含数字的非空字符串，请计算解码方法的总数。

示例 1:

输入: "12"
输出: 2
解释: 它可以解码为 "AB"（1 2）或者 "L"（12）。
示例 2:

输入: "226"
输出: 3
解释: 它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/decode-ways
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} s
 * @return {number}
 */
// dp动态规划 
// 对字符串进行切割， 比如226196 则 切割成 226 19 6 然后就是 3*2*1 
// 特殊情况 0 的处理 如果 第一个数字是0 或者不是10或20 则直接返回0， 如果是10或20  则后面一项的数字不能开始包含0
// 即最长子串末尾2位小于 26的为最大长度 然后求出每一个最大长度 可以组成的数量 的 乘积 就是答案
// 计算单条最长 1:1, 2:2, 3:2+1=3, 4: 3+2=5, 5:5+3=8, 6:8+5=13 7:13+8=21 .... 第T(n)项为 T(n-2) + T(n-1) 
// 利用一个hash记录T(n) 的数值

var numDecodings = function (s) {
  if (!s || s[0] === '0') return 0;
  let chunks = [];
  const hashStore = {};
  // 找出能组成最长子串数字的字符串进行切割
  for (let i = 0; i < s.length;) {
    let before = s[i];
    let after = s[i + 1];
    let str = before;
    loopIn: while (Number(before + after) <= 26) {
      i++;
      str += after;
      before = after;
      // 特殊情况为0的处理
      if (!after || after === '0') {
        break loopIn;
      }
      before = s[i];
      after = s[i + 1];
    }
    chunks.push(str);
    i++;
  }
  // 第T(n)项为 T(n-2) + T(n-1) 的计算公式
  const fbs = (num) => {
    let res;
    if (hashStore[num]) {
      return hashStore[num];
    }
    if (num === 1) {
      hashStore[num] = 1;
      return 1;
    }
    if (num === 2) {
      hashStore[num] = 2;
      return 2;
    }
    const res = fbs(num - 2) + fbs(num - 1);
    if (hashStore[num]) {
      hashStore[num] = res;
    }
    return res;
  }
  let sum = 1;
  // 求和
  for (let i = 0; i < chunks.length; i++) {
    let item = chunks[i];
    // 说明有连续超过1个以上的0 
    if (item[0] === '0') return 0;
    if (!['10', '20'].includes(item)) {
      if (item[item.length - 1] === '0') {
        // 去掉末尾的 10 20 30...的情况 并且如果大于20 直接返回0
        item = item.slice(0, -2);
        if (item.slice(2) > '30') return 0;
        if (item.length) {
          sum *= fbs(item.length);
        }
      } else {
        sum *= fbs(item.length);
      }
    }
  }
  return sum;
};

console.log(numDecodings('21000'));
console.log(numDecodings('2110226'));
console.log(numDecodings('2326196'));
console.log(numDecodings('226196'));
console.log(numDecodings('1212216'));
