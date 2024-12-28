let lastScrollY = 0;
const nav = document.querySelector('nav');

// 초기 상태에서는 메뉴 숨김
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // 스크롤이 맨 위(0)일 때는 메뉴 숨김
    if (currentScrollY === 0) {
        nav.classList.remove('bottom');
    } else {
        nav.classList.add('bottom');
    }
    
    lastScrollY = currentScrollY;
});

// 페이지 로드 시 초기 상태 설정
document.addEventListener('DOMContentLoaded', () => {
    // 초기 로드 시 스크롤이 맨 위면 메뉴 숨김
    if (window.scrollY === 0) {
        nav.classList.remove('bottom');
    }
}); 