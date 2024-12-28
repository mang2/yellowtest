// 상품 데이터를 저장할 배열
let products = [];

// DOM 요소
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const addProductBtn = document.getElementById('addProductBtn');

// 기존 코드 상단에 추가
if (!checkAuth()) {
    window.location.href = 'login.html';
}

// 상품 추가 버튼 클릭 이벤트
addProductBtn.addEventListener('click', () => {
    productForm.style.display = 'block';
});

// 폼 닫기
function closeForm() {
    productForm.style.display = 'none';
}

// 상품 폼 제출 처리
document.getElementById('shopItemForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const product = {
        id: Date.now(), // 임시 ID
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        image: document.getElementById('productImage').files[0],
        link: document.getElementById('productLink').value
    };

    // 실제로는 서버에 데이터를 전송하고 저장해야 함
    products.push(product);
    updateProductList();
    closeForm();
});

// 상품 목록 업데이트
function updateProductList() {
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>₩${product.price}</p>
            <div class="product-actions">
                <button onclick="editProduct(${product.id})">수정</button>
                <button onclick="deleteProduct(${product.id})">삭제</button>
            </div>
        `;
        productList.appendChild(productElement);
    });
}

// 상품 수정
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productLink').value = product.link;
        productForm.style.display = 'block';
    }
}

// 상품 삭제
function deleteProduct(id) {
    if (confirm('정말 삭제하시겠습니까?')) {
        products = products.filter(p => p.id !== id);
        updateProductList();
    }
}

// 로그아웃
document.getElementById('logoutBtn').addEventListener('click', logout);

// API 요청에 보안 헤더 추가
async function apiRequest(url, options = {}) {
    const headers = {
        ...getSecureHeaders(),
        ...options.headers
    };
    
    try {
        const response = await fetch(url, { ...options, headers });
        if (response.status === 401) {
            // 인증 만료
            logout();
            return;
        }
        return response;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
} 