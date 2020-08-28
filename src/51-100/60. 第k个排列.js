/* 给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。

按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：

"123"
"132"
"213"
"231"
"312"
"321"
给定 n 和 k，返回第 k 个排列。

说明：

给定 n 的范围是 [1, 9]。
给定 k 的范围是[1,  n!]。
示例 1:

输入: n = 3, k = 3
输出: "213"
示例 2:

输入: n = 4, k = 9
输出: "2314"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/permutation-sequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
// 数学规律 无需暴力排序
/* 
 例如n=9 以1开头的排序有 chunk1= 8!个 剩下 2-9中 已2开头的就有 chunk2=7!。。。以此类推，
 推算出索引位index就等于 向上取整(k / chunks) -1, 把这个索引位的数字剔除，k -= chunks* index；以此类推
 如果k为0了 那么剩下的一定是按顺序排序的
 k为1 且 最后只剩2个数字的时候 就是按大的在前的排序
*/
var getPermutation = function (n, k) {
  if (n === 1) return '1';
  let arr = [];
  let total = 1;
  let str = '';
  for (let i = 0; i < n; i++) {
    arr.push(i + 1);
    // 计算出n! 
    total *= (i + 1);
  }
  while (arr.length) {
    // 计算出已每个数开头排序有几种， 例如n=4,total=24,已1开头的排序有 24/4 = 6;
    const chunks = total / n;
    // 向上取整 例如k = 9  index= 9 / 6 得 2 -1 = 1; 把arr[index]处加到最后
    let index = Math.ceil(k / chunks) - 1;
    str += arr[index];
    arr.splice(index, 1);
    total = total / n; // 24/4 -> 6
    k -= chunks * index; // k = 9 - 6*1
    // 只剩下2个数字的时候，k =1,即第二个排序 交换位置即可
    if (n === 1) {
      if (k === 0) {
        str += arr[1];
        str += arr[0];
        return str;
      }
    }
    // 如果正好能整除则只要依次插入顺序即可剩下的数的排序第一是满足排序位置的
    if (k === 0) {
      str += arr.join('');
      return str;
    }
    n--;
  }
  return str;
};
console.log(getPermutation(3, 3));
console.log(getPermutation(4, 9));
console.log(getPermutation(4, 1));
console.log(getPermutation(9, 6546));