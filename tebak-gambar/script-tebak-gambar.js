const pictures = [
    { image: 'images/apple.jpg', answer: 'apple' },
    { image: 'images/cat.jpg', answer: 'cat' },
    { image: 'images/banana.jpg', answer: 'banana' },
    { image: 'images/dog.jpg', answer: 'dog' }
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
  
    if (userAnswer === correctAnswer) {
      document.getElementById('result').textContent = 'Correct!';
      speak('Correct!');
  
      currentLevel++;
      if (currentLevel < pictures.length) {
        setTimeout(loadLevel, 1000);
      } else {
        document.querySelector('.game-box').classList.add('hidden');
        document.getElementById('game-complete').classList.remove('hidden');
      }
    } else {
      document.getElementById('result').textContent = 'Try again!';
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