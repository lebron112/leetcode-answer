/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let res = '';
  let i = 1;
  let j = 0;
  let hasBreak = false;
  if (!strs.length) return '';
  if (strs.length === 1) return strs[0];
  lab: for (j = 0; j < strs[0].length; j++) {
    res = res + strs[0][j];
    i = 1;
    labIn: for (; i < strs.length; i++) {
      if (strs[i].indexOf(res)) {
        hasBreak = true;
        if (i === 1 && j === 0) return '';
        break lab;
      }
    }
  }
  return hasBreak ? res.slice(0, -1) : res;
};