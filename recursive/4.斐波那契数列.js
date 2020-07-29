// 缓存后速度很快
var fib = function (N) {
  const cache = { };
  let res;
  const m = function (N) {
    if (cache[N]) {
      return cache[N];
    } else {
      if(N === 0){
        res = 0;
      }else if (N <= 2) {
        res = 1;
      } else {
        res = m(N - 1) + m(N - 2);
      }
      cache[N] = res;
      return res;
    }
  };
  return m(N);
};
// 非缓存非常慢
var fib2 = function(N){
  let res;
  const m = function (N) {
    if(N === 0){
      res = 0;   
    }else if (N <= 2) {
      res = 1;
    } else {
      res = m(N - 1) + m(N - 2);
    }
    return res;
  };
  return m(N);
};

var a = Date.now();
fib(4500);
console.log(`用时${Date.now() - a}毫秒`);