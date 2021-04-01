"use strict";

const copy = require('./../front-end/lab-queue/node_modules/recursive-copy');

const srcDir = './../../shared';
const destDir = 'src/shared/front-back-end';
 
copy(srcDir, destDir, (err) => {
    if (err) {
        console.error('Copy failed: ' + err);
    } else {
        console.info(`Copied files from '${srcDir} to '${destDir}'\n`);
    }
});
