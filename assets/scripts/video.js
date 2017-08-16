const voice = require('./voice');


//video
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
let rgb = {
  r: 0,
  g: 0,
  b: 0
};
let range;

function getVideo() {
  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    }).catch(err => {
      console.error('oh no', err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}

let pixelMatcher = setInterval(function() {
  if (range !== undefined) {
    bottomRightPixels();
    topRightPixels();
  }
}, 600);

function bottomRightPixels() {
  pixelTemplate(0, 430, 50, 50);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
  console.log('bottom right');
  }
}

function topRightPixels() {
  pixelTemplate(0, 0, 50, 50);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
  console.log('top right');
  voice.time();
  }
}

function topRightPixels() {
  pixelTemplate(590, 0, 50, 50);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
  console.log('top left');
  let container = document.querySelector('.flip-container');
  container.classList.toggle('hover');
  }
}

let calibrate = function() {
  let rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  let blockSize = 4;
  let i = -4;
  let count = 0;
  let data = ctx.getImageData(0, 430, 50, 50);
  let length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  let redLow = rgb.r - 40;
  let redHigh = rgb.r + 40;
  let greenLow = rgb.g - 40;
  let greenHigh = rgb.g + 40;
  let blueLow = rgb.b - 40;
  let blueHigh = rgb.b + 40;
  range = [redLow, redHigh, greenLow, greenHigh, blueLow, blueHigh];
}

function pixelTemplate(sx, sy, sw, sh) {
  let blockSize = 4; // only visit every 5 pixels
  let i = -4;
  let count = 0;
  let data = ctx.getImageData(sx, sy, sw, sh);
  let length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'image');
  link.textContent = ('Download Image');
  link.innerHTML = `<img src="${data}" alt="image" />`;
  strip.insertBefore(link, strip.firstChild);
}

video.addEventListener('canplay', paintToCanvas);
document.querySelector('.calibrate').addEventListener('click', calibrate);

getVideo();

module.exports = {
  getVideo,
  paintToCanvas,
  takePhoto,
  calibrate,
}
