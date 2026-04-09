(() => {
    'use strict';

    /* ========================
       NAVBAR SCROLL
       ======================== */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    /* ========================
       MOBILE MENU
       ======================== */
    const hammy = document.getElementById('hammy');
    const navMenu = document.getElementById('nav-menu');

    if (hammy && navMenu) {
        hammy.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            hammy.classList.toggle('active');
            document.body.classList.toggle('menu-open', isOpen);
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hammy.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    /* ========================
       REVEAL ON SCROLL
       ======================== */
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        reveals.forEach(el => observer.observe(el));
    }

    /* ========================
       SLIDESHOW
       ======================== */
    const cards = Array.from(document.querySelectorAll('[data-gallery]'));
    const slideImg = document.getElementById('slideshowImage');
    const slideCounter = document.getElementById('slideCounter');
    const slidePrev = document.getElementById('slidePrev');
    const slideNext = document.getElementById('slideNext');

    let slideIndex = 0;

    function setActiveThumb(index) {
        cards.forEach((c, i) => c.classList.toggle('is-active', i === index));
    }

    function goToSlide(index) {
        if (!slideImg || !cards.length) return;
        slideIndex = ((index % cards.length) + cards.length) % cards.length;

        const img = cards[slideIndex].querySelector('img');
        if (!img) return;

        slideImg.classList.add('fading');

        setTimeout(() => {
            slideImg.src = img.src;
            slideImg.alt = img.alt;
            slideImg.classList.remove('fading');
        }, 250);

        if (slideCounter) {
            slideCounter.textContent = (slideIndex + 1) + ' / ' + cards.length;
        }
        setActiveThumb(slideIndex);
    }

    if (slidePrev) slidePrev.addEventListener('click', () => goToSlide(slideIndex - 1));
    if (slideNext) slideNext.addEventListener('click', () => goToSlide(slideIndex + 1));

    // Clicking a thumbnail updates the slideshow
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            goToSlide(i);
            // Scroll slideshow into view
            const slideSection = document.querySelector('.slideshow');
            if (slideSection) {
                slideSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // Init first thumb highlight
    setActiveThumb(0);

    /* ========================
       LIGHTBOX (double-click or long-press opens fullscreen)
       ======================== */
    const lightbox = document.getElementById('lightbox');
    const lbImage = document.getElementById('lightboxImage');
    const lbCaption = document.getElementById('lightboxCaption');
    const lbCounter = document.getElementById('lightboxCounter');
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');

    if (!lightbox || !lbImage) return;

    let lbIndex = 0;

    function openLightbox(index) {
        lbIndex = index;
        updateLightbox();
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lbClose.focus();
    }

    function closeLightbox() {
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        const card = cards[lbIndex];
        if (!card) return;
        const img = card.querySelector('img');
        if (!img) return;

        lbImage.src = img.src;
        lbImage.alt = img.alt;
        if (lbCaption) lbCaption.textContent = img.alt;
        if (lbCounter) lbCounter.textContent = (lbIndex + 1) + ' / ' + cards.length;
    }

    function lbNext_() {
        lbIndex = (lbIndex + 1) % cards.length;
        updateLightbox();
    }

    function lbPrev_() {
        lbIndex = (lbIndex - 1 + cards.length) % cards.length;
        updateLightbox();
    }

    // Double-click a thumbnail to open lightbox
    cards.forEach((card, i) => {
        card.addEventListener('dblclick', (e) => {
            e.preventDefault();
            openLightbox(i);
        });
    });

    // Clicking the slideshow image opens lightbox at current slide
    if (slideImg) {
        slideImg.style.cursor = 'pointer';
        slideImg.addEventListener('click', () => openLightbox(slideIndex));
    }

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbNext) lbNext.addEventListener('click', lbNext_);
    if (lbPrev) lbPrev.addEventListener('click', lbPrev_);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox__stage')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        // Lightbox open
        if (lightbox.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowRight') lbNext_();
            else if (e.key === 'ArrowLeft') lbPrev_();
            return;
        }
        // Slideshow keyboard nav when lightbox is closed
        if (e.key === 'ArrowRight') goToSlide(slideIndex + 1);
        else if (e.key === 'ArrowLeft') goToSlide(slideIndex - 1);
    });

    // Touch swipe for lightbox
    let touchStartX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) lbNext_();
            else lbPrev_();
        }
    }, { passive: true });

})();
