
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
    expect(groups[0].code).toMatchSnapshot();
});