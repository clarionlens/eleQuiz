/**
 * gemini.js
 *
 * WORKER_URL이 설정돼 있으면 → Cloudflare Workers 경유 (배포용)
 * API 키가 직접 입력돼 있으면 → Gemini API 직접 호출 (테스트용)
 */

// 배포 시 본인 Workers URL로 교체. 테스트 중에는 비워두세요.
const WORKER_URL = "";

const GEMINI_DIRECT_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

// 재시도 설정
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 4000;

async function generateQuestions(topicList) {
  const topicDescriptions = topicList.map((t, i) =>
    `${i + 1}. [${t.subject}] ${t.major}>${t.sub}>${t.detail}`
  ).join("\n");

  const prompt = `이러닝운영관리사 국가기술자격 필기시험 문제를 출제한다. JSON 배열만 출력하고 다른 텍스트는 절대 쓰지 마라.

출제항목(항목당 1문제):
${topicDescriptions}

문제 유형을 아래 4가지 중 적절히 섞어서 출제하라:
A) 긍정형: "다음 중 ~에 해당하는 것은?" / "~의 특징으로 옳은 것은?"
B) 부정형: "~에 대한 설명으로 옳지 않은 것은?" / "다음 중 ~에 해당하지 않는 것은?"
C) 설명형: 보기에 "개념명: 설명" 형식으로 제시하고 맞는 것 또는 틀린 것 고르기
D) 빈칸형: "다음 ( )에 들어갈 용어로 옳은 것은?"

보기 작성 규칙:
- 보기는 비슷한 길이와 형식으로 작성해 정답이 티 나지 않게 하라
- 오답도 그럴듯하게 만들어 변별력을 높여라

출력형식(JSON 배열만, 다른 텍스트 없이):
[{"subject":"과목명","question":"문제","options":["① 보기1","② 보기2","③ 보기3","④ 보기4"],"answer":0,"explanation":"해설"}]
answer는 정답 인덱스(0~3).`;

  if (WORKER_URL) {
    return await withRetry(() => callViaWorker(prompt));
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API 키가 없습니다. 키를 입력해주세요.");
  }
  return await withRetry(() => callDirectly(prompt, apiKey));
}

// ── 재시도 래퍼 ───────────────────────────────────────
async function withRetry(fn) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      const isRetryable =
        e.message.includes("500") ||
        e.message.includes("503") ||
        e.message.includes("high demand") ||
        e.message.includes("internal error") ||
        e.message.includes("Internal");

      if (isRetryable && attempt < MAX_RETRIES) {
        console.warn(`시도 ${attempt} 실패, ${RETRY_DELAY_MS / 1000}초 후 재시도...`, e.message);
        updateLoadingMsg(attempt);
        await sleep(RETRY_DELAY_MS);
      } else {
        break;
      }
    }
  }
  throw lastError;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function updateLoadingMsg(attempt) {
  const el = document.querySelector(".loading-desc");
  if (el) {
    el.textContent = `서버가 혼잡해서 재시도 중이에요... (${attempt}/${MAX_RETRIES - 1})`;
  }
}

// ── Worker 경유 호출 ──────────────────────────────────
async function callViaWorker(prompt) {
  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return await response.json();
}

// ── 직접 호출 ─────────────────────────────────────────
async function callDirectly(prompt, apiKey) {
  const response = await fetch(`${GEMINI_DIRECT_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      }
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err?.error?.message || `${response.status}`;
    throw new Error(`Gemini API 오류: ${msg}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  const cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error("응답 파싱 실패. 다시 시도해주세요.");
  }
}

// ── API 키 관리 ───────────────────────────────────────
function getApiKey() {
  return localStorage.getItem("gemini_api_key") || "";
}

function saveApiKey(key) {
  localStorage.setItem("gemini_api_key", key);
}

function removeApiKey() {
  localStorage.removeItem("gemini_api_key");
}