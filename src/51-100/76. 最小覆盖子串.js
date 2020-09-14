/* 给你一个字符串 S、一个字符串 T 。请你设计一种算法，可以在 O(n) 的时间复杂度内，从字符串 S 里面找出：包含 T 所有字符的最小子串。

 

示例：

输入：S = "ADOBECODEBANC", T = "ABC"
输出："BANC"
 

提示：

如果 S 中不存这样的子串，则返回空字符串 ""。
如果 S 中存在这样的子串，我们保证它是唯一的答案。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-window-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
// 滑动窗口 双指针，2个指针index, i从左边开始 j从右边开始
// 
var minWindow = function (s, t) {
  let res = '';
  const originHash = {};
  for (let i = 0; i < t.length; i++) {
    originHash[t[i]] = originHash[t[i]] ? (originHash[t[i]] + 1) : 1;
  }
  // 左滑动hash
  let hashStoreA = { ...originHash };
  let len = t.length;
  let storeStr = '';
  // 右滑动hash
  let hashStoreB = { ...originHash };
  let nel = t.length;
  let strStore = '';
  for (let i = 0, j = s.length - 1; i < s.length;) {
    // 左滑动
    {
      let str = s[i];
      storeStr = len === t.length ? str : (storeStr + str);
      if (hashStoreA[str]) {
        hashStoreA[str] = hashStoreA[str] - 1;
        len--;
      }
      if (len === 0) {
        if (!res) {
          hashStoreA = { ...originHash };
          res = storeStr;
          len = t.length;
        } else {
          if (res.length > storeStr.length) {
            hashStoreA = { ...originHash };
            res = storeStr;
            len = t.length;
          }
        }
      }
    }
    // 右滑动
    // {
    //   let str = s[j];
    //   strStore = nel === t.length ? str : (str + strStore);
    //   if (hashStoreB[str]) {
    //     hashStoreB[str] = hashStoreB[str] - 1;
    //     nel--;
    //   }
    //   if (nel === 0) {
    //     if (!res) {
    //       hashStoreB = { ...originHash };
    //       res = strStore;
    //       nel = t.length;
    //     } else {
    //       if (res.length > strStore.length) {
    //         hashStoreB = { ...originHash };
    //         res = strStore;
    //         nel = t.length;
    //       }
    //     }
    //   }
    // }
    i++;
    j--;
  }
  // console.log(res.length);
  return res;
};
// 滑动窗口
// 首次用hashStore记录t字符串中每个字符出现的不同次数
// 循环s字符串， storeStr存入每个字符串
// 当循环的字符串在hashStore中出现了 丢入queue队列 hashStore里记录的该字符串数量减1 总长度llen ++; 
// 如果该字符串为负数了，那么len长度不变
// 当 len 为 t字符的长度时，且queue队列长度大于 len了
// 进行滑动窗口 queue第一个字符如果在hashStore里不为0 咋弹出queue 并且修改storeStr左边开始弹出  
// 直到storeStr的第一个字符和queue的第一个字符相等 重复循环

var minWindow2 = function (s, t) {
  if (s === t) return t;
  let res = '';
  const hashStore = {};
  for (let i = 0; i < t.length; i++) {
    hashStore[t[i]] = hashStore[t[i]] ? (hashStore[t[i]] + 1) : 1;
  }
  let len = 0;
  let storeStr = '';
  let queueStr = '';
  const moveWindow = (isLoopOver = false) => {
    while (queueStr.length > t.length) {
      const head = queueStr[0];
      if (hashStore[head] >= 0) break;
      if (storeStr[0] === head) {
        hashStore[head] = hashStore[head] + 1;
        queueStr = queueStr.substr(1);
        storeStr = storeStr.substr(1);
        while (storeStr[0] !== queueStr[0]) {
          storeStr = storeStr.substr(1);
        }
      } else {
        storeStr = storeStr.substr(1);
      }
    }
    storeStr.length && getRes(isLoopOver);
  };
  const getRes = (isLoopOver = false) => {
    if (!isLoopOver && !res.length) return;
    let overStr = storeStr;
    while (hashStore[overStr[0]] === undefined && overStr[0]) {
      overStr = overStr.substr(1);
    }
    if (res.length > overStr.length) res = overStr;
  }
  for (let i = 0; i < s.length; i++) {
    const str = s[i];
    len === t.length && moveWindow();
    storeStr += str;
    if (hashStore[str] !== undefined) {
      hashStore[str] = hashStore[str] - 1;
      if (hashStore[str] >= 0) len++;
      queueStr += str;
    }
    if (len === t.length && !res) {
      res = storeStr;
    }
  }
  moveWindow(true);
  return res;
};

// const d = Date.now();
console.log(minWindow2('ADOBECODEBBANC', 'ABBC'));
console.log(minWindow2('ADOBECODEBBANC', 'ABC'));
console.log(minWindow2("cabwefgewcwaefgcf", "cae")); //cwae
console.log(minWindow2('aab', 'b'));

const { a, b } = require('./test/test-for-76');
const d = Date.now();
// console.log(a.length, b.length);
console.log(minWindow2(a, b).length);
console.log(Date.now() - d);