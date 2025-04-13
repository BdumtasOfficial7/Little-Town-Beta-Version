const pictures = [
  { image: 'img-tebak-gambar/level-gambar/apple.png', answer: 'apple' },
  { image: 'img-tebak-gambar/level-gambar/cat.png', answer: 'cat' },
  { image: 'img-tebak-gambar/level-gambar/banana.png', answer: 'banana' },
  { image: 'img-tebak-gambar/level-gambar/dog.png', answer: 'dog' },
  { image: 'img-tebak-gambar/level-gambar/garden.png', answer: 'garden' },
  { image: 'img-tebak-gambar/level-gambar/flower.png', answer: 'flower' },
  { image: 'img-tebak-gambar/level-gambar/fruits.png', answer: 'fruit' },
  { image: 'img-tebak-gambar/level-gambar/tree.png', answer: 'tree' },
  { image: 'img-tebak-gambar/level-gambar/soil.png', answer: 'soil' },
  { image: 'img-tebak-gambar/level-gambar/water.png', answer: 'water' },
  { image: 'img-tebak-gambar/level-gambar/sun.png', answer: 'sun' },
  { image: 'img-tebak-gambar/level-gambar/root.png', answer: 'root' },
  { image: 'img-tebak-gambar/level-gambar/seed.png', answer: 'seed' },
  { image: 'img-tebak-gambar/level-gambar/rain.png', answer: 'rain' },
  { image: 'img-tebak-gambar/level-gambar/farmer.png', answer: 'farmer' },
  { image: 'img-tebak-gambar/level-gambar/snake.png', answer: 'snake' },
  { image: 'img-tebak-gambar/level-gambar/garlic.png', answer: 'garlic' },
  { image: 'img-tebak-gambar/level-gambar/leaf.png', answer: 'leaf' },
  { image: 'img-tebak-gambar/level-gambar/branch.png', answer: 'branch' },
  { image: 'img-tebak-gambar/level-gambar/eggplant.png', answer: 'eggplant' },
  { image: 'img-tebak-gambar/level-gambar/shovel.png', answer: 'shovel' },
  { image: 'img-tebak-gambar/level-gambar/rake.png', answer: 'rake' },
  { image: 'img-tebak-gambar/level-gambar/wheelbarrow.png', answer: 'wheelbarrow' },
  { image: 'img-tebak-gambar/level-gambar/insect.png', answer: 'insect' },
  { image: 'img-tebak-gambar/level-gambar/fertilizer.png', answer: 'fertilizer' },
  { image: 'img-tebak-gambar/level-gambar/butterfly.png', answer: 'butterfly' },
  { image: 'img-tebak-gambar/level-gambar/worm.png', answer: 'worm' },
  { image: 'img-tebak-gambar/level-gambar/bee.png', answer: 'bee' },
  { image: 'img-tebak-gambar/level-gambar/harvest.png', answer: 'harvest' },
  { image: 'img-tebak-gambar/level-gambar/hoe.png', answer: 'hoe' },
  { image: 'img-tebak-gambar/level-gambar/basket.png', answer: 'basket' },
  { image: 'img-tebak-gambar/level-gambar/fence.png', answer: 'fence' },
  { image: 'img-tebak-gambar/level-gambar/bud.png', answer: 'bud' },
  { image: 'img-tebak-gambar/level-gambar/pot.png', answer: 'pot' },
  { image: 'img-tebak-gambar/level-gambar/pruning.png', answer: 'prune' },
  { image: 'img-tebak-gambar/level-gambar/dig.png', answer: 'dig' },
  { image: 'img-tebak-gambar/level-gambar/pick.png', answer: 'pick' },
  { image: 'img-tebak-gambar/level-gambar/plow.png', answer: 'plow' },
  { image: 'img-tebak-gambar/level-gambar/scarecrow.png', answer: 'scarecrow' },
  { image: 'img-tebak-gambar/level-gambar/vine.png', answer: 'vine' },
  { image: 'img-tebak-gambar/level-gambar/sickle.png', answer: 'sickle' },
  { image: 'img-tebak-gambar/level-gambar/tomato.png', answer: 'tomato' },
  { image: 'img-tebak-gambar/level-gambar/chili.png', answer: 'chili' },
  { image: 'img-tebak-gambar/level-gambar/carrot.png', answer: 'carrot' },
  { image: 'img-tebak-gambar/level-gambar/corn.png', answer: 'corn' },
  { image: 'img-tebak-gambar/level-gambar/pumpkin.png', answer: 'pumpkin' },
  { image: 'img-tebak-gambar/level-gambar/cucumber.png', answer: 'cucumber' },
  { image: 'img-tebak-gambar/level-gambar/onion.png', answer: 'onion' },
  { image: 'img-tebak-gambar/level-gambar/potato.png', answer: 'potato' },
  { image: 'img-tebak-gambar/level-gambar/hat.png', answer: 'hat' }
];

let currentLevel = 0;

function loadLevel() {
  const level = pictures[currentLevel];
  document.getElementById('picture').src = level.image;
  document.getElementById('answer').value = '';
  document.getElementById('result').textContent = '';
  document.getElementById('level-number').textContent = currentLevel + 1;
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

function checkAnswer() {
  const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
  const correctAnswer = pictures[currentLevel].answer.toLowerCase();
  const resultEl = document.getElementById('result');

  if (userAnswer === correctAnswer) {
    resultEl.innerHTML = `<span style="color: green;">Correct!</span><br>Answer: <strong>${correctAnswer}</strong>`;
    speak('Correct!');

    currentLevel++;
    if (currentLevel < pictures.length) {
      setTimeout(loadLevel, 1500);
    } else {
      setTimeout(() => {
        document.querySelector('.game-box').classList.add('hidden');
        document.getElementById('game-complete').classList.remove('hidden');
      }, 1500);
    }

  } else {
    resultEl.innerHTML = `<span style="color: red;">Try again!</span><br>Correct answer: <strong>${correctAnswer}</strong>`;
    speak('Try again!');
  }
}

function startVoiceRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support speech recognition');
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    document.getElementById('answer').value = transcript;
    checkAnswer();
  };
}

function exitGame() {
  window.location.reload();
}

function restartGame() {
  currentLevel = 0;
  document.getElementById('game-complete').classList.add('hidden');
  document.querySelector('.game-box').classList.remove('hidden');
  loadLevel();
}

window.onload = loadLevel;