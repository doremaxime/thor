'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
const video = require('./video')
const voice = require('./voice')

$(() => {
  setAPIOrigin(location, config);
  video;
  voice;
});

// use require with a reference to bundle the file and use it in this file
// const example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');
