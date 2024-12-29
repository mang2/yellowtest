// 인증 관련 상수
const AUTH_TOKEN_KEY = 'admin_auth_token';

// 관리자 계정
const ADMIN_CREDENTIALS = {
    username: 'yellowcottage',
    password: 'yc240318'  // 2024년 3월 18일 기준
};

// 로그인 처리
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password) {
        // 로그인 성공
        const token = generateToken();
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        window.location.href = 'shop-manager.html';
    } else {
        // 로그인 실패
        document.getElementById('loginError').style.display = 'block';
    }
});

// 토큰 생성
function generateToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// 인증 확인
function checkAuth() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// 로그아웃
function logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.location.href = 'index.html';
}

// 보안 헤더 생성
function getSecureHeaders() {
    return {
        'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
        'X-API-Key': API_KEY
    };
}

// 페이지 로드 시 인증 체크
document.addEventListener('DOMContentLoaded', () => {
    // login.html이 아닌 경우에만 인증 체크
    if (!window.location.pathname.includes('login.html')) {
        checkAuth();
    }
}); 