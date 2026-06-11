let questions = [];
let userAnswers = [];

const screens = {
  apikey:  document.getElementById("screen-apikey"),
  loading: document.getElementById("screen-loading"),
  quiz:    document.getElementById("screen-quiz"),
  result:  document.getElementById("screen-result"),
  error:   document.getElementById("screen-error"),
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ── 초기 실행 ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Workers URL이 설정돼 있으면 바로 문제 생성
  if (WORKER_URL) {
    loadQuestions();
    return;
  }

  // 저장된 키가 있으면 안내 표시
  const stored = getApiKey();
  if (stored) {
    document.getElementById("apikey-stored").style.display = "block";
  }
  showScreen("apikey");
});

// ── API 키 화면 ───────────────────────────────────────
function showApiKeyScreen() {
  const stored = getApiKey();
  document.getElementById("apikey-stored").style.display = stored ? "block" : "none";
  document.getElementById("apikey-input").value = "";
  showScreen("apikey");
}

function startWithKey() {
  const input = document.getElementById("apikey-input").value.trim();
  if (!input) {
    alert("API 키를 입력해주세요.");
    return;
  }
  saveApiKey(input);
  loadQuestions();
}

function useStoredKey() {
  loadQuestions();
}

function clearStoredKey() {
  removeApiKey();
  document.getElementById("apikey-input").value = "";
  document.getElementById("apikey-stored").style.display = "none";
}

// ── 문제 생성 ──────────────────────────────────────────
async function loadQuestions() {
  showScreen("loading");
  try {
    const topicList = buildQuestionPrompt();
    const raw = await generateQuestions(topicList);
    questions = raw;
    userAnswers = new Array(questions.length).fill(null);
    renderQuiz();
    showScreen("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (e) {
    console.error(e);
    document.getElementById("error-msg").textContent = e.message;
    showScreen("error");
  }
}

// ── 퀴즈 렌더링 ───────────────────────────────────────
function renderQuiz() {
  const container = document.getElementById("quiz-list");
  container.innerHTML = "";

  questions.forEach((q, qi) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `q-${qi}`;

    const badge = `<span class="subject-badge">${q.subject}</span>`;
    const header = `<p class="question-num">${badge} 문제 ${qi + 1}</p>`;
    const body = `<p class="question-text">${q.question}</p>`;

    const options = q.options.map((opt, oi) => `
      <label class="option-label" id="opt-${qi}-${oi}">
        <input type="radio" name="q${qi}" value="${oi}" onchange="selectAnswer(${qi}, ${oi})">
        <span class="option-text">${opt}</span>
      </label>
    `).join("");

    card.innerHTML = header + body + `<div class="options-group">${options}</div>`;
    container.appendChild(card);
  });

  updateProgress();
}

// ── 답 선택 ───────────────────────────────────────────
function selectAnswer(qi, oi) {
  userAnswers[qi] = oi;
  updateProgress();

  const card = document.getElementById(`q-${qi}`);
  card.querySelectorAll(".option-label").forEach(l => l.classList.remove("selected"));
  card.querySelector(`#opt-${qi}-${oi}`).classList.add("selected");
}

function updateProgress() {
  const answered = userAnswers.filter(a => a !== null).length;
  const total = questions.length;
  document.getElementById("progress-text").textContent = `${answered} / ${total} 문제 답변됨`;
  document.getElementById("progress-bar").style.width = `${(answered / total) * 100}%`;

  const btn = document.getElementById("submit-btn");
  btn.disabled = answered < total;
  btn.textContent = answered < total
    ? `채점하기 (${total - answered}문제 남음)`
    : "채점하기";
}

// ── 채점 ─────────────────────────────────────────────
function submitQuiz() {
  const unanswered = userAnswers.filter(a => a === null).length;
  if (unanswered > 0) {
    alert(`아직 ${unanswered}문제를 풀지 않았습니다.`);
    return;
  }

  const score = questions.reduce((acc, q, i) =>
    acc + (userAnswers[i] === q.answer ? 1 : 0), 0
  );

  renderResult(score);
  showScreen("result");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── 결과 렌더링 ───────────────────────────────────────
function renderResult(score) {
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  const subjectScores = {};
  questions.forEach((q, i) => {
    if (!subjectScores[q.subject]) subjectScores[q.subject] = { correct: 0, total: 0 };
    subjectScores[q.subject].total++;
    if (userAnswers[i] === q.answer) subjectScores[q.subject].correct++;
  });

  document.getElementById("score-display").textContent = `${score} / ${total}`;
  document.getElementById("score-pct").textContent = `${pct}점`;
  document.getElementById("score-comment").textContent = getComment(pct);

  const subjectHtml = Object.entries(subjectScores).map(([name, s]) => {
    const spct = Math.round((s.correct / s.total) * 100);
    return `
      <div class="subject-result">
        <div class="subject-result-top">
          <span class="subject-name">${name}</span>
          <span class="subject-score">${s.correct}/${s.total} (${spct}%)</span>
        </div>
        <div class="subject-bar-wrap">
          <div class="subject-bar" style="width:${spct}%"></div>
        </div>
      </div>`;
  }).join("");
  document.getElementById("subject-scores").innerHTML = subjectHtml;

  const reviewHtml = questions.map((q, i) => {
    const isCorrect = userAnswers[i] === q.answer;
    return `
      <div class="review-card ${isCorrect ? "correct" : "wrong"}">
        <div class="review-header">
          <span class="review-num">${i + 1}</span>
          <span class="review-status">${isCorrect ? "✓ 정답" : "✗ 오답"}</span>
          <span class="subject-badge">${q.subject}</span>
        </div>
        <p class="review-question">${q.question}</p>
        <ul class="review-options">
          ${q.options.map((opt, oi) => {
            let cls = "";
            if (oi === q.answer) cls = "answer-opt";
            if (oi === userAnswers[i] && !isCorrect) cls = "wrong-opt";
            return `<li class="${cls}">${opt}${oi === q.answer ? " ✓" : ""}${oi === userAnswers[i] && !isCorrect ? " ✗" : ""}</li>`;
          }).join("")}
        </ul>
        <div class="explanation">
          <span class="exp-label">해설</span>
          <p>${q.explanation}</p>
        </div>
      </div>`;
  }).join("");
  document.getElementById("review-list").innerHTML = reviewHtml;
}

function getComment(pct) {
  if (pct >= 90) return "완벽합니다! 🎉 합격권이에요.";
  if (pct >= 80) return "훌륭해요! 조금만 더 다듬으면 됩니다.";
  if (pct >= 70) return "합격 기준인 60점은 넘었어요. 꾸준히 복습하세요!";
  if (pct >= 60) return "아슬아슬하네요. 취약한 과목을 집중 공략해 보세요.";
  return "아직 갈 길이 있어요. 포기하지 말고 다시 도전!";
}

// ── 다시 풀기 ─────────────────────────────────────────
function retryQuiz() {
  questions = [];
  userAnswers = [];
  loadQuestions();
}