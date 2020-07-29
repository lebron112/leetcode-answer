/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const numa = [
    1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1
  ];
  const numb = [
    'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'
  ];
  let res = 0;
  let i = 0;
  while (s.length) {
    const index = s.indexOf(numb[i]);
    if (index === 0) {
      res += numa[i];
      s = s.replace(numb[i], '');
    } else {
      i++;
    }
  }
  return res;
};
console.log(romanToInt('LVIII'));
console.log(romanToInt("III"));
console.log(romanToInt("MCMXCIV"));