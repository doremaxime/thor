// const voice = require('./voice');

//video
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
let menu = false;
let rgb = { r: 0, g: 0, b: 0 };
let RGBAverage = getAverageRGB();
// let setRanges = setRGBRange(RGBAverage);
let colors;

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

let pixelSetOff = setInterval(function() {
  getAverageRGB()

  if((rgb.r > colors[0] && rgb.r < colors[1]) && (rgb.g > colors[2] && rgb.g < colors[3]) && (rgb.b > colors[4] && rgb.b < colors[5])) {
    console.log('saw that');
  }

}, 500);

function setRGBRange(RGBAverage) {
  let redLow = rgb.r - 30;
  let redHigh = rgb.r + 30;
  let greenLow = rgb.g - 30;
  let greenHigh = rgb.g + 30;
  let blueLow = rgb.b - 30;
  let blueHigh = rgb.b + 30;
  colors = [redLow, redHigh, greenLow, greenHigh, blueLow, blueHigh]

}

function getAverageRGB() {
  let blockSize = 5; // only visit every 5 pixels
  let i = -4;
  // let rgb = { r: 0, g: 0, b: 0 };
  let count = 0;
  let data = ctx.getImageData(10, 10, 50, 50);
  let length = data.data.length;

  // ctx.fillStyle="#FF0000";
  // ctx.fillRect(290, 0, 10, 10);

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
  // console.log('getAverageRGB');
  // console.log(rgb);

  return rgb;
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

function takePhoto() {
  snap.currentTime = 0;
  snap.play()

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'image');
  link.textContent = ('Download Image');
  link.innerHTML = `<img src="${data}" alt="image" />`;
  strip.insertBefore(link, strip.firstChild);
}

video.addEventListener('canplay', paintToCanvas)
document.querySelector('.calibrate').addEventListener('click', setRGBRange)

getVideo();

module.exports = {
  getVideo,
  paintToCanvas,
  takePhoto,
  getAverageRGB
}
