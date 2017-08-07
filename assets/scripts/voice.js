const video = require('./video');

//VOICE
let errorMsg = document.getElementById('msg');
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
  Michael: 'mrfinneran@gmail.com',
}

const lastWord = function(transcript) {
  return ("" + transcript).replace(/[\s-]+$/, '').split(/[\s-]/).pop();
};

function speak(e) {
  let transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
  console.log('transcript is: ' + transcript);

  if (transcript.includes('hey Skynet')) {

    // developing this function to be able to change the voices female-male
    // if (transcript.includes('male voice')) {
    //   let message = ('I now have a male voice');
    //   let voice = voices[50];
    //   loadVoices(message, voice);
    // }

    if (transcript.includes('what') && transcript.includes('time')) {
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
        dataType: "jsonp",
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
    if (transcript.includes('close') && transcript.includes('portfolio')) {
      window.close('http://www.doremaxime.com', '_blank');
    }

    if (transcript.includes('take') && transcript.includes('picture')) {
      video.takePhoto();
    }
    if (transcript.includes('delete') && transcript.includes('all') && transcript.includes('pictures')) {
      document.querySelector('.strip').remove();
    }
    if (transcript.includes('delete') && transcript.includes('last') && transcript.includes('picture')) {
      document.querySelector('.strip').lastChild.remove();
    }

    if (transcript.includes('send') && transcript.includes('email') && transcript.includes('to')) {
      let email = contacts[lastWord(transcript)]
      window.location.href = 'mailto:' + `${email}` + '?subject=Outcomes Project&body=Sent from my iMax';
    }
  }
}

recognition.addEventListener('result', speak);
recognition.addEventListener('end', recognition.start);
recognition.start();

module.exports = {
  loadVoices,
  speak
}
