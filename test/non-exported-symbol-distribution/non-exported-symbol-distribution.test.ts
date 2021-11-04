
import ps from 'path';
import fs from 'fs-extra';
import { bundle, IOptions } from '../../source/gift';

test('Non exported symbol distribution', async () => {
    const inputPath = ps.join(__dirname, 'input.d.ts');
    const outputPath = ps.join(__dirname, 'output.d.ts');

    const bundleOptions: IOptions = {
        input: inputPath,
        output: outputPath,
        entries: {
            'baz': 'baz', // The firstly encountered module; we processing module in order of entries.
            'foo': 'foo',
            'bar': 'bar',
        },
    };

    {
        const { groups } = bundle({
            ...bundleOptions,
            nonExportedSymbolDistribution: [{
                sourceModule: /internal/,
                targetModule: 'foo',
            }],
        });
        expect(groups.length).toBe(1);
        const group0 = groups[0];
        expect(group0.code).toMatchSnapshot('Export to foo');
    }

    {
        const { groups } = bundle({
            ...bundleOptions,
            nonExportedSymbolDistribution: [{
                sourceModule: /internal/,
                targetModule: 'bar',
            }],
        });
        expect(groups.length).toBe(1);
        const group0 = groups[0];
    
        expect(group0.code).toMatchSnapshot('Export to bar');
    }

    {
        // By default, export to "current" module(where it's firstly encountered)
        const { groups } = bundle({
            ...bundleOptions,
        });
        expect(groups.length).toBe(1);
        const group0 = groups[0];
    
        expect(group0.code).toMatchSnapshot('Export to "firstly encountered" module');
    }
});