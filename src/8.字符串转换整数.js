let myAtoi = function (str) {
  let lag = Math.pow(2, 31),
    num = parseInt(str.trim());
  if (num) {
    if (num <= -lag || num >= lag) {
      return num > 0 ? lag - 1 : -lag;
    } else {
      return num;
    }
  } else {
    return 0
  }
};