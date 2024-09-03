// jest.config.ts
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app directory
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom', // Use the jsdom environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Jest setup file
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Handle module aliases (e.g., '@/components/*')
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest to handle TypeScript files
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ignore node_modules
  ],
};

export default createJestConfig(customJestConfig);
