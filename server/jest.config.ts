import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { defaults } from 'jest-config';
// import { compilerOptions } from './tsconfig.json';

import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
	...defaults,
	// General
	preset: 'ts-jest',
	verbose: true,
	testTimeout: 10000,
	testEnvironment: 'node',
	roots: ['<rootDir>'],
	modulePaths: ['<rootDir>'],
	// Setup / Teardown
	// globalSetup: './test/jest.setup.ts',
	// globalTeardown: './test/jest.teardown.ts',
	// Ignore
	modulePathIgnorePatterns: ['build'],
	// Globals
	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.json',
			isolatedModules: true,
		},
	},
	// Name Mapper
	//moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),{ prefix: '<rootDir>/' }),
	moduleNameMapper: pathsToModuleNameMapper(
		{
			'@common/*': ['../src/@common/*'],
			'@core/*': ['./core/*'],
		},
		{
			prefix: '<rootDir>/',
		}
	),
	moduleFileExtensions: [...defaults.moduleFileExtensions],
	// Transform
	transform: { '^.+\\.(js|ts)$': '<rootDir>/node_modules/ts-jest' },
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$'],
	// Coverage
	coverageReporters: ['json', 'lcov', 'text-summary', 'clover'],
	coveragePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
	coverageThreshold: {
		global: {
			statements: 95,
			branches: 95,
			lines: 95,
			functions: 95,
		},
	},
};
export default config;
