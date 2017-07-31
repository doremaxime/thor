const video = require('./video');

//VOICE
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const voices = window.speechSynthesis.getVoices()
const msg = new SpeechSynthesisUtterance();

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
  console.log(transcript);

  if (transcript.includes('hey Thor')) {
    msg.text = ('How may I help you?');
    speechSynthesis.speak(msg);
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
      console.log('results');
      msg.text = ('It is ' + Math.round(results.main.temp) + 'degrees in ' + results.name)
      speechSynthesis.speak(msg);
    })
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

  if (transcript.includes('email') && transcript.includes('to')) {
    let email = contacts[lastWord(transcript)]
    window.open('mailto:' + `${email}` + '?subject=Outcomes Project&body=Sent by iMax');
  }
}

recognition.addEventListener('result', speak);
recognition.addEventListener('end', recognition.start);
recognition.start();

module.exports = {
  speak
}
