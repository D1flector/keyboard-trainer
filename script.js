const keys = document.querySelectorAll('.key');
const startBtn = document.querySelector('.start-btn');
const inputArea = document.querySelector('#input-area');
const textDisplay = document.querySelector('#text-to-type');

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

startBtn.addEventListener('click', () => {
  inputArea.disabled = false;
  inputArea.focus();
  textDisplay.innerText = getRandomSentence();
});