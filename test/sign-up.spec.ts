import { Context } from 'mocha';
import { exec } from 'child_process';
import path from 'path';

const clearDefault = () => exec('npx prisma migrate reset --force --skip-seed');

// eslint-disable-next-line prefer-arrow-callback
beforeEach(function beforeEach() {
  clearDefault();
});

afterEach(function afterEachTest(this: Context) {
  if (this.currentTest?.state === 'failed') {
    const datetime = new Date().toISOString().replace(/:/g, '-');
    const testName = this.currentTest?.fullTitle().replace(/\s+/g, '_');
    const projectBasePath = path.join(__dirname, '..');
    const wrongDatebaseOrigin = path.join(
      projectBasePath,
      'dev.db',
    );
    const wrongDatebaseTarget = path.join(
      projectBasePath,
      'dbs',
      'error_test',
      `${datetime}_${testName}.db`,
    );

    exec(
      `cp ${wrongDatebaseOrigin} ${wrongDatebaseTarget}`,
      () => exec(
        `copy ${wrongDatebaseOrigin} ${wrongDatebaseTarget}`,
        (error) => console.log(error),
      ),
    );
  }
});
