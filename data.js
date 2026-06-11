const EXAM_DATA = [
  {
    subject: "이러닝운영계획수립",
    weight: 8,
    topics: [
      {
        major: "이러닝 산업파악",
        sub: "이러닝산업동향 이해",
        details: ["산업 동향", "산업 분류 체계", "산업 용어", "이해관계자 특성", "서비스 특성", "콘텐츠 특성", "시스템 특성", "인프라 특성"]
      },
      {
        major: "이러닝 산업파악",
        sub: "이러닝기술동향 이해",
        details: ["기술 구성요소(콘텐츠, 플랫폼, 네트워크, 디바이스, 서비스)", "최신 기술 동향 및 특성", "기술 용어"]
      },
      {
        major: "이러닝 산업파악",
        sub: "이러닝법제도 이해",
        details: ["법과 제도", "관련 법령", "법과 제도의 주요 이슈"]
      },
      {
        major: "이러닝콘텐츠의 파악",
        sub: "이러닝콘텐츠 개발 절차 이해",
        details: ["분석", "설계", "개발", "운영", "평가"]
      },
      {
        major: "이러닝콘텐츠의 파악",
        sub: "이러닝콘텐츠 개발요소 이해",
        details: ["개발 인력 및 자원", "개발 시설 및 장비", "개발 산출물"]
      },
      {
        major: "이러닝콘텐츠의 파악",
        sub: "이러닝콘텐츠 유형별 개발방법 이해",
        details: ["콘텐츠 유형", "콘텐츠 유형별 개발 특성", "서비스 환경"]
      },
      {
        major: "학습시스템 파악",
        sub: "학습시스템이해",
        details: ["학습시스템 유형 및 특성", "학습시스템 구조", "학습시스템 기반 기술", "이러닝 표준의 이해"]
      },
      {
        major: "학습시스템 파악",
        sub: "학습시스템개발과정이해",
        details: ["정보시스템 구축 운영지침", "학습시스템 기능요소", "학습시스템 요구 분석", "학습시스템 개발 프로세스"]
      },
      {
        major: "학습시스템 파악",
        sub: "학습시스템운영과정이해",
        details: ["학습시스템 기본 기능", "학습시스템 운영 프로세스", "학습시스템 리스크 관리"]
      },
      {
        major: "학습시스템 파악",
        sub: "학습시스템 이해관계자 분석",
        details: ["학습자 특성 분석", "교수자 특성 분석", "참여자 역할 정의", "교수학습 활동 분석", "교수학습 기능 분석"]
      },
      {
        major: "이러닝운영 준비",
        sub: "운영환경 점검",
        details: ["운영서비스 점검", "학습도구 점검", "콘텐츠 점검"]
      },
      {
        major: "이러닝운영 준비",
        sub: "교육과정 등록",
        details: ["교육과정 특성 분석", "과정 등록", "차시 등록", "학습(보조)자원 등록", "평가문항 등록"]
      },
      {
        major: "이러닝운영 준비",
        sub: "학사일정 수립",
        details: ["학사일정 수립 및 공지", "운영절차 준수"]
      },
      {
        major: "이러닝운영 준비",
        sub: "수강신청 관리",
        details: ["수강 승인 관리", "입과 안내", "사용자 정보 등록", "수강변경 사후 관리"]
      }
    ]
  },
  {
    subject: "이러닝 활동 지원",
    weight: 8,
    topics: [
      {
        major: "이러닝운영 지원도구관리",
        sub: "운영지원도구 분석",
        details: ["운영지원도구의 종류와 특성", "운영지원도구 활용 방법"]
      },
      {
        major: "이러닝운영 지원도구관리",
        sub: "운영지원도구 선정",
        details: ["과정 특성별 적용 방법", "적용방법 매뉴얼"]
      },
      {
        major: "이러닝운영 지원도구관리",
        sub: "운영지원도구 관리",
        details: ["사용현황에 따른 문제점", "운영지원도구별 개선점", "운영지원도구 활용보고서"]
      },
      {
        major: "이러닝운영 학습활동지원",
        sub: "학습환경 지원",
        details: ["학습환경(PC, 모바일 등) 확인", "학습환경 문제 상황과 대처"]
      },
      {
        major: "이러닝운영 학습활동지원",
        sub: "학습활동 안내",
        details: ["학습절차", "과제수행", "평가기준", "상호작용", "자료등록"]
      },
      {
        major: "이러닝운영 학습활동지원",
        sub: "학습활동 촉진",
        details: ["학습진도 및 참여관리", "학습소통 관리", "학습자 질문 유형 및 대응", "학습 동기 부여", "학습 촉진 전략"]
      },
      {
        major: "이러닝운영 학습활동지원",
        sub: "수강오류 관리",
        details: ["수강오류 유형", "수강오류 대응방법"]
      },
      {
        major: "이러닝운영 활동관리",
        sub: "운영활동 계획",
        details: ["운영전 활동계획", "운영중 활동계획", "운영후 활동계획", "단계별 목표와 평가준거"]
      },
      {
        major: "이러닝운영 활동관리",
        sub: "운영활동 진행",
        details: ["학사 관리", "교강사 관리", "학습활동 모니터링", "학습만족도 향상을 위한 운영활동", "학습분석 및 맞춤형 학습관리"]
      },
      {
        major: "학습평가설계",
        sub: "학업성취도 평가 설계",
        details: ["평가모형", "평가의 유형", "평가시행 및 관리"]
      },
      {
        major: "학습평가설계",
        sub: "평가문항 작성",
        details: ["평가도구의 문항 형식", "평가문항 작성지침", "평가문항 양호도"]
      }
    ]
  },
  {
    subject: "이러닝 운영 관리",
    weight: 4,
    topics: [
      {
        major: "이러닝운영 교육과정관리",
        sub: "교육과정관리 계획",
        details: ["교육수요 예측 및 과정 선정", "과정 목표 및 체계수립", "과정별 상세 정보", "학습목표 수립"]
      },
      {
        major: "이러닝운영 교육과정관리",
        sub: "교육과정관리 진행",
        details: ["과정관리 항목", "유관부서 협업", "과정관리 매뉴얼", "과정의 질 관리"]
      },
      {
        major: "이러닝운영 교육과정관리",
        sub: "교육과정관리 결과보고",
        details: ["운영 결과 분석", "운영 결과 보고 및 환류"]
      },
      {
        major: "이러닝운영 평가관리",
        sub: "과정만족도 조사",
        details: ["조사 대상(교수자, 학습자, 운영자, 콘텐츠, 시스템 등)", "조사 항목 구성", "조사 도구 선정", "조사 수행", "조사 결과 분석 및 환류"]
      },
      {
        major: "이러닝운영 평가관리",
        sub: "학업성취도 관리",
        details: ["학업성취도 통계(집중경향, 변산도 등)", "학업성취도 점수부여", "학업성취도 분석 및 환류"]
      },
      {
        major: "이러닝운영 평가관리",
        sub: "평가결과 보고",
        details: ["과정만족도 보고", "학업성취도 보고"]
      },
      {
        major: "이러닝운영 결과관리",
        sub: "콘텐츠운영결과 관리",
        details: ["콘텐츠 내용과 운영 목표 비교", "콘텐츠 개발 결과", "콘텐츠 운영 결과"]
      },
      {
        major: "이러닝운영 결과관리",
        sub: "교·강사운영결과 관리",
        details: ["교·강사 활동 관리", "교·강사 활동 평가 및 환류"]
      },
      {
        major: "이러닝운영 결과관리",
        sub: "시스템운영결과 관리",
        details: ["운영 결과 취합", "개선사항 도출 및 제안"]
      },
      {
        major: "이러닝운영 결과관리",
        sub: "운영결과관리보고서 작성",
        details: ["운영준비 활동", "학사관리 지원", "교·강사 지원", "학습활동 지원", "과정평가 관리", "운영성과 관리"]
      }
    ]
  }
];

function getRandomTopics(count) {
  const result = [];
  const allTopics = EXAM_DATA.flatMap(subject =>
    subject.topics.map(topic => ({ ...topic, subject: subject.subject }))
  );
  const shuffled = allTopics.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function buildQuestionPrompt() {
  const questions = [];

  EXAM_DATA.forEach(subjectData => {
    const count = subjectData.weight;
    const shuffledTopics = [...subjectData.topics].sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i++) {
      const topic = shuffledTopics[i % shuffledTopics.length];
      const detail = topic.details[Math.floor(Math.random() * topic.details.length)];
      questions.push({
        subject: subjectData.subject,
        major: topic.major,
        sub: topic.sub,
        detail: detail
      });
    }
  });

  return questions.sort(() => Math.random() - 0.5);
}