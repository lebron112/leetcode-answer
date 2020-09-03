/* 实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须原地修改，只允许使用额外常数空间。

以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/next-permutation
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

var nextPermutation = (nums) => {
  // 基础情况处理
  if (nums.length <= 2) return nums.reverse();
  let extNumber = nums[nums.length - 1];
  const last = [];
  let hasChange = false;
  // 2种情况判断
  // 第一种情况 最后的数字比前一个数字大 直接交换位置即可
  /* 第二种情况 更新最后一个值直到 后一个值比前一个值大，前一个值更新为后面数字里正好比他的的数，
    然后把原来的丢入后面记录的数字里，后面的数字依次从小到大排序即可
  */
  for (let i = nums.length - 2; i >= 0;) {
    const num = nums[i];
    if (extNumber > num) {
      hasChange = true;
      if (!last.length) {
        // 第一种情况
        nums[i] = extNumber;
        nums[i + 1] = num;
      } else {
        // 第二种情况
        const arr = [...last, extNumber];
        // 找出last里去掉比当前数字小的 ,所有比当前数字大的数字中最小的那个数字，替换掉当前位置
        nums[i] = Math.min(...arr.filter(item => item > num));
        // 把旧的数字丢路尾巴
        arr.push(num);
        // 筛选掉那个已被使用的数字 从该位置后面的都是从小到大的 
        loopIn: for (let j = 0; j < arr.length; j++) {
          if (arr[j] === nums[i]) {
            arr.splice(j, 1); break loopIn;
          }
        }
        nums.splice(i + 1, arr.length + 1, ...arr.sort((a, b) => a - b));
      }
      break;
    } else {
      last.push(extNumber);
      extNumber = num;
      i--;
    }
  }
  // 循环结束 说明是正序的 直接反转即可
  !hasChange && nums.reverse();
};
var ar = [7, 8, 9, 1, 2, 6, 5, 4, 3];
nextPermutation(ar);
console.log('res ar', ar);

// let arr = [1, 3, 2, 4];
// nextPermutation(arr);
// console.log('res arr', arr);

let arr0 = [2, 3, 1];
nextPermutation(arr0);
console.log('res arr0', arr0);

let arr1 = [1, 3, 2];
nextPermutation(arr1);
console.log('res arr1', arr1);

const arr_ = [3, 2, 1];
nextPermutation(arr_);
console.log('res arr_', arr_);