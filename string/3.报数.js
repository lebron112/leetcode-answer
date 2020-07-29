/* 报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

1.     1
2.     11
3.     21
4.     1211
5.     111221
1 被读作  "one 1"  ("一个一") , 即 11。
11 被读作 "two 1s" ("两个一"）, 即 21。
21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。

给定一个正整数 n（1 ≤ n ≤ 30），输出报数序列的第 n 项。

注意：整数顺序将表示为一个字符串。

 

示例 1:

输入: 1
输出: "1"
示例 2:

输入: 4
输出: "1211" */
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
  let str = '1';
  const m = (index) => {
    if (index >= n) return str;
    let unit = '', len = 0;
    let res = '';
    for (let i = 0; i < str.length; i++) {
      if (unit !== str[i]) {
        unit = str[i];
        len = 1;
        if (!str[i + 1]) {
          res = `${res}${len}${unit}`;
        }
        if (str[i + 1] && unit !== str[i + 1]) {
          res = `${res}${len}${unit}`;
        }
      } else {
        len++;
        if (!str[i + 1]) {
          res = `${res}${len}${unit}`;
        } else {
          if (unit !== str[i + 1]) res = `${res}${len}${unit}`;
        }
      }
    }
    str = res;
    return m(index + 1);
  };
  return m(1);
};

const countAndSay2 = (n) => {
  const m = (index, str) => {
    if (index === n) return str.join('');
    let newChar = [];
    let len = 1, unit = 0;
    for (let i = 0; i < str.length; i++) {
      unit = str[i];
      if(unit === str[i + 1]) {
        len ++;
      }else {
        newChar.push(len);
        newChar.push(unit);
        len = 1;
      }
    }
    return m(index + 1, newChar);
  };
  return m(1, [1]);
};
console.log(countAndSay(7))
console.log(countAndSay2(7));