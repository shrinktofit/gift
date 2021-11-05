
import { distributeExports } from '../../source/distribute-exports';
import ts from 'typescript';
import ps from 'path';

describe('Export priority', () => {

    function genProg (inputs: string[], entryModuleNames: string[]) {
        const entryModuleNameX = entryModuleNames.map((name) => `"${name}"`);
        const program = ts.createProgram({
            rootNames: inputs,
            options: {},
        });
        const typeChecker = program.getTypeChecker();
        const entryModules = typeChecker.getAmbientModules().filter((m) => entryModuleNameX.includes(m.getName()));
        return {
            program,
            typeChecker,
            entryModules,
        };
    };

    test('Specified priority', () => {
        const { entryModules, typeChecker } = genProg(
            [ ps.join(__dirname, 'specified-priority', 'input.d.ts') ],
            [ 'aa', 'bb' ],
        );
        const [aSymbol, bSymbol] = entryModules;

        {
            const [aDistribute, bDistribute] = distributeExports(entryModules, typeChecker, [
                'aa',
                'bb',
            ]);
            expect(aDistribute.mainExports.length).toBe(1);
            expect(aDistribute.mainExports[0].exportSymbol.getName()).toBe('C');
            expect(bDistribute.mainExports.length === 0);
        }

        {
            const [aDistribute, bDistribute] = distributeExports(entryModules, typeChecker, [
                'bb',
                'aa',
            ]);
            expect(bDistribute.mainExports.length).toBe(1);
            expect(bDistribute.mainExports[0].exportSymbol.getName()).toBe('C');
            expect(aDistribute.mainExports.length === 0);
        }
    });


});