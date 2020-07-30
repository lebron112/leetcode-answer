/* 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

 

示例 1：

输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
示例 2：

输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 

提示：

0 <= nums.length <= 100
0 <= nums[i] <= 400

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/house-robber
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 动态规划
var rob = function (nums) {
  // 窃取的总和
  let sum = 0;
  // 上次未窃取的数量
  let notRob = 0;
  // 最后一次盗窃的数量
  let lastRob = 0;
  for (let i = 0; i < nums.length; i++) {
    console.log(sum, notRob, lastRob);
    // 本次盗窃总和等于这家 + 未偷同和
    sum = notRob + nums[i];
     // 本次不窃, 延续之前窃了的和 不窃中的 最大值
    notRob = Math.max(lastRob, notRob);
    // 赋值上次窃的值  供下家判断使用
    lastRob = sum;
  }
  return Math.max(sum, notRob);
};

console.log(rob([1, 2, 3, 1, 6, 9]));
console.log(rob([1, 7, 9, 4]));
console.log(rob([4, 1, 2, 7, 5, 3, 1]));
console.log(rob([1, 4, 2, 7, 5, 3, 1]));
console.log(rob([2, 1, 1, 2]));