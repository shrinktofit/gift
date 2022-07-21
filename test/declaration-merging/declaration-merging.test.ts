
import ps from 'path';
import { bundle } from '../../source/gift';

test('Declaration merging', () => {
    const inputPath = ps.join(__dirname, 'input.d.ts');
    const outputPath = ps.join(__dirname, 'output.d.ts');

    const result = bundle({
        input: inputPath,
        output: outputPath,
        entries: {
            'cc': 'index',
        },
    });

    expect(result).toMatchSnapshot();
});