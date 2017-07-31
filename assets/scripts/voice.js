//VOICE
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const voices = window.speechSynthesis.getVoices()
const msg = new SpeechSynthesisUtterance();

const lastWord = function(transcript) {
  return (""+transcript).replace(/[\s-]+$/,'').split(/[\s-]/).pop();
};

function speak(e) {
  let transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    console.log(transcript);

  if(transcript.includes('hey Thor')) {
    msg.text = ('How may I help you?');
    speechSynthesis.speak(msg);
  }

  if(transcript.includes('what') && transcript.includes('weather') && transcript.includes('in')) {
    let weather = 'http://api.openweathermap.org/data/2.5/weather?q=' + `${lastWord(transcript)}` + '&units=Imperial&appid=be4c79b49fa3a22cac7b890800d537b9';
    console.log(weather);
    $.ajax({
      dataType: "jsonp",
      url: weather,
    }).then(function (results) {
      console.log('results');
      msg.text = ('It is ' + Math.round(results.main.temp) + 'degrees in ' + results.name)
      speechSynthesis.speak(msg);
    })
  }

}

recognition.addEventListener('result', speak);
recognition.addEventListener('end', recognition.start);
recognition.start();

module.exports = {
  speak
}
