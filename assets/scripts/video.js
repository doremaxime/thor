// const voice = require('./voice');

//video
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

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

let menu = false;
let pixelSetOff = setInterval(function() {
  getAverageRGB()
  if((rgb.r > 130 && rgb.r < 170) && (rgb.g > 0 && rgb.g < 20) && (rgb.b > 50 && rgb.b < 110)) {
    console.log('saw that');

    if (menu) {
      $('.nav').css('visibility', 'hidden');
    } else {
      $('.nav').css('visibility', 'visible')
      $('.nav').show('slide', {
        direction: 'right'
      }, 2000);
    }
    menu = !menu;
    // let message = 'Top right';
    // voice.loadVoices(message);
  }
}, 500);

let rgb = { r: 0, g: 0, b: 0 };
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
getVideo();

module.exports = {
  getVideo,
  paintToCanvas,
  takePhoto,
  getAverageRGB
}
