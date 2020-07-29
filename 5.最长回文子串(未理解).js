const longestPalindrome = function (str) {
  if(str.length < 2) return str;
  return manacher(str);
};
// manacher算法
function manacher(str) {
  str = String(str)
  var arr = [NaN, null]
  for (let i = 0; i < str.length; i += 1) {
    arr.push(str[i])
    arr.push(null)
  }
  arr.push(NaN)
  var iCenterMax = 1
  var lens = []
  var iCenter = 0
  var iRight = 0
  for (let i = 1; i < arr.length - 1; i += 1) {
    if (arr.length - 1 - i <= lens[iCenterMax]) {
      break
    }
    lens[i] = 0
    if (i < iRight) {
      let iMirror = 2 * iCenter - i
      lens[i] = Math.min(iRight - i, lens[iMirror])
    }
    while (arr[i + lens[i] + 1] === arr[i - lens[i] - 1]) {
      lens[i] += 1
    }
    if (i + lens[i] > iRight) {
      iCenter = i
      iRight = i + lens[i]
    }
    if (lens[i] > lens[iCenterMax]) {
      iCenterMax = i
    }
  }
  return arr.slice(iCenterMax - lens[iCenterMax], iCenterMax + lens[iCenterMax] + 1)
    .filter(item => item !== null)
    .join('')
}