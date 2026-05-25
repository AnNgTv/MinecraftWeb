function copyIP() {
    const ipText = document.getElementById('ip-address').innerText;
    const btn = document.querySelector('.server-status button');
    
    navigator.clipboard.writeText(ipText).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Đã sao chép!';
        btn.style.background = '#28a745';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '#4CAF50';
        }, 2000);
    }).catch(err => {
        console.error('Lỗi khi sao chép: ', err);
    });
}

// Kết nối API thực tế để lấy trạng thái Server
async function updateServerStatus() {
    const ipElement = document.getElementById('ip-address');
    if (!ipElement) return;

    const SERVER_IP = ipElement.innerText;
    
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await response.json();
        
        const playerElement = document.getElementById('online-players');
        const versionElement = document.getElementById('server-version');
        const statusIcon = document.querySelector('.player-count i');
        
        if (data.online) {
            if (playerElement) playerElement.innerText = data.players.online;
            if (versionElement) {
                // Ưu tiên hiển thị version string, nếu không có thì dùng dãy phiên bản hỗ trợ
                versionElement.innerText = data.version || (data.protocol && data.protocol.name) || '1.16 - 1.20';
            }
            if (statusIcon) statusIcon.style.color = '#4CAF50';
        } else {
            if (playerElement) playerElement.innerText = '0';
            if (versionElement) versionElement.innerText = 'Offline';
            if (statusIcon) statusIcon.style.color = '#ff4d4d';
            console.warn('Server hiện đang offline hoặc IP không đúng.');
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
        if (document.getElementById('online-players')) document.getElementById('online-players').innerText = '?';
        if (document.getElementById('server-version')) document.getElementById('server-version').innerText = 'Lỗi kết nối';
    }
}

// Khởi chạy khi trang load xong
document.addEventListener('DOMContentLoaded', () => {
    updateServerStatus();
    setInterval(updateServerStatus, 60000);
});


// FAQ Toggle logic
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.querySelector('i').classList.toggle('fa-bars');
        mobileMenu.querySelector('i').classList.toggle('fa-times');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileMenu) {
            mobileMenu.querySelector('i').classList.add('fa-bars');
            mobileMenu.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Back to Top Button Logic
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


