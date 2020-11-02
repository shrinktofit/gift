
import ps from 'path';
import fs from 'fs-extra';
import { bundle, GiftErrors } from '../../source/gift';

test('alias export', async () => {
    const match = async (dirName: string) => {
        const inputPath = ps.join(__dirname, dirName, 'input.d.ts');
        const outputPath = ps.join(__dirname, dirName, 'output.d.ts');
        const { code, error } = bundle({
            input: inputPath,
            rootModule: 'index',
            name: 'out/index',
            output: outputPath,
        });
        expect(error).toStrictEqual(GiftErrors.Ok);
        const expectedCode = await fs.readFile(outputPath, 'utf8');
        expect(code).toStrictEqual(expectedCode);
    };

    // Export from namespace to module
    await match('n-m');
    
    // Export from namespace to namespace
    await match('n-n');
    
    // Export from module to namespace
    await match('m-n');
});