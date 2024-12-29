// EmailJS 초기화
emailjs.init("YOUR_PUBLIC_KEY"); // EmailJS에서 받은 public key

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 버튼 비활성화
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    // EmailJS로 메일 전송
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            // 성공 메시지 표시
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';
            // 폼 초기화
            document.getElementById('contactForm').reset();
        }, function(error) {
            // 에러 메시지 표시
            document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
            console.error('메일 전송 실패:', error);
        })
        .finally(function() {
            // 버튼 다시 활성화
            submitButton.disabled = false;
        });
}); 