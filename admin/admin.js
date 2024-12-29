// 상품 데이터를 저장할 배열
let products = [];

// DOM 요소
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const addProductBtn = document.getElementById('addProductBtn');

// 인증 체크
if (!checkAuth()) {
    window.location.href = 'index.html';
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
        id: Date.now(),
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        image: document.getElementById('productImage').files[0],
        link: document.getElementById('productLink').value
    };

    products.push(product);
    updateProductList();
    closeForm();
});

// 이미지 프리뷰 기능
document.getElementById('productImage')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        }
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
});

// 상품 목록 업데이트
function updateProductList() {
    productList.innerHTML = '';
    
    // 이미지를 Data URL로 변환하여 저장
    const productsToStore = products.map(product => {
        const clone = { ...product };
        if (product.image instanceof File) {
            const reader = new FileReader();
            reader.onload = function(e) {
                clone.imageUrl = e.target.result;
                // 로컬 스토리지 업데이트
                localStorage.setItem('shop_products', JSON.stringify(products));
            };
            reader.readAsDataURL(product.image);
        }
        return clone;
    });

    // 로컬 스토리지에 저장
    localStorage.setItem('shop_products', JSON.stringify(productsToStore));

    // 화면 업데이트
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        
        let imageUrl = product.imageUrl;
        if (product.image instanceof File) {
            imageUrl = URL.createObjectURL(product.image);
        }
        
        productElement.innerHTML = `
            <img src="${imageUrl || 'placeholder.jpg'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₩${Number(product.price).toLocaleString()}</p>
            <p>${product.description || ''}</p>
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