// 로컬 스토리지에서 상품 데이터 가져오기
function getProducts() {
    const productsData = localStorage.getItem('shop_products');
    return productsData ? JSON.parse(productsData) : [];
}

// 상품 목록 표시
function displayProducts() {
    const shopGrid = document.getElementById('shopGrid');
    const products = getProducts();

    shopGrid.innerHTML = products.map(product => `
        <div class="shop-item">
            <div class="item-image">
                <img src="${product.imageUrl || 'images/placeholder.jpg'}" alt="${product.name}">
            </div>
            <h3 class="item-title">${product.name}</h3>
            <p class="item-price">₩${Number(product.price).toLocaleString()}</p>
            <p class="item-description">${product.description || ''}</p>
            ${product.link ? `
                <a href="${product.link}" class="buy-button" target="_blank" data-translate="buyNow">구매하기</a>
            ` : ''}
        </div>
    `).join('');
}

// 페이지 로드 시 상품 표시
document.addEventListener('DOMContentLoaded', displayProducts); 