/* 
给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

示例:

输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
] */
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// 利用hash js对象存储数据
var groupAnagrams = function (strs) {
  const hashStore = {};
  for (let i = 0; i < strs.length; i++) {
    const item = strs[i];
    // 给每一个字符串按aciss码排序
    const arrStr = item.split('').sort().join();
    if (!hashStore[arrStr]) {
      hashStore[arrStr] = [];
    }
    hashStore[arrStr].push(item);
  }
  // 返回值即可
  return Object.values(hashStore);
};