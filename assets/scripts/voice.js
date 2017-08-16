const video = require('./video');

//VOICE
let errorMsg = document.querySelector('.msg');
if (!'speechSynthesis' in window) {
  errorMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis which is a major feature of this website.'
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

let voices = [];
window.speechSynthesis.onvoiceschanged = function() {
  voices = window.speechSynthesis.getVoices();
};

function loadVoices(message) {
  const msg = new SpeechSynthesisUtterance();
  msg.voice = voices[48];
  msg.text = message;
  speechSynthesis.speak(msg);
};

const contacts = {
  Max: 'dore.maxime@gmail.com',
}

const lastWord = function(transcript) {
  return ("" + transcript).replace(/[\s-]+$/, '').split(/[\s-]/).pop();
};

function speak(e) {
  let transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
  // console.log('transcript is: ' + transcript);

  // developing this function to be able to change the voices female-male
  // if (transcript.includes('male voice')) {
  //   let message = ('I now have a male voice');
  //   let voice = voices[50];
  //   loadVoices(message, voice);
  // }

  if (transcript.includes('what') && transcript.includes('time')) {
    time();
  }

  if (transcript.includes('open') && transcript.includes('menu')) {
    $('.nav').css('visibility', 'visible')
    $('.nav').show('slide', {
      direction: 'right'
    }, 2000);
  }
  if ((transcript.includes('exit') || transcript.includes('close')) && transcript.includes('menu')) {
    $('.nav').css('visibility', 'hidden');
  }

  if (transcript.includes('what') && transcript.includes('weather') && transcript.includes('in')) {
    let weather = 'http://api.openweathermap.org/data/2.5/weather?q=' + `${lastWord(transcript)}` + '&units=Imperial&appid=be4c79b49fa3a22cac7b890800d537b9';
    console.log(weather);
    $.ajax({
      dataType: 'jsonp',
      url: weather,
    }).then(function(results) {
      console.log(results);
      let message = ('It is ' + Math.round(results.main.temp) + 'degrees in ' + results.name + 'with ' + results.weather[0].description)
      loadVoices(message);
    })
  }

  if (transcript.includes('search Google for')) {
    const search = transcript.slice(18, transcript.length);
    const googleSearch = function(transcript) {
      return ('' + transcript).replace(/ /g, '+');
    };
    const result = googleSearch(search);
    window.open('https://www.google.com/search?site=&source=hp&q=' + `${result}`, '_blank');
  }

  if (transcript.includes('open') && transcript.includes('portfolio')) {
    window.open('http://www.doremaxime.com', '_blank');
  }
  if (transcript.includes('open') && transcript.includes('LinkedIn')) {
    window.open('https://www.linkedin.com/in/doremaxime/?locale=en_US', '_blank');
  }
  if (transcript.includes('open') && transcript.includes('GitHub')) {
    window.open('https://github.com/doremaxime', '_blank');
  }

  if (transcript.includes('take') && transcript.includes('picture')) {
    video.takePhoto();
  }

  if (transcript.includes('send') && transcript.includes('email')) {
    // future feature will allow to add contacts
    // let email = contacts[lastWord(transcript)]
    window.location.href = 'mailto:?subject=&body=Sent from Maxime Dore\'s website: https://doremaxime.github.io/thor/';
  }
  if (transcript.includes('have Max join my team')) {
    let email = contacts.Max;
    window.location.href = 'mailto:' + `${email}` + '?subject=Congratulations!&body=We would love to have you on our team!';
  }

  if (transcript.includes('where am I') || (transcript.includes('hide') && transcript.includes('map'))) {
    let container = document.querySelector('.flip-container');
    container.classList.toggle('hover');
  }

  if (transcript.includes('calibrate')) {
    video.calibrate();
    $('.minion').fadeIn();
    $('.minion').css('visibility', 'visible');
    setTimeout(minionFadeOut(), 3000);

    function minionFadeOut() {
      $('.minion').fadeOut(2500);
    }
  }

}

function time() {
  let date = new Date();
  let hours = date.getHours();
  if (hours > 12) {
    hours -= 12
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0 ' + minutes;
  }
  let time = ('It is ' + hours + ' ' + minutes)
  loadVoices(time)
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let latlon = new google.maps.LatLng(lat, lon)
  let mapholder = document.querySelector('.mapholder')
  // mapholder.style.height = '750px';
  // mapholder.style.width = '1000px';

  let myOptions = {
    center: latlon,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    }
  }

  let map = new google.maps.Map(document.querySelector('.mapholder'), myOptions);
  let marker = new google.maps.Marker({
    position: latlon,
    map: map,
    title: 'You are here!'
  });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      alert('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      alert('The request to get user location timed out.');
      break;
    case error.UNKNOWN_ERROR:
      alert('An unknown error occurred.');
      break;
  }
}

recognition.addEventListener('result', speak);
recognition.addEventListener('end', recognition.start);
recognition.start();
getLocation();

module.exports = {
  loadVoices,
  speak,
  time
}
