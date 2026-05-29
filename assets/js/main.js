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
            
            // Cập nhật thanh player bar
            const bar = document.getElementById('player-bar');
            if (bar) {
                const maxPlayers = data.players.max || 100;
                const percent = Math.min((data.players.online / maxPlayers) * 100, 100);
                bar.style.width = percent + '%';
            }

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

async function loadRecentDonators() {
    const list = document.getElementById('recent-donators-list');
    if (!list) return;

    try {
        const response = await fetch(`${API_BASE}/api/recent-recharge`);
        const data = await response.json();
        
        if (data.length === 0) {
            list.innerHTML = '<p style="text-align: center; font-size: 12px; color: #888; padding: 10px;">Chưa có hoạt động nạp thẻ gần đây.</p>';
            return;
        }

        list.innerHTML = data.map(item => `
            <div class="donator-item">
                <span class="donator-name"><i class="fas fa-user-circle"></i> ${item.username}</span>
                <span class="donator-amount">+${item.amount.toLocaleString()}đ</span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Lỗi tải nạp gần đây:', error);
    }
}

// Khởi chạy khi trang load xong
document.addEventListener('DOMContentLoaded', () => {
    updateServerStatus();
    loadRecentDonators();
    setInterval(updateServerStatus, 30000);
    setInterval(loadRecentDonators, 30000); // Cập nhật mỗi 30s
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

// Background Music Logic
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');

if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.remove('muted');
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.pause();
            musicBtn.classList.add('muted');
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
}



// Store Filtering Logic
const filterButtons = document.querySelectorAll('.cat-btn');
const searchInput = document.querySelector('.search-box input');
const storeCards = document.querySelectorAll('.store-card');

function filterStore() {
    const activeCategory = document.querySelector('.cat-btn.active').dataset.category;
    const searchText = searchInput.value.toLowerCase();

    storeCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardTitle = card.querySelector('h3').innerText.toLowerCase();
        
        const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
        const matchesSearch = cardTitle.includes(searchText);

        if (matchesCategory && matchesSearch) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterStore();
    });
});

if (searchInput) {
    searchInput.addEventListener('input', filterStore);
}

// Tra cứu thông tin tài khoản
async function lookupAccount() {
    const username = document.getElementById('lookup-username').value.trim();
    if (!username) {
        alert('Vui lòng nhập tên người chơi!');
        return;
    }

    const resultDiv = document.getElementById('lookup-result');
    const loadingDiv = document.getElementById('lookup-loading');

    resultDiv.style.display = 'none';
    loadingDiv.style.display = 'block';

    try {
        const response = await fetch(`${API_BASE}/api/player/${username}`);
        const res = await response.json();

        if (res.status === 'success') {
            document.getElementById('res-username').innerText = res.data.username;
            document.getElementById('res-points').innerText = res.data.points.toLocaleString();
            document.getElementById('res-rank').innerText = res.data.rank;
            document.getElementById('res-total').innerText = res.data.totalRecharge.toLocaleString() + 'đ';
            
            resultDiv.style.display = 'block';
        } else {
            alert(res.message || 'Không tìm thấy người chơi này!');
        }
    } catch (error) {
        console.error('Lỗi tra cứu:', error);
        alert('Lỗi kết nối tới hệ thống tra cứu!');
    } finally {
        loadingDiv.style.display = 'none';
    }
}
