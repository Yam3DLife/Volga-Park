// js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Подсветка активной вкладки
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        if (currentPage === '' && linkPage === 'index.html') {
            link.classList.add('active');
        }
    });

    // Добавление иконок к файлам
    const fileCards = document.querySelectorAll('.file-card');
    fileCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent || '';
        const iconSpan = card.querySelector('.file-icon');
        
        if (iconSpan) {
            if (title.includes('Мир') || title.includes('World')) {
                iconSpan.textContent = '🌍';
            } else if (title.includes('Моды') || title.includes('Mods')) {
                iconSpan.textContent = '⚡';
            } else if (title.includes('Ресурспак') || title.includes('Resource')) {
                iconSpan.textContent = '🎨';
            } else {
                iconSpan.textContent = '📁';
            }
        }
    });

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Предупреждение о скачивании для больших файлов
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const fileSize = this.closest('.file-card')?.querySelector('.file-info span:first-child')?.textContent || '';
            if (fileSize.includes('GB') || parseInt(fileSize) > 100) {
                if (!confirm('Файл большого размера. Вы уверены, что хотите скачать?')) {
                    e.preventDefault();
                }
            }
        });
    });

    // Функционал галереи
    if (document.querySelector('.gallery-section')) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Модальное окно для просмотра изображений
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <span class="modal-close">&times;</span>
            <div class="modal-content">
                <img src="" alt="">
            </div>
            <div class="modal-caption"></div>
        `;
        document.body.appendChild(modal);

        const modalImg = modal.querySelector('img');
        const modalCaption = modal.querySelector('.modal-caption');
        const modalClose = modal.querySelector('.modal-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-caption h3')?.textContent || '';
                const description = item.querySelector('.gallery-caption p')?.textContent || '';
                
                modalImg.src = img.src;
                modalCaption.textContent = caption + (description ? ' - ' + description : '');
                modal.classList.add('active');
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === modalClose) {
                modal.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
});