let reverse = function (x) {
  let result = 0,
    sin = x >= 0 ? '+' : '-',
    str = x + sin,
    lag = Math.pow(2, 31);
  result = parseInt(str.split('').reverse().join(''));
  if (result < -lag || result > lag - 1) {
    return 0
  }
  return result
};