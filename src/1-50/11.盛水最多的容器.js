/* 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

 



图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

 

示例：

输入：[1,8,6,2,5,4,8,3,7]
输出：49

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/container-with-most-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。  */

// 暴力法 速度太慢
var maxArea = function (height) {
  if (height.length === 2) return Math.min(height[0], height[1]);
  let i = 0;
  let len = height.length;
  let area = Math.min(height[0], height[1]);
  for (let d = 0; i !== len; d++) {
    const newArea = (len - 1 - i) * (Math.min(height[i], height[len - 1]));
    if (newArea > area) area = newArea;
    if (i < len - 1) {
      i++;
    } else {
      len--;
      i = 0;
    }
  }
  return area;
};
// 双指针+动态规划 左右两指针哪边的值小就往中间靠拢 当相遇时跳出计算
var maxArea = (height) => {
  if (height.length === 2) return Math.min(height[0], height[1]);
  let area = 0;
  let st = 0;
  let et = height.length - 1;
  while (st !== et) {
    const execArea = Math.min(height[st], height[et]) * (et - st);
    area = Math.max(execArea, area);
    if (height[st] < height[et]) {
      st++;
    } else {
      et--;
    }
  }
  return area;
};
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxArea([1, 2, 1]));
console.log(maxArea([2, 3, 10, 5, 7, 8, 9]));
console.log(maxArea([2, 3, 4, 5, 18, 17, 6]));