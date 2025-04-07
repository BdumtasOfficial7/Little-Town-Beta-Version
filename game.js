// First Game - Game Pertama
const wordList = {
    1: ["i am", "you are", "we are", "they are", "he is", "she is", "it is"],
    2: ["abate", "brother", "clever", "design", "earth", "father", "grass", "home", "insect", "juice", "knife", "love", "mother", "news", "once", "person", "quick", "run", "sister", "teacher", "understand", "village", "white", "xylophone", "yawn", "zone"],
    3: ["i am a student", "he is in the village", "they are clever", "he is my brother", "she is my sister", "my mother is pretty", "my father is handsome", "i love you", "you love me", "she loves me", "teacher is a person", "you are singers","they are busy", "we are teachers", "i am a farmer"],
    4: ["how are you?", "good morning", "good evening", "good night", "good afternoon", "i am fine", "thank you", "i am sorry", "by the way","who are you?", "my name is", "good day", "bye bye", "thank you", "you are welcom", "it is okay"]
};

let currentWord = "";
let score = 0;
let level = 1;
let correctAnswers = 0;

function playWord() {
    const words = wordList[level] || wordList[4]; // default ke level 4 jika lewat
    currentWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById("wordDisplay").innerText = `Say: ${currentWord}`;

    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
}

function startRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        const spokenWord = event.results[0][0].transcript.toLowerCase();
        const similarity = calculateSimilarity(spokenWord, currentWord);
        const resultText = document.getElementById("result");

        if (similarity >= 0.8) {
            resultText.innerText = `You said: ${spokenWord} - Correct! (Similarity: ${Math.round(similarity * 100)}%)`;
            speakFeedback("Good job!");
            score += 10;
            correctAnswers++;
            if (correctAnswers % 7 === 0) {
                level++;
                speakFeedback(`Great! Level ${level}`);
            }
        } else {
            resultText.innerText = `You said: ${spokenWord} - Try again! (Similarity: ${Math.round(similarity * 100)}%)`;
            speakFeedback("Try again!");
        }

        updateUI();

        if (level > 4 ) {
            speakFeedback("Congratulations! You finished the game!");
            alert("Game Over: You finished all levels!");

            document.querySelector("button[onclick='playWord()']").disabled = true;
            document.querySelector("button[onclick='startRecognition()']").disabled = true;
        }
    };

    recognition.onerror = function(event) {
        alert("Speech recognition error: " + event.error);
    };

}

function updateUI() {
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
}

function speakFeedback(message) {
    const feedback = new SpeechSynthesisUtterance(message);
    feedback.lang = "en-US";
    speechSynthesis.speak(feedback);
}

// Levenshtein Distance untuk mengecek kemiripan
function calculateSimilarity(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, () =>
        Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    const distance = matrix[a.length][b.length];
    const maxLength = Math.max(a.length, b.length);
    return (maxLength - distance) / maxLength;
}




// The last game - game terakhir - Communication
const questionDiv = document.getElementById("question");
const responseDiv = document.getElementById("response");
const scoreDisplay = document.getElementById("score-game-terakhir");
const levelDisplay = document.getElementById("level-game-terakhir");
const startButton = document.getElementById("start-button");

let scoreGameTerakhir = 0;
let currentLevel = 0;
let currentQuestionIndex = 0;

const levels = [
  {
    questions: [
      {
        ask: "Now, we are going to practice our English Lesson. Are you ready?",
        expectedKeywords: ["yes i am", "yeah", "ready", "of course", "yes"],
        reply: () => "Okay, let's practice!"
      },
      {
        ask: "Hi! What's your name?",
        expectedKeywords: ["my name is", "i am"],
        reply: (text) => {
          const name = text.split(" ").slice(-1)[0];
          return `Nice to meet you, ${name}!`;
        }
      },
      {
        ask: "How old are you?",
        expectedKeywords: ["i am", "i'm", "years old", "old"],
        reply: (text) => {
          const age = text.match(/\d+/);
          return age ? `Wow, ${age[0]} years old! That’s awesome!` : "Great!";
        }
      },
      {
        ask: "What color do you like?",
        expectedKeywords: ["i like", "favorite color"],
        reply: () => "I love that color too!"
      }
    ]
  },
  {
    questions: [
      {
        ask: "Do you like animals?",
        expectedKeywords: ["yes", "i do", "i like", "no", "no i don't"],
        reply: () => "Animals are so cute!"
      },
      {
        ask: "What food do you like?",
        expectedKeywords: ["i like", "my favorite"],
        reply: () => "Yummy! I like it too!"
      },
      {
        ask: "Can you sing a song?",
        expectedKeywords: ["yes", "i can", "no", "no i can't"],
        reply: () => "Try to sing!"
      }
    ]
  }
];

// Text to Speech
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

// Mulai pertanyaan
function askQuestion() {
  const currentQA = levels[currentLevel].questions[currentQuestionIndex];
  questionDiv.innerText = currentQA.ask;
  speak(currentQA.ask);
}

// Lanjut ke pertanyaan berikutnya
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < levels[currentLevel].questions.length) {
    askQuestion();
  } else {
    currentLevel++;
    if (currentLevel < levels.length) {
      currentQuestionIndex = 0;
      levelDisplay.innerText = "Level: " + (currentLevel + 1);
      speak("Great! Let's go to the next level!");
      setTimeout(askQuestion, 3000);
    } else {
      questionDiv.innerText = "You finished all levels!";
      speak("You finished all levels! You're amazing!");
      startButton.style.display = "none";
    }
  }
}

// Feedback suara
function giveFeedback(transcript, currentQA) {
  const cleaned = transcript.toLowerCase();
  const match = currentQA.expectedKeywords.some(keyword => cleaned.includes(keyword));

  if (match) {
    const replyText = currentQA.reply(transcript);
    speak(replyText);
    responseDiv.innerText += " | Avatar: " + replyText;
    return true;
  } else {
    const feedback = "Hmm, can you say that again?";
    speak(feedback);
    responseDiv.innerText += " | Feedback: " + feedback;
    return false;
  }
}

// Deteksi suara
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  responseDiv.innerText = "You said: " + transcript;

  const currentQA = levels[currentLevel].questions[currentQuestionIndex];
  const success = giveFeedback(transcript, currentQA);

  if (success) {
    scoreGameTerakhir += 10;
    scoreDisplay.innerText = "Score: " + scoreGameTerakhir;
    setTimeout(() => {
      nextQuestion();
    }, 2500);
  }
};

recognition.onerror = function (event) {
  responseDiv.innerText = "Error: " + event.error;
};

// Tombol mulai
startButton.addEventListener("click", () => {
  recognition.start();
});

// Mulai saat page dibuka
window.onload = () => {
  levelDisplay.innerText = "Level: 1";
  scoreDisplay.innerText = "Score: 0";
  askQuestion();
};