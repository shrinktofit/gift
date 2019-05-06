
import * as fs from 'fs-extra';
import * as path from 'path';
import * as yargs from 'yargs';
import { bundle, GiftErrors, IOptions } from './gift';

main();

function main() {
    yargs.demandOption([ 'i', 'r' ]);
    yargs.alias('i', 'input').describe('i', 'The input file.');
    yargs.alias('r', 'root').describe('r', 'The root module name.');
    yargs.alias('n', 'name').describe('n', 'The generated module name.');
    yargs.alias('o', 'output').describe('o', 'The output file.');
    yargs.alias('u', 'shelter-name').describe(
        'u', 'Name of the unexported symbols\' namespace.(defaulted to "__internal")');

    const argv = yargs.parse(process.argv);
    const { i, n, o, r, u } = argv;

    let name: undefined | string;
    if (typeof n === 'string') {
        name = n;
    } else if (typeof o === 'string') {
        name = path.basename(o, path.extname(o));
    } else {
        console.error(`You must specify a name for the result module.`);
        return -1;
    }

    let output: undefined | string;
    if (typeof o !== 'string') {
        output = path.join('.', 'gitf-out', `${name}.d.ts`);
    } else {
        if (fs.existsSync(o) && fs.statSync(o).isDirectory() ||
            !o.toLocaleLowerCase().endsWith('.d.ts')) {
            output = path.join(o, `${name}.d.ts`);
        } else {
            output = o;
        }
    }

    const options: IOptions = {
        input: i as string,
        name,
        output,
        rootModule: r as string,
        shelterName: u as (string | undefined),
    };

    const bundleResult = bundle(options);
    if (bundleResult.error !== GiftErrors.Ok) {
        console.error(`Error occurred: ${GiftErrors[bundleResult.error]}`);
        return -1;
    }

    const outputPath = options.output;
    fs.ensureDirSync(path.dirname(outputPath));
    fs.writeFileSync(outputPath, bundleResult.code);

    return 0;
}
