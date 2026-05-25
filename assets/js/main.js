function copyIP() {
    const ipText = document.getElementById('ip-address').innerText;
    navigator.clipboard.writeText(ipText).then(() => {
        alert('Đã sao chép IP: ' + ipText);
    }).catch(err => {
        console.error('Lỗi khi sao chép: ', err);
    });
}

// Giả lập số người chơi online (Sau này sẽ thay bằng API thực tế)
function updateOnlinePlayers() {
    const playerCount = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    document.getElementById('online-players').innerText = playerCount;
}

// Cập nhật mỗi 30 giây
setInterval(updateOnlinePlayers, 30000);
updateOnlinePlayers();

// FAQ Toggle logic
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});
