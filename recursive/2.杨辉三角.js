/* 输入: 3
输出: [1,3,3,1] */
var generate = function (numRows) {
  const res = [];
  const i = 0;
  var mm = function (num) {
    const arr = [1];
    if (num >= numRows + 1) {
      return res[numRows];
    } else {
      if (num === 0) {
        res.push(arr);
        return mm(num + 1);
      } else if (num === 1) {
        arr.push(1);
        res.push(arr);
        return mm(num + 1);
      } else {
        const pre = res[num - 1];
        for (let i = 0; i < pre.length; i++) {
          if (pre[i + 1]) {
            arr.push(pre[i] + pre[i + 1]);
          } else {
            break;
          }
        }
        arr.push(1);
        res.push(arr);
        return mm(num + 1);
      }
    }
  }
  return mm(i);
};

console.log(generate(3));