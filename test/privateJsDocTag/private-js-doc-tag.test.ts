
import ps from 'path';
import { bundle } from '../../source/gift';

test('Private JS doc tag', async () => {
    const inputPath = ps.join(__dirname, './test-case/index.d.ts');
    const { groups } = bundle({
        input: inputPath,
        rootModule: inputPath,
        name: 'testTag',
        output: ps.join(__dirname, './outout.d.ts'),
        privateJsDocTag: 'internal',        
    });
    expect(groups.length).toBe(1);
    expect(groups[0].code).toMatchSnapshot();
});