const fs = require('fs');
const path = require('path');
const dir = process.cwd();

const list = fs.readdirSync(dir);
/* 替换 1-xxx.js 成 1.xxx.js */
list.forEach( async(item)=>{
  const names  = item.split('.');
  if(names[1] === 'js') {
    const name = names[0].replace('-','.');
    fs.renameSync(path.join(dir, item), path.join(dir, name + '.js'))
  }
});