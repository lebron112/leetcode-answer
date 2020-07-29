// 递归
const flat = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const res = flat(arr[i]);
      // 利用splice第三个参数 替换原来的值
      arr.splice(i, 1, ...res);
    }
  }
  return arr;
};
console.log(flat([1, 2, 3, 4, [5, 6, [7, 8, [9, 10, [11]]]]]));