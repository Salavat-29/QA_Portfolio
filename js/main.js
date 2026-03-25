const nav = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const navBtnImg = document.querySelector('#nav-btn-img');

navBtn.onclick = () => {
    if (nav.classList.toggle('open')) {
            navBtnImg.src= "./image/mobile/nav_close.svg";
    } else { 
        navBtnImg.src = "./image/mobile/nav_open.svg";
    }
}

AOS.init({
    // disable: mobile
    // once: true
});





// Функция копирования текста
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        // Показываем уведомление
        showNotification(`Скопировано: ${text}`);
        
        // Визуальный фидбек на элементе
        const originalText = element.innerHTML;
        element.innerHTML = '✓ Скопировано!';
        setTimeout(() => {
            element.innerHTML = originalText;
        }, 1500);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
        showNotification('Не удалось скопировать', 'error');
    });
}

// Показ уведомления
function showNotification(message, type = 'success') {
    // Удаляем существующее уведомление, если есть
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Автоматическое удаление через 2 секунды
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Добавляем обработчики на все элементы с классом copyable
document.querySelectorAll('.copyable').forEach(element => {
    element.addEventListener('click', (e) => {
        e.stopPropagation();
        const textToCopy = element.getAttribute('data-copy') || element.textContent.trim();
        copyToClipboard(textToCopy, element);
    });
});




// ========== ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ ==========
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    if (navLinks.length && header) {
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Закрываем мобильное меню
                const navList = document.querySelector('.nav-list');
                const navBtn = document.getElementById('nav-btn');
                const overlay = document.querySelector('.nav-overlay');
                
                if (navList && navList.classList.contains('open')) {
                    navList.classList.remove('open');
                    if (navBtn) navBtn.classList.remove('open');
                    if (overlay) overlay.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        });
    }
});