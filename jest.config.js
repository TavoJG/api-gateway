module.exports = {
	preset: 'ts-jest',
	roots: ['./tests'],
	testEnvironment: 'node',
	setupFiles: ['<rootDir>/tests/env.js'],
};
