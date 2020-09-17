/* 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

注意:
不能使用代码库中的排序函数来解决这道题。

示例:

输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
进阶：

一个直观的解决方案是使用计数排序的两趟扫描算法。
首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
你能想出一个仅使用常数空间的一趟扫描算法吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-colors
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 普通方法 先检查一遍对 统计出 0 和 1的个数 然后再进行一遍排序 即2趟扫描
var sortColors = function (nums) {
  let i0 = 0;
  let i1 = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) i0++;
    if (nums[i] === 1) i1++;
  }
  for (let i = 0; i < nums.length; i++) {
    if (i < i0) {
      nums[i] = 0;
    } else if (i >= i0 && i < i1 + i0) {
      nums[i] = 1;
    } else {
      nums[i] = 2;
    }
  }
};
// 3路快速排序思路  把 2都往队尾放， 把0往队首放，剩下的一定是1;
/*
 n长度的数组 假设0有 i个 2有 j 个  那么 1的个数就是n - i - j 
 */
var sortColors2 = (nums) => {
  // 记录0的个数
  let zero = 0;
  const change = (index1, index2) => {
    let tmp = nums[index1];
    nums[index1] = nums[index2];
    nums[index2] = tmp;
  }
  // 双指针
  for (let i = 0, j = nums.length - 1; i <= j;) {
    // 如果是2 直接和右指针值 交换位置，并且右指针往左移
    if (nums[i] === 2) {
      change(i, j);
      j--;
    // 如果是0 那么交换位置到队首, 并且0的个数记录加1 下次交换0的时候从即能一直放到队伍最前 
    // 0 和 1 左指针都往右移
    } else if (nums[i] === 0) {
      change(zero, i);
      i++;
      zero++;
    } else {
      i++;
    }
  }
};
var a = [2, 2, 2, 1, 2, 0, 0, 0, 0, 1, 1, 0, 2, 1, 1, 2, 2, 1, 1, 2, 1];
var b = [2, 0, 1];
sortColors2(b);
// sortColors(a);
console.log(b);