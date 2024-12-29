// 컴포넌트 로드 함수
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error('컴포넌트 로드 실패:', error);
    }
}

// 페이지 로드 시 필요한 컴포넌트 로드
document.addEventListener('DOMContentLoaded', () => {
    // 현재 페이지의 경로를 확인
    const currentPage = window.location.pathname;
    
    // music 섹션 로드 (디버깅을 위한 콘솔 로그 추가)
    if (currentPage.includes('index.html') || currentPage.includes('music.html') || currentPage === '/') {
        console.log('Loading music section...');
        loadComponent('music-content', '/components/music-section.html');
    }
}); 