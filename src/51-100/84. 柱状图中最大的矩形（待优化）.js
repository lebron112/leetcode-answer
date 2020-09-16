/* 84. 柱状图中最大的矩形
给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。
      !
    ! !
    ! !
    ! !   !
!   ! ! ! !
! ! ! ! ! !
以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
     !
    [! !]
    [! !]
    [! !]   !
!   [! !] ! !
! ! [! !] ! !

图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。
示例:

输入: [2,1,5,6,2,3]
输出: 10 */
// 动态规划 + 双指针
// 暴力规划
// 循环每一个数字 往左右两边延升，直到最左和最右的数字都小于当前索引位的值时 进行计算
// 时间复杂度不符合要求
var largestRectangleArea = function (heights) {
  if (!heights.length) return 0;
  let maxSize = heights[0];
  const findSize = (index) => {
    let left = index - 1;
    let right = index;
    const val = heights[index];
    while (heights[left] && heights[left] >= val) {
      left--;
    }
    while (heights[right] && heights[right] >= val) {
      right++;
    }
    right--;
    maxSize = Math.max((right - left) * val, maxSize);
  };
  for (let index = 0; index < heights.length; index++) {
    findSize(index);
  }
  return maxSize;
};
// 单调栈   

// console.log(largestRectangleArea2([1, 1]));
console.log(largestRectangleArea2([2, 1, 5, 6, 2, 3]));
// console.log(largestRectangleArea2([2, 3]));