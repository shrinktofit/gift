
import ps from 'path';
import fs from 'fs-extra';
import { bundle } from '../../source/gift';

describe('alias export', () => {
    const match = async (dirName: string) => {
        const inputPath = ps.join(__dirname, dirName, 'input.d.ts');
        const outputPath = ps.join(__dirname, dirName, 'output.d.ts');
        const result = bundle({
            input: inputPath,
            rootModule: 'index',
            name: 'out/index',
            output: outputPath,
        });
        expect(result.groups.length).toBe(1);
        expect(result.groups[0].code).toMatchSnapshot();
    };

    // Export from namespace to module
    test('n-m', async () => await match('n-m'));
    
    // Export from namespace to namespace
    test('n-n', async () => await match('n-n'));
    
    // Export from module to namespace
    test('m-n', async () => await match('m-n'));
});