const words = [
  { left: 'very noisy', right: 'deafening' },
  { left: 'very often', right: 'frequently' },
  { left: 'very old', right: 'ancient' },
  { left: 'very painful', right: 'excruciating' },
  { left: 'very perfect', right: 'flawless' },
  { left: 'very poor', right: 'destitute' },
  { left: 'very powerful', right: 'compelling' },
  { left: 'very quick', right: 'rapid' },
  { left: 'very rainy', right: 'pouring' },
  { left: 'very rich', right: 'wealthy' },
  { left: 'very sad', right: 'sorrowful' },
  { left: 'very scared', right: 'petrified' },
  { left: 'very serious', right: 'grave' },
  { left: 'very sharp', right: 'keen' },
  { left: 'very shiny', right: 'gleaming' },
  { left: 'very short', right: 'brief' },
  { left: 'very shy', right: 'timid' },
  { left: 'very simple', right: 'basic' },
  { left: 'very slow', right: 'sluggish' },
  { left: 'very clear', right: 'obvious' },
  { left: 'very clean', right: 'spotless' },
  { left: 'very angry', right: 'furious' },
  { left: 'very funny', right: 'hilarious' },
  { left: 'very easy', right: 'effortless' },
  { left: 'very big', right: 'massive' }
];

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function showWord() {
  // sadece options ve question kısmını temizle
  const questionBox = document.getElementById("question-box");
  const optionsDiv = document.getElementById("options");
  const feedback = document.getElementById("feedback");

  questionBox.innerHTML = ""; 
  optionsDiv.innerHTML = ""; 
  feedback.textContent = "";
  feedback.className = "";

  // rastgele kelime seç
  const randomWord = getRandomWord();

  // kelimeyi göster
  questionBox.textContent = randomWord.left;
  const correctAnswer = randomWord.right;

  // seçenekler
  let options = [correctAnswer];
  while (options.length < 4) {
    const wrong = words[Math.floor(Math.random() * words.length)].right;
    if (!options.includes(wrong)) {
      options.push(wrong);
    }
  }

  // seçenekleri karıştır
  options = options.sort(() => Math.random() - 0.5);

  // butonları oluştur
  options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.onclick = () => checkAnswer(option, correctAnswer);
    optionsDiv.appendChild(button);
  });
}

function checkAnswer(selected, correct) {
  const feedback = document.getElementById("feedback");
  if (selected === correct) {
    feedback.textContent = "✅ Doğru!";
    feedback.className = "correct";
  } else {
    feedback.textContent = `❌ Yanlış! Doğru cevap: ${correct}`;
    feedback.className = "wrong";
  }

  // Önce eski "Next" butonunu kaldır
  const quizDiv = document.getElementById('word-container');
  const oldNextBtn = Array.from(quizDiv.children).find(
    el => el.tagName === "BUTTON" && el.textContent === "Next"
  );
  if (oldNextBtn) {
    quizDiv.removeChild(oldNextBtn);
  }

  // Yeni "Next" butonunu oluştur
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.classList.add("option");
  nextBtn.style.background = "#61f761ff"; // yeşil
  nextBtn.onclick = showWord;
  quizDiv.appendChild(nextBtn);
}

// ilk soruyu başlat
document.addEventListener("DOMContentLoaded", () => {
    showWord();
});
