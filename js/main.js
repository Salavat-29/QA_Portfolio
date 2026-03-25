// Инициализация AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out'
});

// ========== БУРГЕР-МЕНЮ ==========
document.addEventListener('DOMContentLoaded', function() {
    const navBtn = document.getElementById('nav-btn');
    const navList = document.querySelector('.nav-list');
    
    if (!navBtn || !navList) return;
    
    // Создаем оверлей
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('nav-overlay');
        document.body.appendChild(overlay);
    }
    
    // Функция закрытия меню
    function closeMenu() {
        navBtn.classList.remove('open');
        navList.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
        // Возвращаем меню в исходное положение
        navList.style.left = '';
        navList.style.display = '';
    }
    
    // Функция открытия меню
    function openMenu() {
        navBtn.classList.add('open');
        navList.classList.add('open');
        if (overlay) overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        // Принудительно показываем меню
        navList.style.left = '0';
        navList.style.display = 'flex';
    }
    
    // Функция переключения
    function toggleMenu() {
        if (navList.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Событие на кнопку бургера
    navBtn.addEventListener('click', toggleMenu);
    
    // Закрытие при клике на оверлей
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Закрытие при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navList.classList.contains('open')) {
            closeMenu();
        }
    });
    
    // ========== ПЛАВНЫЙ СКРОЛЛ ==========
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
                
                closeMenu();
            });
        });
    }
    
    // ========== КОПИРОВАНИЕ КОНТАКТОВ ==========
    function showNotification(message) {
        const existingNotification = document.querySelector('.copy-notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 2000);
    }
    
    document.querySelectorAll('.copyable').forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            const textToCopy = element.getAttribute('data-copy') || element.textContent.trim();
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                showNotification(`Скопировано: ${textToCopy}`);
                
                const originalText = element.innerHTML;
                element.innerHTML = '✓ Скопировано!';
                setTimeout(() => {
                    element.innerHTML = originalText;
                }, 1500);
            }).catch(() => {
                showNotification('Не удалось скопировать');
            });
        });
    });
});