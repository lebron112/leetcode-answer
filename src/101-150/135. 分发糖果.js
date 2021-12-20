/* 
师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。

你需要按照以下要求，帮助老师给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
评分更高的孩子必须比他两侧的邻位孩子获得更多的糖果。
那么这样下来，老师至少需要准备多少颗糖果呢？

 

示例 1：

输入：[1,0,2]
输出：5
解释：你可以分别给这三个孩子分发 2、1、2 颗糖果。
示例 2：

输入：[1,2,2]
输出：4
解释：你可以分别给这三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这已满足上述两个条件。
通过次数109,867提交次数225,778

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/candy
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} ratings
 * @return {number}
 */

// 正向一次，再反向一次，不能从2头开始
var candy = function (ratings) {
  const res = [];
  // 全填1
  for (let i = 0; i < ratings.length; i++) {
    res.push(1);
  }

  // 正序一次  只要后一项比前一项大，取前一项的值+1
  for (let i = 0; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      res[i] = res[i - 1] + 1;
    }
  }

  // 反向一次 只要后一项比前一项大，去前一项的值+1 和 当前项比  取大的那个
  for (let i = ratings.length - 1; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      res[i] = Math.max(res[i], res[i + 1] + 1)
    }
  }

  return res.reduce((a, b) => a + b);
};

console.log(candy([1, 3, 2, 2, 1])) // 7; 1 2 1 2 1
console.log(candy([1, 0, 2])) // 5; 2 1 2
console.log(candy([1, 2, 2])) // 4; 1 2 1
console.log(candy([1, 2, 87, 87, 87, 2, 1]))// 13;  1 2 3 1 3 2 1
console.log(candy([1, 2, 87, 97, 107, 2, 1]))// 18;  1 2 3 4 5 2 1
console.log(candy([1, 2, 87, 97, 107, 20, 10, 9, 8, 7, 8, 2]))// 24;  1 2 3 4 6 5 4 3 2 1 2 1
console.log(candy([1, 2, 87, 97, 107, 20, 102, 90, 91]))// 21;  1 2 3 4 5 1 2 1 2
console.log(candy([1, 2, 87, 0, 87, 87, 2, 1])) // 15; 1, 2, 3, 1, 2, 3, 2, 1
console.log(candy([1, 2, 87, 87, 0, 87, 2, 1])) // 15; 1, 2, 3, 2, 1, 3, 2, 1
console.log(candy([1, 2, 87, 26, 47, 87, 2, 1])) //15;  1, 2, 3, 1, 2, 3, 2, 1
console.log(candy([29, 51, 87, 87, 72, 12])) // 12; 1 2 3 3 2 1 