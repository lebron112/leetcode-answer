let convert = function (s, numRows) {
  let result = [],
    pos = [],
    x = 1, y = 0,
    fix = 0,
    down = 'down', up = 'up',
    dir = 'down';
  if (numRows > 1) {
    for (let i = 0; i < s.length; i++) {
      if (dir === down) {
        y++;
        if (y > numRows) {
          y = numRows;
          dir = up;
        }
      }
      if (dir === up) {
        y--;
        x++;
        if (y === 0) {
          y += 2;
          x--;
          dir = down;
        }
      }
      i === s.length - 1 && (fix = x);
      pos.push({ y: y, x: x, str: s[i] });
    }
    for (let j of pos) {
      result[j.y * fix + j.x] = j.str
    }
    return result.join('');
  } else {
    return s;
  }
};