module.exports = {
    testMatch: ['<rootDir>/test/**/*.test.ts','<rootDir>/test/**/*.test.tsx'],
    rootDir: '',
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
        '@test/(.*)': '<rootDir>/test/$1',
        '\\.(css|less)$': 'identity-obj-proxy',
    },
    bail: true
};
