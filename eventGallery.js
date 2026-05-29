(() => {
    'use strict';

    /* ========================
       LOAD EVENT DATA
       ======================== */
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('id');

    if (!eventId) {
        document.title = 'Event Not Found | 2379 Burlington Army Cadets';
        document.body.innerHTML = '<div style="padding:120px 40px;text-align:center;font-family:sans-serif"><h1>No event specified.</h1><a href="gallery.html">Back to Gallery</a></div>';
        return;
    }

    fetch('data/events/' + eventId + '.json')
        .then(function(r) {
            if (!r.ok) throw new Error('Event not found');
            return r.json();
        })
        .then(function(data) {
            initPage(data);
        })
        .catch(function() {
            document.body.innerHTML = '<div style="padding:120px 40px;text-align:center;font-family:sans-serif"><h1>Event not found.</h1><a href="gallery.html">Back to Gallery</a></div>';
        });

    function initPage(data) {
        /* ── Populate hero ── */
        document.title = data.title + ' | 2379 Burlington Army Cadets';

        var heroBg = document.getElementById('hero-bg');
        if (heroBg) heroBg.style.backgroundImage = "url('" + data.heroImage + "')";

        var heroLabel = document.getElementById('hero-label');
        if (heroLabel) heroLabel.textContent = data.label;

        var heroTitle = document.getElementById('hero-title');
        if (heroTitle) heroTitle.textContent = data.title;

        var heroDesc = document.getElementById('hero-desc');
        if (heroDesc) heroDesc.textContent = data.heroDescription;

        var galleryDesc = document.getElementById('gallery-desc');
        if (galleryDesc) galleryDesc.textContent = data.galleryDescription;

        var photoCount = document.getElementById('photo-count');
        if (photoCount) photoCount.textContent = data.photos.length;

        /* ── Build photo grid ── */
        var grid = document.getElementById('photo-grid');
        if (grid) {
            grid.innerHTML = data.photos.map(function(photo, i) {
                return (
                    '<button class="photo-card reveal" type="button" data-index="' + i + '">' +
                        '<img src="' + photo.src + '" alt="' + photo.alt + '" loading="lazy">' +
                    '</button>'
                );
            }).join('');
        }

        /* ── Activate reveal items ── */
        document.querySelectorAll('.reveal:not(.active)').forEach(function(el) {
            el.classList.add('active');
        });

        /* ── Init all interactivity ── */
        initNavbar();
        initSlideshow();
        initLightbox();
        initReveal();
    }

    /* ========================
       NAVBAR
       ======================== */
    function initNavbar() {
        var navbar = document.getElementById('navbar');
        var hammy = document.getElementById('hammy');
        var navMenu = document.getElementById('nav-menu');

        if (navbar) {
            window.addEventListener('scroll', function() {
                navbar.classList.toggle('scrolled', window.scrollY > 40);
            }, { passive: true });
        }

        if (hammy && navMenu) {
            hammy.addEventListener('click', function() {
                var isOpen = navMenu.classList.toggle('active');
                hammy.classList.toggle('active');
                document.body.classList.toggle('menu-open', isOpen);
            });

            navMenu.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    hammy.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }
    }

    /* ========================
       REVEAL ON SCROLL
       ======================== */
    function initReveal() {
        var reveals = document.querySelectorAll('.reveal:not(.active)');
        if (!reveals.length) return;

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            reveals.forEach(function(el) { observer.observe(el); });
        } else {
            reveals.forEach(function(el) { el.classList.add('active'); });
        }
    }

    /* ========================
       SLIDESHOW
       ======================== */
    function initSlideshow() {
        var cards = Array.from(document.querySelectorAll('[data-index]'));
        var slideImg = document.getElementById('slideshowImage');
        var slideCounter = document.getElementById('slideCounter');
        var slidePrev = document.getElementById('slidePrev');
        var slideNext = document.getElementById('slideNext');
        var slideIndex = 0;

        function setActiveThumb(index) {
            cards.forEach(function(c, i) { c.classList.toggle('is-active', i === index); });
        }

        function goToSlide(index) {
            if (!slideImg || !cards.length) return;
            slideIndex = ((index % cards.length) + cards.length) % cards.length;
            var img = cards[slideIndex].querySelector('img');
            if (!img) return;

            slideImg.classList.add('fading');
            setTimeout(function() {
                slideImg.src = img.src;
                slideImg.alt = img.alt;
                slideImg.classList.remove('fading');
            }, 250);

            if (slideCounter) slideCounter.textContent = (slideIndex + 1) + ' / ' + cards.length;
            setActiveThumb(slideIndex);
        }

        if (cards.length) {
            var firstImg = cards[0].querySelector('img');
            if (slideImg && firstImg) {
                slideImg.src = firstImg.src;
                slideImg.alt = firstImg.alt;
            }
            if (slideCounter) slideCounter.textContent = '1 / ' + cards.length;
            setActiveThumb(0);
        }

        if (slidePrev) slidePrev.addEventListener('click', function() { goToSlide(slideIndex - 1); });
        if (slideNext) slideNext.addEventListener('click', function() { goToSlide(slideIndex + 1); });

        cards.forEach(function(card, i) {
            card.addEventListener('click', function() {
                goToSlide(i);
                var slideSection = document.querySelector('.slideshow');
                if (slideSection) slideSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });

        document.addEventListener('keydown', function(e) {
            var lb = document.getElementById('lightbox');
            if (lb && lb.getAttribute('aria-hidden') === 'false') return;
            if (e.key === 'ArrowRight') goToSlide(slideIndex + 1);
            else if (e.key === 'ArrowLeft') goToSlide(slideIndex - 1);
        });

        // expose slideIndex for lightbox
        window._slideIndex = function() { return slideIndex; };
    }

    /* ========================
       LIGHTBOX
       ======================== */
    function initLightbox() {
        var lightbox = document.getElementById('lightbox');
        var lbImage = document.getElementById('lightboxImage');
        var lbCaption = document.getElementById('lightboxCaption');
        var lbCounter = document.getElementById('lightboxCounter');
        var lbClose = document.getElementById('lightboxClose');
        var lbPrev = document.getElementById('lightboxPrev');
        var lbNext = document.getElementById('lightboxNext');
        var cards = Array.from(document.querySelectorAll('[data-index]'));

        if (!lightbox || !lbImage) return;

        var lbIndex = 0;

        function openLightbox(index) {
            lbIndex = index;
            updateLightbox();
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (lbClose) lbClose.focus();
        }

        function closeLightbox() {
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        function updateLightbox() {
            var card = cards[lbIndex];
            if (!card) return;
            var img = card.querySelector('img');
            if (!img) return;
            lbImage.src = img.src;
            lbImage.alt = img.alt;
            if (lbCaption) lbCaption.textContent = img.alt;
            if (lbCounter) lbCounter.textContent = (lbIndex + 1) + ' / ' + cards.length;
        }

        function next() { lbIndex = (lbIndex + 1) % cards.length; updateLightbox(); }
        function prev() { lbIndex = (lbIndex - 1 + cards.length) % cards.length; updateLightbox(); }

        cards.forEach(function(card, i) {
            card.addEventListener('dblclick', function(e) { e.preventDefault(); openLightbox(i); });
        });

        var slideImg = document.getElementById('slideshowImage');
        if (slideImg) {
            slideImg.style.cursor = 'pointer';
            slideImg.addEventListener('click', function() { openLightbox(window._slideIndex ? window._slideIndex() : 0); });
        }

        if (lbClose) lbClose.addEventListener('click', closeLightbox);
        if (lbNext) lbNext.addEventListener('click', next);
        if (lbPrev) lbPrev.addEventListener('click', prev);

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox__stage')) closeLightbox();
        });

        document.addEventListener('keydown', function(e) {
            if (lightbox.getAttribute('aria-hidden') === 'false') {
                if (e.key === 'Escape') closeLightbox();
                else if (e.key === 'ArrowRight') next();
                else if (e.key === 'ArrowLeft') prev();
            }
        });

        var touchStartX = 0;
        lightbox.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        lightbox.addEventListener('touchend', function(e) {
            var diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) { if (diff > 0) next(); else prev(); }
        }, { passive: true });
    }

})();
