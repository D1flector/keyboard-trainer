const keys = document.querySelectorAll('.key');
const startBtn = document.querySelector('.start-btn');
const inputArea = document.querySelector('#input-area');
const textDisplay = document.querySelector('#text-to-type');

let startTime;
let currentText = "";

const sentences = [
  "decide south if down mind mark sea me fast half",
  "the quick brown fox jumps over the lazy dog",
  "a journey of a thousand miles begins with a single step",
  "to be or not to be that is the question",
  "all that glitters is not gold",
  "the only thing we have to fear is fear itself",
  "in the end, we will remember not the words of our enemies, but the silence of our friends",
  "life is what happens when you're busy making other plans",
  "what lies behind us and what lies before us are tiny matters compared to what lies within us",
  "success is not final, failure is not fatal: It is the courage to continue that counts",
  "the greatest glory in living lies not in never falling, but in rising every time we fall",
  "to live is the rarest thing in the world. Most people exist, that is all",
  "the future belongs to those who believe in the beauty of their dreams",
  "the best way to predict the future is to create it",
  "do not wait to strike till the iron is hot, but make it hot by striking"
];

let previousSentence = null;

function getRandomSentence() {
  const filteredSentences = sentences.filter(sentence => sentence !== previousSentence);

  const randomIndex = Math.floor(Math.random() * filteredSentences.length);
  const uniqueSentence = filteredSentences[randomIndex];

  previousSentence = uniqueSentence;
  return uniqueSentence;
}

startBtn.addEventListener('click', () => {
  inputArea.disabled = false;
  inputArea.focus();
  inputArea.value = '';
  currentText = getRandomSentence();
  startTime = new Date();
  textDisplay.innerHTML = currentText.split('').map(char => `<span>${char}</span>`).join('');
});

inputArea.addEventListener('keydown', (event) => {
  const pressedKey = event.key.toUpperCase();
  keys.forEach(key => {
    if (key.innerText.toUpperCase() === pressedKey) {
      key.classList.add('active');
    } else {
      key.classList.remove('active');
    }
  });
});

inputArea.addEventListener('input', () => {
  const inputText = inputArea.value;
  const textSpans = textDisplay.querySelectorAll('span');

  textSpans.forEach((span, index) => {
    if (index < inputText.length) {
      if (inputText[index] === span.innerText) {
        span.classList.add('correct');
        span.classList.remove('incorrect');
      } else {
        span.classList.add('incorrect');
        span.classList.remove('correct');
      }
    } else {
      span.classList.remove('correct', 'incorrect');
    }
  });
  
  if (currentText === inputText) {
    inputArea.disabled = true;
    const endTime = new Date();
    const finalTime = ((endTime - startTime) / 1000).toFixed(2);
    inputArea.value = `Ваш результат: ${finalTime} секунд`;
  }
});