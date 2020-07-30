var maxArea = function (height) {
  if (height.length === 2) return Math.min(height[0], height[1]);
  let i = 0;
  let len = height.length;
  let area = Math.min(height[0], height[1]);
  for (let d = 0; i !== len; d++) {
    const newArea = (len - 1 - i) * (Math.min(height[i], height[len - 1]));
    if (newArea > area) area = newArea;
    if (i < len - 1) {
      i++;
    } else {
      len--;
      i = 0;
    }
  }
  return area;
};
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxArea([1, 2, 1]));
console.log(maxArea([2,3,10,5,7,8,9]));
console.log(maxArea([2,3,4,5,18,17,6]));