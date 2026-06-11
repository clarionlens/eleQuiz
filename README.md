# 이러닝운영관리사 필기 대비

AI가 출제기준 기반으로 매일 새로운 문제를 생성해주는 이러닝운영관리사 필기 학습 웹앱입니다.

## 주요 기능

- 출제기준(2026~2028)에 맞춘 20문제 자동 생성
- 3개 과목 비율에 맞게 출제 (이러닝운영계획수립 8문항 / 이러닝 활동 지원 8문항 / 이러닝 운영 관리 4문항)
- 긍정형 / 부정형 / 설명형 / 빈칸형 등 다양한 문제 유형
- 채점 후 과목별 결과 및 문제별 해설 제공
- 반응형 웹 (PC / 모바일 지원)

## 기술 스택

- Frontend: HTML / CSS / JavaScript
- AI: Google Gemini API
- Hosting: GitHub Pages
- API Proxy: Cloudflare Workers

## 로컬 실행

```bash
# Node.js가 설치돼 있다면
npx serve .

# 또는 VS Code Live Server 확장 사용
```

## 배포 구조

```
사용자 브라우저
      ↓
GitHub Pages (정적 파일)
      ↓
Cloudflare Workers (API 키 보호)
      ↓
Gemini API
```

## 라이선스

MIT