'use strict';

const nodeEnv = {
  current: process.env.NODE_ENV,
  set: {
    dev(done) {
      process.env.NODE_ENV = nodeEnv.current = 'development';
      done();
    },
    prod(done) {
      process.env.NODE_ENV = nodeEnv.current = 'production';
      done();
    }
  }
};

module.exports = nodeEnv;
