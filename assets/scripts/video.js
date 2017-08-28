//video
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const menu = document.querySelector('#top-right-box');
const menuOptions = document.querySelector('.menu-boxes');
const webcam = document.querySelector('.player');
const gameButtons = document.querySelector('.game-buttons');
const rules = document.querySelector('.rules');
const pointDisplay = document.querySelector('.points');
let map = false;
let points = 0;
let range;
let rgb = {
  r: 0,
  g: 0,
  b: 0
};

// Sets initial for the setIntervals
menu.style.visibility = 'visible';
menuOptions.style.visibility = 'hidden';
webcam.style.visibility = 'hidden';
gameButtons.style.visibility = 'hidden';
rules.style.visibility = 'hidden';
pointDisplay.style.visibility = 'hidden';

// gets the video stream from the user's webcam
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

// Applies the webcam stream to a canvas
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}

let pixelMatcherOne = setInterval(function() {
  if ((range !== undefined) && (menu.style.visibility === 'visible')) {
    topRightPixels();
  }
}, 1000);

function bottomRightPixels() {
  pixelTemplate(0, 430, 50, 50);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {}
}

// matches calibrated RGA with menu RGA
function topRightPixels() {
  // Gets the area to be scanned for matching pixels.
  pixelTemplate(0, 0, 50, 30);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {

    // shows/hides the menu options
    if (menuOptions.style.visibility === 'hidden') {
      menuOptions.style.visibility = 'visible';
    } else {
      menuOptions.style.visibility = 'hidden';
    }

  }
}

let pixelMatcherTwo = setInterval(function() {
  if (menuOptions.style.visibility === 'visible') {
    topLeftOne();

    // Does not get called if map is being shown.
    if (!map) {
      topLeftTwo();
      topLeftThree();
      topLeftFour();
      topLeftFive();
      topLeftSix();
    }
  }
  if (gameButtons.style.visibility === 'visible') {
    gameStartDisplay();
    gameRulesDisplay();
    gameExitDisplay();
  }
}, 600);

// map
function topLeftOne() {
  pixelTemplate(590, 0, 50, 30);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {

    // flips the large webcam view to show the map.
    let container = document.querySelector('.flip-container');
    container.classList.toggle('hover');

    // Shows the top-right webcam view in when map is shown so as to know where to wave to hide the map.
    if (webcam.style.visibility === 'hidden') {
      webcam.style.visibility = 'visible';
    } else {
      webcam.style.visibility = 'hidden';
    }

    // makes sure other boxes cannot be set off as it is trickier to set off the map one on top-right webcam view.
    map = !map;

  }
}

// game
function topLeftTwo() {
  pixelTemplate(510, 0, 50, 30);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
    menuOptions.style.visibility = 'hidden';
    gameButtons.style.visibility = 'visible';
    menu.style.visibility = 'hidden';
  }
}

// email
function topLeftThree() {
  pixelTemplate(430, 0, 50, 30);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
    window.location.href = 'mailto:dore.maxime@gmail.com' + '?subject=Congratulations!&body=We would love to have you on our team!';
    sleepFor(3000);
  }
}

// linkedin
function topLeftFour() {
  pixelTemplate(350, 0, 50, 30);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
    window.open('https://www.linkedin.com/in/doremaxime/?locale=en_US', '_blank');
    sleepFor(3000);
  }
}

// github
function topLeftFive() {
  pixelTemplate(270, 0, 50, 30);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
    window.open('https://github.com/doremaxime', '_blank');
    sleepFor(3000);
  }
}

// portfolio
function topLeftSix() {
  pixelTemplate(190, 0, 50, 30);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
    window.open('http://www.doremaxime.com', '_blank');
    sleepFor(3000);
  }
}

// exits the game feature
function gameExitDisplay() {
  pixelTemplate(590, 450, 50, 30);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
    menuOptions.style.visibility = 'visible';
    menu.style.visibility = 'visible';
    gameButtons.style.visibility = 'hidden';
    rules.style.visibility = 'hidden';
    pointDisplay.style.visibility = 'hidden';
  }
}

// begin the game
function gameStartDisplay() {
  pixelTemplate(460, 190, 50, 30);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
    rules.style.visibility = 'hidden';
    pointDisplay.style.visibility = 'visible';
    gameButtons.style.visibility = 'hidden';
    startGame();
    document.querySelector('.points').innerHTML = 'POINTS: ' + points;
  }
}

// shows game rules
function gameRulesDisplay() {
  pixelTemplate(140, 190, 50, 30);
  if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
    rules.style.visibility = 'visible';
    pointDisplay.style.visibility = 'hidden';
  }
}

// Loops through the pixels in the requested area to get the average of the RGA
let calibrate = function() {
  let rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  let blockSize = 4;
  let i = -4;
  let count = 0;
  let data = ctx.getImageData(0, 450, 30, 30);

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

  // // helps see the area when selecting an area
  // ctx.beginPath();
  // ctx.rect(590, 450, 50, 30);
  // ctx.fillStyle = 'yellow';
  // ctx.fill();
}

// template get the average RGA in requested area to then be used for comparison
function pixelTemplate(sx, sy, sw, sh) {
  let blockSize = 2; // only visit every 5 pixels
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

// Takes a photo with the webcam and shows it (also downloadable)
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

// called after opening tabs for practicality so as to not open multiple accidently
function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }
}


// Game
function startGame() {
  let sx;
  let sy;
  let width = 50;
  let height = 30;
  let fail = 0;
  let speed = 2000;

  let axisRefresher = setInterval(function() {
    axisChanger();
  }, speed);

  let gamePixelMatcher = setInterval(function() {
    beginPlayingGame();
  }, 100);

  requestAnimationFrame(animate);

  // sets where a rectangle will appear on canvas, x & y axis
  function axisChanger() {
    sx = getRandomInt(0, 535);
    sy = getRandomInt(0, 445);
  }

  function animate() {
    requestAnimationFrame(animate);
    rectangle();
  }

  function rectangle() {
    ctx.beginPath(); // clear path and sub-paths
    ctx.strokeRect(sx, sy, width, height); // these 4 lines make a hollow rectangle: border only.
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FF0000';
  }

  function beginPlayingGame() {
    // Gets the area to be scanned for matching pixels.
    pixelTemplate(sx, sy, 50, 30);
    if (range !== undefined) {

      if ((rgb.r > range[0] && rgb.r < range[1]) && (rgb.g > range[2] && rgb.g < range[3]) && (rgb.b > range[4] && rgb.b < range[5])) {
        points++;
        document.querySelector('.points').innerHTML = 'POINTS: ' + points;

        // Resets timer and generates new rectangle
        clearInterval(axisRefresher);
        axisChanger();
        axisRefresher = setInterval(axisChanger, speed);

        // makes the speed faster every time.
        if (speed !== 300) {
          speed -= 100
        }

        // resets the fails.
        fail = 0;

      } else {
        fail++;
        if (fail === 70) {
          gameOver();
        }
      }

    }

  }

  // ends the game, resets variables and shows the game buttons.
  function gameOver() {
    sx = null;
    sy = null;
    width = null;
    height = null;
    clearInterval(axisRefresher);
    clearInterval(gamePixelMatcher);
    gameButtons.style.visibility = 'visible';
    fail = 0;
    points = 0;
  }

};

// Generates a random number within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
