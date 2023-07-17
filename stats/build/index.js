"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
fs_1.default.readFile('/proc/meminfo', (err, data) => {
    if (err)
        throw err;
    console.log(data.toString());
});
