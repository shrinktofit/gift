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
    yargs.alias('u', 'shelter-name').describe('u', 'Name of the unexported symbols\' namespace.(defaulted to "__internal")');
    yargs.alias('p', 'export-privates').describe('p', 'Indicates whether export private members of class.');
    yargs.help();
    const argv = yargs.parse(process.argv);
    const { i, n, o, r, u, p } = argv;
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
    const options = {
        input: i,
        name,
        output,
        rootModule: r,
        shelterName: u,
        exportPrivates: p,
    };
    const bundleResult = gift_1.bundle(options);
    if (bundleResult.error !== gift_1.GiftErrors.Ok) {
        console.error(`Error occurred: ${gift_1.GiftErrors[bundleResult.error]}`);
        return -1;
    }
    const outputPath = options.output;
    fs.ensureDirSync(path.dirname(outputPath));
    fs.writeFileSync(outputPath, bundleResult.code);
    return 0;
}
//# sourceMappingURL=gift-cli.js.map