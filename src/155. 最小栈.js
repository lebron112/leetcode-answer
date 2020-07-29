/* 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

push(x) —— 将元素 x 推入栈中。
pop() —— 删除栈顶的元素。
top() —— 获取栈顶元素。
getMin() —— 检索栈中的最小元素。
 

示例:

输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/min-stack
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

// 用一个list 存储 数组 min存储 最小值即可
var MinStack = function () {
  this.list = [];
  this.min = null;
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.list[this.list.length] = x;
  this.min = this.min === null ? x : Math.min(this.min, x);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const list = this.list;
  this.list = [];
  this.min = null;
  for (let i = 0; i < list.length - 1; i++) {
    this.list[i] = list[i];
    this.min = this.min === null ? list[i] : Math.min(this.min, list[i]);
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.list[this.list.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.min;
};