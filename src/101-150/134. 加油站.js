/* 
在一条环路上有 N 个加油站，其中第 i 个加油站有汽油 gas[i] 升。

你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。

如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1。

说明: 

如果题目有解，该答案即为唯一答案。
输入数组均为非空数组，且长度相同。
输入数组中的元素均为非负数。
示例 1:

输入: 
gas  = [1,2,3,4,5]
cost = [3,4,5,1,2]

输出: 3

解释:
从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
因此，3 可为起始索引。
示例 2:

输入: 
gas  = [2,3,4]
cost = [3,4,3]

输出: -1

解释:
你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
因此，无论怎样，你都不可能绕环路行驶一周。
通过次数137,503提交次数242,224

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/gas-station
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
// 暴力法，穷举所有的可能性  超时
var canCompleteCircuitViolence = function (gas, cost) {
  if (!gas.length) return -1;
  const check = (startIndex) => {
    const copyGas = [...gas.slice(startIndex), ...gas.slice(0, startIndex)];
    const copyCost = [...cost.slice(startIndex), ...cost.slice(0, startIndex)];
    let last = 0;
    for (let i = 0; i < copyGas.length; i++) {
      const res = last + copyGas[i] - copyCost[i];
      if (res < 0) {
        return false;
      } else {
        last = res;
      }
    }
    return true;
  };
  for (let i = 0; i < gas.length; i++) {
    const can = check(i);
    if (can) return i;
  }
  return -1;
};

// 对cost消耗进行求和, 如果<0 则不能到达
// 记录每次剩下的油耗，如果油耗< 0 则从下一站进行尝试
const canCompleteCircuit = (gas, cost) => {
  let sum = 0; // 记录消耗差，如果差<0 则不能到达
  let res = 0; // 记录尝试剩下后的油耗
  let index = 0; // 返回的索引位
  for (let i = 0; i < cost.length; i++) {
    const rGas = gas[i] - cost[i]; // 到下一站消耗的油耗
    res = res + rGas; // 剩余油耗
    sum = sum + rGas; // 记录油耗差
    // 如果剩余油耗不足，则尝试从下一站开始
    if (res < 0) {
      res = 0;
      index = i + 1;
    }
  }
  // 先进行求和，判断能不能到
  return sum < 0 ? -1 : index;
}
console.log(canCompleteCircuit(
  [1, 2, 3, 4, 5],
  [3, 4, 5, 1, 2]
))//3
console.log(canCompleteCircuit(
  [1, 2, 3, 4, 5],
  [3, 4, 5, 1, 3]
))// -1
console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3]))// -1