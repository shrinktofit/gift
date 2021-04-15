
import ps from 'path';
import fs from 'fs-extra';
import { bundle } from '../../source/gift';

test('Type alias', async () => {
    const inputPath = ps.join(__dirname, 'input.d.ts');
    const outputPath = ps.join(__dirname, 'output.d.ts');
    const { groups } = bundle({
        input: inputPath,
        rootModule: 'foo',
        name: 'out/index',
        output: outputPath,
    });
    expect(groups.length).toBe(1);
    const group0 = groups[0];
    
    if (!await fs.pathExists(outputPath)) {
        await fs.outputFile(outputPath, group0.code, { encoding: 'utf8' });
    } else {
        const expected = await fs.readFile(outputPath, 'utf8');
        expect(group0.code).toBe(expected);
    }
});