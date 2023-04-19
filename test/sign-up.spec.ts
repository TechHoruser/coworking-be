import { prisma } from '@/infrastructure/persistence/PrismaClient';
import { Context } from 'mocha';
import { exec } from 'child_process';

const clearDefault = () => exec('npx prisma migrate reset --force --skip-seed');

// eslint-disable-next-line prefer-arrow-callback
beforeEach(function beforeEach() {
  clearDefault();
});

afterEach(function afterEachTest(this: Context) {
  if (this.currentTest?.state === 'failed') {
    // Copy sqlite schema to test failed schema folder
    // exec('npx prisma migrate save --name "failed-schema"');
  }
});
