module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
        '^.+\\.scss$': 'jest-scss-transform',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    globals: {
        fetch: global.fetch,
    }
};