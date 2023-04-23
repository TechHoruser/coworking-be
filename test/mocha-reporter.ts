/* eslint-disable semi-style */
// eslint-disable-next-line import/no-import-module-exports
import { Runner, Test, reporters } from 'mocha';

const { Base } = reporters;
const { color } = Base;
const {
  EVENT_RUN_BEGIN,
  EVENT_TEST_PASS,
  EVENT_TEST_FAIL,
  EVENT_RUN_END,
} = Runner.constants;

const FAIL_TIME = 1000;
const WARNING_TIME = 200;

class CustomReporter extends Base {
  constructor(runner: Runner) {
    super(runner);

    const getDurationString = (test: Test): string => {
      const { duration } = test;
      if (duration == null) {
        return color('medium', '--ms');
      }

      if (duration < WARNING_TIME) {
        return color('checkmark', `${duration}ms`);
      }

      if (duration < FAIL_TIME) {
        return color('medium', `${duration}ms`);
      }

      return color('fail', `${duration}ms`);
    };

    runner
      .once(EVENT_RUN_BEGIN, () => {
        // console.log('start');
      })
      .on(EVENT_TEST_PASS, (test) => {
        console.log([
          color('checkmark', `  ${test.title} (`),
          getDurationString(test),
          color('checkmark', ')'),
        ].join(''));
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        console.log([
          color('fail', `  ${test.title} (`),
          getDurationString(test),
          color('fail', ')'),
        ].join(''));
      })
      .once(EVENT_RUN_END, () => {
        // const { stats } = runner;
        // console.log('Overall stats', stats);
      })
    ;
  }
}

module.exports = CustomReporter;
