/* 示例 1:

输入: 
nums = [1, 7, 3, 6, 5, 6]
输出: 3
解释: 
索引3 (nums[3] = 6) 的左侧数之和(1 + 7 + 3 = 11)，与右侧数之和(5 + 6 = 11)相等。
同时, 3 也是第一个符合要求的中心索引。
示例 2:

输入: 
nums = [1, 2, 3]
输出: -1
解释: 
数组中不存在满足此条件的中心索引。 */
var pivotIndex = function (nums) {
  let res = -1;
  // 先排除数组长度是0的情况 求出所有数值相加总和total
  let total = nums.length ? nums.reduce((a, b) => a + b) : 0;
  let st = 0;
  for (let mid = 0; mid < nums.length; mid++) {
    st += (nums[mid - 1] || 0);
    // 倒序相加值=st 如果total减去 这个值以后等于st 即左边相加和等于右边相加的和
    if ((total - nums[mid]) / 2 === st) {
      res = mid;
      break;
    }
  }
  return res;
};
console.log(pivotIndex([1, 2, 3]));