/* 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。

序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

 

示例 1：

输入：target = 9
输出：[[2,3,4],[4,5]]
示例 2：

输入：target = 15
输出：[[1,2,3,4,5],[4,5,6],[7,8]]
 

限制：

1 <= target <= 10^5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number} target
 * @return {number[][]}
 */
// 先找出中间最大值，即2个的时候的最大值
// 用一个队列去模拟滑动窗口
// 如果值太大了，就丢出去
var findContinuousSequence = function (target) {
  if (target === 1) return [];
  const res = [];
  const mid = Math.floor(target / 2) + 1;
  let sum = 0;
  const queue = [];
  for (let i = 1; i <= mid; i++) {
    sum += i;
    queue.push(i);
    while (sum > target) {
      const head = queue.shift();
      sum -= head;
    }
    if (sum === target) {
      res.push([...queue]);
    }
  }
  return res;
};

console.log(findContinuousSequence(9));
console.log(findContinuousSequence(15));