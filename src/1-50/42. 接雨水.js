/* 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。



上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 感谢 Marcos 贡献此图。

示例:

输入: [0,1,0,2,1,0,1,3,2,1,2,1]
输出: 6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/trapping-rain-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let sum = 0;
  let list = [];
  let last = 0;
  // 关键步骤
  const loopSplice = () => {
    // 对存储的数进行二次处理 
    for (let i = 0; i < list.length; i++) {
      // 要比较的值
      const v = list[i].v;
      inloop: for (let j = i + 1; j < list.length; j++) {
        // 当前的值
        const now = list[j];
        // 下一个值
        const next = list[j + 1];
        // 当下一个值和要比较的值 比当前的值大 则删除,并跳出循环 执行下一步
        if (next && next.v > now.v && v > now.v) {
          list.splice(j, 1);
          i--;
          break inloop;
        }
      }
    }
  };
  // 找出凸出的数列
  for (let i = 0; i < height.length; i++) {
    const now = height[i];
    let next = height[i + 1];
    if (next === undefined) next = 0;
    // 当前值比下一个和前一个大时 进行存储
    if (now > last && now >= next) list.push({ i, v: now });
    last = now;
  }
  // 对存储的数进行处理  去除高低高之间的低数
  loopSplice();
  // 累加操作 
  const loop = (st, et) => {
    // 取2个值之间小的值
    const min = Math.min(height[st], height[et]);
    let loopSum = 0;
    for (let i = st + 1; i < et; i++) {
      if (min > height[i]) loopSum += min - height[i];
    }
    return loopSum;
  };
  // 循环累加
  for (let i = 0; i < list.length; i++) {
    const start = list[i];
    const end = list[i + 1];
    if (end) {
      sum += loop(start.i, end.i);
    }
  }
  return sum;
};
let d = '--------------';
console.log(d, trap([8, 8, 1, 5, 6, 2, 5, 3, 3, 9])); // 0, 4 , 6, 9 // 31
console.log(d, trap([5, 5, 1, 8, 1, 1, 5, 2, 7, 6, 1, 3, 1, 6])); // 0, 3, 6, 8, 10, 12 => 0,3,8, 12 // 36
console.log(d, trap([5, 5, 1, 7, 1, 1, 5, 2, 7, 6])); // 0, 3, 6, 8 => 0,3,8 //23
console.log(d, trap([5, 2, 1, 2, 1, 5])); // 0, 2, 4 // 14
console.log(d, trap([5, 4, 1, 2])); //0,3 // 1
console.log(d, trap([2, 0, 2])); // 0 ,2 //2
console.log(d, trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))  // 1,3,7,10 //6