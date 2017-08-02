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

function getAverageRGB() {
  let blockSize = 5; // only visit every 5 pixels
  let defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs
  let i = -4;
  let rgb = { r: 0, g: 0, b: 0 };
  let count = 0;
  let data = ctx.getImageData(290, 0, 10, 10);
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
  console.log(rgb);
  return rgb;
}

getAverageRGB();


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

// $('.take-photo').on('click', takePhoto)

getVideo();

module.exports = {
  getVideo,
  paintToCanvas,
  takePhoto
}
