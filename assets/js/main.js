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
const SERVER_IP = document.getElementById('ip-address').innerText;

async function updateServerStatus() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await response.json();
        
        const playerElement = document.getElementById('online-players');
        const versionElement = document.getElementById('server-version');
        const statusIcon = document.querySelector('.player-count i');
        
        if (data.online) {
            playerElement.innerText = data.players.online;
            versionElement.innerText = data.version || '1.16 - 1.20';
            statusIcon.style.color = '#4CAF50'; // Hiện màu xanh khi online
        } else {
            playerElement.innerText = '0';
            versionElement.innerText = 'Offline';
            statusIcon.style.color = '#ff4d4d'; // Hiện màu đỏ khi offline
            console.warn('Server hiện đang offline hoặc IP không đúng.');
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
        document.getElementById('online-players').innerText = '?';
        document.getElementById('server-version').innerText = 'Lỗi kết nối';
    }
}

// Cập nhật ngay khi tải trang và mỗi 60 giây
updateServerStatus();
setInterval(updateServerStatus, 60000);


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


