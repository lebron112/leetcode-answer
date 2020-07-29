/* Fizz Buzz
写一个程序，输出从 1 到 n 数字的字符串表示。

1. 如果 n 是3的倍数，输出“Fizz”；

2. 如果 n 是5的倍数，输出“Buzz”；

3.如果 n 同时是3和5的倍数，输出 “FizzBuzz”。

示例：

n = 15,

  返回:
[
  "1",
  "2",
  "Fizz",
  "4",
  "Buzz",
  "Fizz",
  "7",
  "8",
  "Fizz",
  "Buzz",
  "11",
  "Fizz",
  "13",
  "14",
  "FizzBuzz"
] */
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  const arr = [];
  for (let i = 1; i <= 15; i++) {
    let a = i + ''
    if (i % 15 === 0) {
      a = 'FizzBuzz';
    } else if (1 % 3 === 0) {
      a = 'Fizz';
    } else if (1 % 5 === 0) {
      a = 'Buzz';
    }
    arr.push(a);
  }
  let res = arr;
  let s = Math.floor(n / 15);
  let t = n % 15;
  for(let i = 0; i < s; i++){
    res = res.concat(res);
  }
  return res.concat(res.slice(0, t))
};