// NAV TRANSPARÊNCIA
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");

  if (window.scrollY > 50) {
    nav.style.background = "rgba(0,0,0,0.95)";
  } else {
    nav.style.background = "rgba(0,0,0,0.8)";
  }
});

// SCROLL SUAVE
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    if (link.hash) {
      e.preventDefault();
      document.querySelector(link.hash).scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// EXPAND TIMELINE ITEMS
document.addEventListener('DOMContentLoaded', () => {
  const expandBtns = document.querySelectorAll('.expand-btn');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const extra = btn.nextElementSibling;
      if (extra.style.display === 'none' || extra.style.display === '') {
        extra.style.display = 'block';
        btn.textContent = 'Ocultar';
      } else {
        extra.style.display = 'none';
        btn.textContent = 'Saiba Mais';
      }
    });
  });

  // ANIMATE TIMELINE ON SCROLL
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
  });
});

// QUIZ
const quizData = [
  {
    question: "Quem conquistou os Sete Reinos?",
    options: ["Aegon Targaryen", "Robert Baratheon", "Eddard Stark", "Daenerys Targaryen"],
    answer: 0,
    explanation: "Aegon Targaryen, conhecido como Aegon, o Conquistador, unificou os Sete Reinos com a ajuda de seus dragões e irmãs Visenya e Rhaenys."
  },
  {
    question: "Qual é o lema da Casa Stark?",
    options: ["Fogo e Sangue", "O Norte se lembra", "Sempre pagam suas dívidas", "Nossa é a fúria"],
    answer: 1,
    explanation: "O lema da Casa Stark é 'Winter is Coming', que em português significa 'O Inverno Está Chegando', mas também é conhecido por 'O Norte se lembra'."
  },
  {
    question: "O que é a Dança dos Dragões?",
    options: ["Uma dança tradicional", "Uma guerra civil Targaryen", "Um torneio", "Uma festa"],
    answer: 1,
    explanation: "A Dança dos Dragões foi uma guerra civil na Casa Targaryen entre Aegon II e Rhaenyra Targaryen pelo Trono de Ferro."
  },
  {
    question: "Quem é o pai de Jon Snow?",
    options: ["Eddard Stark", "Rhaegar Targaryen", "Robert Baratheon", "Jaime Lannister"],
    answer: 1,
    explanation: "Jon Snow é filho de Lyanna Stark e Rhaegar Targaryen, tornando-o herdeiro legítimo do Trono de Ferro."
  },
  {
    question: "Qual dragão Daenerys Targaryen possui?",
    options: ["Balerion", "Vhagar", "Drogon, Rhaegal e Viserion", "Meraxes"],
    answer: 2,
    explanation: "Daenerys choca três ovos de dragão e nasce Drogon (preto), Rhaegal (verde) e Viserion (branco)."
  },
  {
    question: "Qual é a arma mais letal de Arya Stark?",
    options: ["Agulha", "Valyria", "Lâmina de Vidro de Dragão", "Gelo"],
    answer: 0,
    explanation: "Arya Stark usa 'Agulha', uma espada fina e leve que ela recebeu de Jon Snow."
  },
  {
    question: "Quem matou o Rei Joffrey Baratheon?",
    options: ["Tyrion Lannister", "Olenna Tyrell", "Sansa Stark", "Littlefinger"],
    answer: 1,
    explanation: "Olenna Tyrell, a Rainha dos Espinhos, confessou ter envenenado Joffrey com um veneno fornecido por Littlefinger."
  },
  {
    question: "Qual é o nome do lobo gigante de Bran Stark?",
    options: ["Fantasma", "Verão", "Nymeria", "Lady"],
    answer: 1,
    explanation: "O lobo gigante de Bran é Verão, que o acompanha em suas jornadas."
  },
  {
    question: "Quem é conhecido como 'O Matador de Reis'?",
    options: ["Jaime Lannister", "Barristan Selmy", "Gregor Clegane", "Sandor Clegane"],
    answer: 0,
    explanation: "Jaime Lannister ganhou esse título por matar o Rei Louco, Aerys II Targaryen."
  },
  {
    question: "Qual casa tem o lema 'Nós Não Semeadmos'?",
    options: ["Greyjoy", "Martell", "Tyrell", "Arryn"],
    answer: 0,
    explanation: "A Casa Greyjoy de Pyke tem o lema 'We Do Not Sow', significando que eles não semeiam, mas colhem do mar."
  }
];

let currentQuestion = 0;
let score = 0;

document.getElementById('start-quiz').addEventListener('click', startQuiz);

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const container = document.getElementById('quiz-container');
  if (currentQuestion < quizData.length) {
    const q = quizData[currentQuestion];
    container.innerHTML = `
      <p><strong>Pergunta ${currentQuestion + 1} de ${quizData.length}:</strong> ${q.question}</p>
      ${q.options.map((opt, i) => `<button class="option" data-index="${i}">${opt}</button>`).join('')}
      <div id="explanation" style="display: none; margin-top: 20px; padding: 10px; background: #222; border-radius: 5px;"></div>
    `;
    document.querySelectorAll('.option').forEach(btn => {
      btn.addEventListener('click', selectOption);
    });
  } else {
    let message = '';
    if (score >= 8) message = 'Incrível! Você é um verdadeiro fã de Game of Thrones!';
    else if (score >= 6) message = 'Muito bom! Você conhece bem a série.';
    else if (score >= 4) message = 'Bom trabalho! Mas ainda há muito para aprender.';
    else message = 'Precisa assistir mais! Game of Thrones tem muitas reviravoltas.';
    container.innerHTML = `<p>Quiz terminado! Pontuação: ${score}/${quizData.length}</p><p>${message}</p><button id="restart-quiz">Reiniciar Quiz</button>`;
    document.getElementById('restart-quiz').addEventListener('click', startQuiz);
  }
}

function selectOption(e) {
  const selected = parseInt(e.target.dataset.index);
  const q = quizData[currentQuestion];
  const explanationDiv = document.getElementById('explanation');
  explanationDiv.style.display = 'block';
  if (selected === q.answer) {
    score++;
    explanationDiv.innerHTML = `<p style="color: #0f0;">Correto!</p><p>${q.explanation}</p>`;
  } else {
    explanationDiv.innerHTML = `<p style="color: #f00;">Errado! A resposta correta é: ${q.options[q.answer]}</p><p>${q.explanation}</p>`;
  }
  // Disable buttons
  document.querySelectorAll('.option').forEach(btn => btn.disabled = true);
  // Add next button
  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 3000); // Show explanation for 3 seconds
}