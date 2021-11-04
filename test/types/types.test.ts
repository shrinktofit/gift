
import ps from 'path';
import fs from 'fs-extra';
import { bundle } from '../../source/gift';

test('From triple slash directive', async () => {
    const inputPath = ps.join(__dirname, 'input.d.ts');
    const outputPath = ps.join(__dirname, 'output.d.ts');
    const { groups } = bundle({
        input: inputPath,
        rootModule: 'index',
        name: 'cc',
        output: outputPath,
    });
    expect(groups.length).toBe(1);
    const group0 = groups[0];

    expect(group0.code).toMatchSnapshot();
});