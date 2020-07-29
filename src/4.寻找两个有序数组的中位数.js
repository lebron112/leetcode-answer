const findMedianSortedArrays = function (nums1, nums2) {
  const newArr = nums1.concat(nums2).sort((a, b) => a - b);
  const len = newArr.length;
  const x = len / 2;
  return len % 2 === 0 ? (newArr[x - 1] + newArr[x]) / 2 : (newArr[Math.floor(x)]);
};

// test 
console.log(findMedianSortedArrays([1, 3], [2]));
console.log(findMedianSortedArrays([1, 2], [3, 4]));