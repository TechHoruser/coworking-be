import { Context } from 'mocha';
import { execSync } from 'child_process';
import path from 'path';
import moment from 'moment-timezone';

const projectBasePath = path.join(__dirname, '..');
const wrongDatabasesPath = path.join(
  projectBasePath,
  'dbs',
  'error_test',
);
const datebaseOrigin = path.join(
  projectBasePath,
  'dev.db',
);
const clearDefault = () => {
  execSync('npx prisma migrate reset --force --skip-seed');
};

// eslint-disable-next-line prefer-arrow-callback
beforeEach(function beforeEach() {
  clearDefault();
});

// eslint-disable-next-line prefer-arrow-callback
before(function before() {
  execSync(`del /s /q ${wrongDatabasesPath}\\*.db`);
});

afterEach(function afterEachTest(this: Context) {
  if (this.currentTest?.state === 'failed') {
    const datetime = moment().tz('Europe/Madrid').format('YYYYMMDDHHmmssSSS');
    const testFullTitle = this.currentTest?.fullTitle();
    const testCase = (this.currentTest?.title ?? '').replace(/\s+/g, '_');
    const testTitle = testFullTitle?.slice(0, testFullTitle.length - testCase.length - 1);
    const testName = `${testTitle}-${testCase}`;
    const wrongDatebaseTarget = path.join(
      wrongDatabasesPath,
      `${datetime}-${testName}.db`,
    );

    execSync(`copy ${datebaseOrigin} ${wrongDatebaseTarget}`);
  }
});
