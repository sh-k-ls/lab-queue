"use strict";

const curDir = process.cwd() + '/';
const copy = require(curDir + '/node_modules/recursive-copy');

const srcDir = './../../shared';
const destDir = curDir + 'src/shared/front-back-end';
 
copy(srcDir, destDir, (err) => {
    if (err) {
        console.error('Copy failed: ' + err);
    } else {
        console.info(`Copied files from '${srcDir} to '${destDir}'\n`);
    }
});
