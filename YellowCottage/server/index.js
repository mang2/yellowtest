const express = require('express');
const cors = require('cors');
const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 관리자 인증
const adminCredentials = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'password'
};

// 로그인 API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === adminCredentials.username && 
        password === adminCredentials.password) {
        res.json({ success: true, token: 'admin_token' });
    } else {
        res.status(401).json({ success: false });
    }
});

// 상품 데이터 저장용 (실제로는 데이터베이스 사용)
let products = [];

// 상품 API
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const product = req.body;
    products.push(product);
    res.json(product);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 