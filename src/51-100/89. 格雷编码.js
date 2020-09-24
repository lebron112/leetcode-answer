/* 格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。

给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。即使有多个不同答案，你也只需要返回其中一种。

格雷编码序列必须以 0 开头。

 

示例 1:

输入: 2
输出: [0,1,3,2]
解释:
00 - 0
01 - 1
11 - 3
10 - 2

对于给定的 n，其格雷编码序列并不唯一。
例如，[0,2,3,1] 也是一个有效的格雷编码序列。

00 - 0
10 - 2
11 - 3
01 - 1
示例 2:

输入: 0
输出: [0]
解释: 我们定义格雷编码序列必须以 0 开头。
     给定编码总位数为 n 的格雷编码序列，其长度为 2n。当 n = 0 时，长度为 2^0 = 1。
     因此，当 n = 0 时，其格雷编码序列为 [0]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/gray-code
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number} n
 * @return {number[]}
 */
// 循环遍历即可
// 0 => ['0'] 1=>['0', '1'] 2=> ['00','01','11','10'] 
// 每下一个值 倒序遍历 n -1,并在每一个前面插入0  在去掉第一个最字符 然后前面插入 1  依次丢入队列即可 
// 最后转10进制
var grayCode = function (n) {
  let res = [];
  n >= 0 && res.push('0');
  n >= 1 && res.push('1');
  let loopIndex = 1;
  while (loopIndex < n) {
    // 前插0
    const copyRes = [...res.map(item => '0' + item)];
    const next1 = [];
    for (let i = copyRes.length - 1; i >= 0; i--) {
      // 前插1
      next1.push('1' + copyRes[i].slice(1));
    }
    res = copyRes.concat(next1);
    loopIndex++;
  }
  // 转10进制
  return res.map(item => parseInt(item, 2));
};
// console.log(grayCode(0));
// console.log(grayCode(1));
console.log(grayCode(2));
console.log(grayCode(3));
console.log(grayCode(4));