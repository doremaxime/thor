//VOICE
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const voices = window.speechSynthesis.getVoices()
const msg = new SpeechSynthesisUtterance();

function speak(e) {
  let transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    console.log(transcript);

  if(transcript.includes('test')) {
    msg.text = ('echo');
    speechSynthesis.speak(msg);
  }

}

recognition.addEventListener('result', speak);
recognition.addEventListener('end', recognition.start);
recognition.start();

module.exports = {
  speak
}
