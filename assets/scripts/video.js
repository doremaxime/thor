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
let RGBAverage = getAverageRGB();
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
  if (colors !== undefined) {
    getAverageRGB();

    if ((rgb.r > colors[0] && rgb.r < colors[1]) && (rgb.g > colors[2] && rgb.g < colors[3]) && (rgb.b > colors[4] && rgb.b < colors[5])) {
    let container = document.querySelector('.flip-container');
    container.classList.toggle('hover');
    }
  }
}, 600);

function setRGBRange(RGBAverage) {
  let redLow = rgb.r - 40;
  let redHigh = rgb.r + 40;
  let greenLow = rgb.g - 40;
  let greenHigh = rgb.g + 40;
  let blueLow = rgb.b - 40;
  let blueHigh = rgb.b + 40;
  colors = [redLow, redHigh, greenLow, greenHigh, blueLow, blueHigh];
}

function getAverageRGB() {
  let blockSize = 4; // only visit every 5 pixels
  let i = -4;
  let count = 0;
  // let data = ctx.getImageData(10, 10, 50, 50);
  let data = ctx.getImageData(0, 430, 50, 50);
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

getVideo();

module.exports = {
  getVideo,
  paintToCanvas,
  takePhoto,
  getAverageRGB,
  setRGBRange,
  RGBAverage
}
