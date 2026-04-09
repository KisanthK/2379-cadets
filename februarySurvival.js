(() => {
    'use strict';

    const navbar = document.getElementById('navbar');
    const hammy = document.getElementById('hammy');
    const navMenu = document.getElementById('nav-menu');

    const cards = Array.from(document.querySelectorAll('[data-gallery]'));
    const slideImg = document.getElementById('slideshowImage');
    const slideCounter = document.getElementById('slideCounter');
    const slidePrev = document.getElementById('slidePrev');
    const slideNext = document.getElementById('slideNext');

    const lightbox = document.getElementById('lightbox');
    const lbImage = document.getElementById('lightboxImage');
    const lbCaption = document.getElementById('lightboxCaption');
    const lbCounter = document.getElementById('lightboxCounter');
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');

    let slideIndex = 0;
    let lbIndex = 0;
    let touchStartX = 0;

    /* ========================
       NAVBAR SCROLL
       ======================== */
    if (navbar) {
        const toggleNavbarState = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        };

        toggleNavbarState();
        window.addEventListener('scroll', toggleNavbarState, { passive: true });
    }

    /* ========================
       MOBILE MENU
       ======================== */
    if (hammy && navMenu) {
        hammy.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            hammy.classList.toggle('active');
            hammy.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('menu-open', isOpen);
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hammy.classList.remove('active');
                hammy.setAttribute('aria-expanded', 'false');
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
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        reveals.forEach((el) => observer.observe(el));
    }

    /* ========================
       SLIDESHOW + THUMBNAILS
       ======================== */
    function setActiveThumb(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('is-active', i === index);
        });
    }

    function updateCounter(current, total, element) {
        if (element) {
            element.textContent = `${current} / ${total}`;
        }
    }

    function preloadImage(src, callback) {
        const img = new Image();
        img.src = src;

        if (img.complete) {
            callback();
            return;
        }

        img.onload = callback;
        img.onerror = callback;
    }

    function goToSlide(index) {
        if (!slideImg || !cards.length) return;

        slideIndex = ((index % cards.length) + cards.length) % cards.length;

        const card = cards[slideIndex];
        const img = card.querySelector('img');

        if (!img) return;

        const nextSrc = img.getAttribute('src');
        const nextAlt = img.getAttribute('alt');

        slideImg.classList.add('fading');

        preloadImage(nextSrc, () => {
            slideImg.src = nextSrc;
            slideImg.alt = nextAlt;

            requestAnimationFrame(() => {
                slideImg.classList.remove('fading');
            });
        });

        updateCounter(slideIndex + 1, cards.length, slideCounter);
        setActiveThumb(slideIndex);
    }

    if (slidePrev) {
        slidePrev.addEventListener('click', () => goToSlide(slideIndex - 1));
    }

    if (slideNext) {
        slideNext.addEventListener('click', () => goToSlide(slideIndex + 1));
    }

    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            goToSlide(i);

            const slideSection = document.querySelector('.slideshow');
            if (slideSection) {
                slideSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        card.addEventListener('dblclick', (event) => {
            event.preventDefault();
            openLightbox(i);
        });
    });

    if (cards.length) {
        setActiveThumb(0);
        updateCounter(1, cards.length, slideCounter);
    }

    /* ========================
       LIGHTBOX
       ======================== */
    function updateLightbox() {
        if (!lbImage || !cards.length) return;

        const card = cards[lbIndex];
        if (!card) return;

        const img = card.querySelector('img');
        if (!img) return;

        const nextSrc = img.getAttribute('src');
        const nextAlt = img.getAttribute('alt');

        preloadImage(nextSrc, () => {
            lbImage.src = nextSrc;
            lbImage.alt = nextAlt;

            if (lbCaption) {
                lbCaption.textContent = nextAlt;
            }

            updateCounter(lbIndex + 1, cards.length, lbCounter);
        });
    }

    function openLightbox(index) {
        if (!lightbox) return;

        lbIndex = index;
        updateLightbox();
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (lbClose) {
            lbClose.focus();
        }
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function nextLightbox() {
        lbIndex = (lbIndex + 1) % cards.length;
        updateLightbox();
    }

    function prevLightbox() {
        lbIndex = (lbIndex - 1 + cards.length) % cards.length;
        updateLightbox();
    }

    if (slideImg) {
        slideImg.style.cursor = 'pointer';
        slideImg.addEventListener('click', () => openLightbox(slideIndex));
    }

    if (lbClose) {
        lbClose.addEventListener('click', closeLightbox);
    }

    if (lbNext) {
        lbNext.addEventListener('click', nextLightbox);
    }

    if (lbPrev) {
        lbPrev.addEventListener('click', prevLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox || event.target.classList.contains('lightbox__stage')) {
                closeLightbox();
            }
        });

        lightbox.addEventListener('touchstart', (event) => {
            touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (event) => {
            const diff = touchStartX - event.changedTouches[0].screenX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextLightbox();
                } else {
                    prevLightbox();
                }
            }
        }, { passive: true });
    }

    document.addEventListener('keydown', (event) => {
        if (lightbox && lightbox.getAttribute('aria-hidden') === 'false') {
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowRight') {
                nextLightbox();
            } else if (event.key === 'ArrowLeft') {
                prevLightbox();
            }
            return;
        }

        if (event.key === 'ArrowRight') {
            goToSlide(slideIndex + 1);
        } else if (event.key === 'ArrowLeft') {
            goToSlide(slideIndex - 1);
        }
    });
})();