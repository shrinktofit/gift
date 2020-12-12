#!/usr/bin/env node

import * as fs from 'fs-extra';
import * as path from 'path';
import * as yargs from 'yargs';
import { bundle, IOptions } from './gift';

main();

async function main() {
    yargs.demandOption([ 'i', 'r' ]);
    yargs.option('input', {
        alias: 'i',
        description: 'The input files(that contains `declare module "..." { }`).',
        array: true,
    });
    yargs.option('root-dir', {
        type: 'string',
        description: 'The root dir.'
    });
    yargs.alias('r', 'root').describe('r', 'The root module name.');
    yargs.alias('n', 'name').describe('n', 'The generated module name.');
    yargs.alias('o', 'output').describe('o', 'The output file.');
    yargs.alias('u', 'shelter-name').describe(
        'u', 'Name of the unexported symbols\' namespace.(defaulted to "__internal")');
    yargs.alias('p', 'export-privates').describe(
        'p', 'Indicates whether export private members of class.');
    yargs.option('verbose', { type: 'boolean', default: false });
    yargs.option('config', {
        type: 'string',
    });
    yargs.help();

    const argv = yargs.parse(process.argv);
    const { i, n, o, r, u, p, verbose, config: configFile, rootDir } = argv;

    let entries: Record<string, string> | undefined;
    if (configFile) {
        let config;
        try {
            config = fs.readJsonSync(configFile as string);
        } catch (err) {
            console.error(`Failed to read config file ${configFile}\n`, err);
        }
        entries = config.entries;
    }

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
        rootDir: rootDir as (string | undefined),
        name,
        output,
        rootModule: r as string,
        shelterName: u as (string | undefined),
        exportPrivates: p as (string | undefined),
        verbose: verbose as boolean,
        entries,
    };

    try {
        const bundleResult = bundle(options);
        await Promise.all(bundleResult.groups.map(async (group) => {
            await fs.outputFile(group.path, group.code, { encoding: 'utf8' });
        }));
    } catch (err) {
        console.error(err);
        return -1;
    }

    return 0;
}
