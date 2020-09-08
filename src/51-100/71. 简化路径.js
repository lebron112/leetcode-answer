/* 以 Unix 风格给出一个文件的绝对路径，你需要简化它。或者换句话说，将其转换为规范路径。

在 Unix 风格的文件系统中，一个点（.）表示当前目录本身；此外，两个点 （..） 表示将目录切换到上一级（指向父目录）；两者都可以是复杂相对路径的组成部分。更多信息请参阅：Linux / Unix中的绝对路径 vs 相对路径

请注意，返回的规范路径必须始终以斜杠 / 开头，并且两个目录名之间必须只有一个斜杠 /。最后一个目录名（如果存在）不能以 / 结尾。此外，规范路径必须是表示绝对路径的最短字符串。

 

示例 1：

输入："/home/"
输出："/home"
解释：注意，最后一个目录名后面没有斜杠。
示例 2：

输入："/../"
输出："/"
解释：从根目录向上一级是不可行的，因为根是你可以到达的最高级。
示例 3：

输入："/home//foo/"
输出："/home/foo"
解释：在规范路径中，多个连续斜杠需要用一个斜杠替换。
示例 4：

输入："/a/./b/../../c/"
输出："/c"
示例 5：

输入："/a/../../b/../c//.//"
输出："/c"
示例 6：

输入："/a//b////c/d//././/.."
输出："/a/b/c"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/simplify-path
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {string} path
 * @return {string}
 */
/* 
多种情况区分  
1: /path 为一个路径 
2: ./为当前同级 
3: /.. 为返回上一层  
4: 多个'/'  视为一个'/'
 */
// 利用一个索引记录当前到第几层级，一个数字记录每一层的名字即可
// 遇到.. 的 索引位前移一位， 遇到 名字的就丢入输入 ， 索引位 + 1；
var simplifyPath = function (path) {
  let pathMap = path.split(/\/+/);
  // 所有层级的目录
  let dir = [];
  // 层级
  let index = 0;
  for (let i = 1; i < pathMap.length; i++) {
    const pa = pathMap[i];
    if (pa) {
      // '.' 不动
      if (pa === '.') {

        // '..' 返回上一层 如果已经是在最上次 则一直是顶层 
      } else if (pa === '..') {
        index--;
        if (index < 0) index = 0;
        // 否则 丢入层级目录 并且层级+1；
      } else {
        if (!dir.length) {
          dir.push(pa);
          index++;
        } else {
          dir[index] = pa;
          index++;
        }
      }
    }
  }
  const res = dir.slice(0, index).join('/');
  return '/' + res;
};
console.log(simplifyPath('/../'));
console.log(simplifyPath('/home//foo/'));
console.log(simplifyPath('/a/./b/../../c/'));
console.log(simplifyPath('/a/../../b/../c//.//'));
console.log(simplifyPath('/a//b////c/d//././/..'));