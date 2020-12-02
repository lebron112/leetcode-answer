/* 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

有效的 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如："0.1.2.201" 和 "192.168.1.1" 是 有效的 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效的 IP 地址。

 

示例 1：

输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]
示例 2：

输入：s = "0000"
输出：["0.0.0.0"]
示例 3：

输入：s = "1111"
输出：["1.1.1.1"]
示例 4：

输入：s = "010010"
输出：["0.10.0.10","0.100.1.0"]
示例 5：

输入：s = "101023"
输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/restore-ip-addresses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} s
 * @return {string[]}
 */
// 暴力法 找出 所有分割的可能性arr列表
// 对arr列表split后长度为4的进行检查符合的
var restoreIpAddresses = function (s) {
  if (s.length < 4) return [];
  if (s.length === 4) return [s.split('').join('.')];
  const res = [];
  const checkoutHash = {};
  const checkIps = (ips) => {
    const key = ips.join('-');
    if (!checkoutHash[key]) {
      checkoutHash[key] = true;
      // 检查第1位
      if (ips[0][0] !== '0' && Number(ips[0]) >= 0 && Number(ips[0]) <= 255 || ips[0] === '0') {
        // 检查第2位
        if (ips[1][0] !== '0' && Number(ips[1]) >= 0 && Number(ips[1]) <= 255 || ips[1] === '0') {
          // 检查第3位
          if (ips[2][0] !== '0' && Number(ips[2]) >= 0 && Number(ips[2]) <= 255 || ips[2] === '0') {
            // 检查第4位
            if (ips[3][0] !== '0' && Number(ips[3]) >= 0 && Number(ips[3]) <= 255 || ips[3] === '0') {
              res.push(ips.join('.'));
            }
          }
        }
      }
    }
  };
  const findFn = (ips, remainStr) => {
    if (!remainStr) {
      if (ips.length === 4) {
        checkIps(ips);
      }
    } else {
      // 检查过长的输入
      if (ips.length <= 4) {
        for (let i = 1; i < 4; i++) {
          const next = remainStr.slice(0, i);
          const newIps = [...ips, next];
          findFn(newIps, remainStr.slice(i));
        }
      }
    }
  };
  findFn([s[0]], s.slice(1), 1);
  findFn([s.slice(0, 2)], s.slice(2), 2);
  findFn([s.slice(0, 3)], s.slice(3), 3);
  return res;
};
console.log(restoreIpAddresses('25525511135'));//["255.255.11.135","255.255.111.35"]
console.log(restoreIpAddresses('0000'));
console.log(restoreIpAddresses('1111'));
console.log(restoreIpAddresses('101023')); //["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
console.log(restoreIpAddresses('103023'));//["1.0.30.23","10.3.0.23","10.30.2.3","103.0.2.3"]
console.log(restoreIpAddresses("010010"));