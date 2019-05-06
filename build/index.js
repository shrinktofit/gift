"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const yargs = __importStar(require("yargs"));
const gift_1 = require("./gift");
main();
function main() {
    yargs.demandOption(['i', 'r']);
    yargs.alias('i', 'input').describe('i', 'The input file.');
    yargs.alias('r', 'root').describe('r', 'The root module name.');
    yargs.alias('n', 'name').describe('n', 'The generated module name.');
    yargs.alias('o', 'output').describe('o', 'The output file.');
    const argv = yargs.parse(process.argv);
    const { i, n, o, r } = argv;
    let name;
    if (typeof n === 'string') {
        name = n;
    }
    else if (typeof o === 'string') {
        name = path.basename(o, path.extname(o));
    }
    else {
        console.error(`You must specify a name for the result module.`);
        return -1;
    }
    let output;
    if (typeof o !== 'string') {
        output = path.join('.', 'gitf-out', `${name}.d.ts`);
    }
    else {
        if (fs.existsSync(o) && fs.statSync(o).isDirectory() ||
            !o.toLocaleLowerCase().endsWith('.d.ts')) {
            output = path.join(o, `${name}.d.ts`);
        }
        else {
            output = o;
        }
    }
    const error = gift_1.bundle({
        input: i,
        name,
        output,
        rootModule: r,
    });
    if (error !== gift_1.GiftErrors.Ok) {
        console.error(`Error occurred: ${gift_1.GiftErrors[error]}`);
        return -1;
    }
    return 0;
}
//# sourceMappingURL=index.js.map