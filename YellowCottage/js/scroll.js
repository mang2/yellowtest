let lastScrollY = 0;
const nav = document.querySelector('nav');

// 초기 상태에서는 메뉴 숨김
window.addEventListener('scroll', () => {
    // 스크롤 동작이 발생하면 바로 메뉴 표시
    nav.classList.add('bottom');
});

// 페이지 로드 시 초기 상태 설정
document.addEventListener('DOMContentLoaded', () => {
    // 페이지 로드 시에는 메뉴 숨김
    nav.classList.remove('bottom');
}); 