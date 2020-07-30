const fs = require('fs');
const path = require('path');
const dir = __dirname;

/* 替换 1-xxx.js 成 1.xxx.js */
const formateName = () => {
  const list = fs.readdirSync(__dirname);
  list.forEach(async (item) => {
    const names = item.split('.');
    if (names[1] === 'js') {
      const name = names[0].replace('-', '.');
      fs.renameSync(path.join(__dirname, item), path.join(__dirname, name + '.js'))
    }
  });
};
// formateName();

/** 把文件放入对应序号的文件夹 例如 1-50 51-100 101-150  */
const pullFileIntoDir = () => {
  const list = fs.readdirSync(__dirname);
  list.forEach(item => {
    const name = item.split('.');
    if (!isNaN(name[0])) {
      const num = Number(name[0]);
      const res = Math.floor(num / 50);
      let dirname = path.join(__dirname, `${res * 50 + 1}-${(res + 1) * 50}`);
      const isExist = fs.existsSync(dirname);
      if (!isExist) {
        fs.mkdirSync(dirname)
      }
      fs.renameSync(path.join(__dirname, item), path.join(dirname, item));
    }
  });
};
pullFileIntoDir();