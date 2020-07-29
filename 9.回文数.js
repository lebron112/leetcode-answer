const isPalindrome = function(x) {
  return parseInt((x + '').split('').reverse().join('')) === x;
};