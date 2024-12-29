// 언어 설정을 저장할 객체
const translations = {
    en: {
        tour: "Tour",
        music: "Music",
        live: "Live",
        shop: "Shop",
        viewMore: "View More",
        video: "Video",
        newsletter: "Newsletter",
        emailPlaceholder: "Enter your email address",
        subscribe: "Subscribe",
        domesticStore: "Domestic Store",
        internationalStore: "International Store",
        privacyPolicy: "Privacy Policy",
        about: "About",
        contact: "Contact",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send",
        home: "Home",
        noTour: "No upcoming shows",
        buyNow: "Buy Now"
    },
    ko: {
        tour: "투어",
        music: "음악",
        live: "라이브",
        shop: "샵",
        viewMore: "더 보기",
        video: "영상",
        newsletter: "뉴스레터 구독",
        emailPlaceholder: "이메일 주소를 입력하세요",
        subscribe: "구독하기",
        domesticStore: "국내 스토어",
        internationalStore: "해외 스토어",
        privacyPolicy: "개인정보 처리방침",
        about: "소개",
        contact: "문의하기",
        name: "이름",
        email: "이메일",
        message: "메시지",
        send: "보내기",
        home: "홈",
        noTour: "예정 공연이 없습니다",
        buyNow: "구매하기"
    }
};

// 언어 변경 함수
function changeLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// IP 기반 언어 감지
async function detectLanguage() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code.toLowerCase();
        
        // 한국이면 한국어, 그 외는 영어
        const language = country === 'kr' ? 'ko' : 'en';
        changeLanguage(language);
    } catch (error) {
        console.error('Language detection failed:', error);
        changeLanguage('en'); // 기본값은 영어
    }
}

// 페이지 로드 시 언어 감지 실행
document.addEventListener('DOMContentLoaded', detectLanguage); 