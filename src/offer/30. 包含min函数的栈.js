/* 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

 

示例:

MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.min();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.min();   --> 返回 -2.
 

提示：

各函数的调用总次数不超过 20000 次
 

注意：本题与主站 155 题相同：https://leetcode-cn.com/problems/min-stack/

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * initialize your data structure here.
 */
// 2个栈 一个栈记录原始的 一个栈记录最小 每次丢入 同时往最小栈顶丢入一个 跟最小栈顶比更小的那个，那么最小栈始终是从大到小的 
var MinStack = function () {
  this.stack = [];
  this.minStack = [Infinity];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);
  this.minStack.push(Math.min(this.minStack[this.minStack.length - 1], x));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return this.minStack[this.minStack.length - 1];
};


// Your MinStack object will be instantiated and called as such:
var obj = new MinStack()
obj.push(5);
obj.push(3);
obj.push(2);
obj.push(1);
obj.push(7);
obj.push(6);
// obj.pop();
// obj.pop();
console.log(obj);
// 5 3 2 2 3 1 
// 5 3 2 2 2 1