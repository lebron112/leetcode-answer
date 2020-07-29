/* 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1:

输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
示例 2:

输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
输入：
[6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]
预期：
[6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4] */

var plusOne = function (digits) {
  // 记录最大长度和尾巴的那个数字
  let len = digits.length - 1;
  let last = digits[len];
  // 对尾巴数字 + 1 并更新这个数组
  last = last + 1;
  digits[len] = last;
  // 如果尾巴的数字大于10 曾向前进以为，即len -- 更新这个尾巴数字的值，并把这个满10进1 的进制记录下来，直到尾巴数字不等于10
  while (len) {
    if (last !== 10) {
      digits[len] = last;
      return digits;
    } else {
      digits[len] = 0;
      len--;
      digits[len] = digits[len] + 1;
      last = digits[len];
    }
  }
  // 如果循环结束后任然存在进位的数字1， 则向数组头部插入数字1
  if(digits[0] === 10) {
    digits[0] = 0;
    digits.unshift(1);
  }
  return digits;
};

console.log(plusOne([0]));