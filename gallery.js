// ── Render gallery event cards from data/gallery-events.json ──
function renderGalleryEvents(events) {
    const list = document.getElementById("events-list");
    if (!list || !events) return;

    const arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>';

    list.innerHTML = events.map(function(ev) {
        return (
            '<a href="' + ev.href + '" class="event-card reveal">' +
                '<img class="event-card__img" src="' + ev.img + '" alt="' + ev.imgAlt + '">' +
                '<div class="event-card__body">' +
                    '<span class="event-card__year">' + ev.year + '</span>' +
                    '<h2 class="event-card__title">' + ev.title + '</h2>' +
                    '<p class="event-card__desc">' + ev.desc + '</p>' +
                '</div>' +
                '<div class="event-card__arrow">' + arrowSvg + '</div>' +
            '</a>'
        );
    }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/gallery-events.json")
        .then(function(r) { return r.json(); })
        .then(function(data) { renderGalleryEvents(data.events); })
        .catch(function(err) { console.error("Could not load gallery data:", err); });
    const navbar = document.getElementById("navbar");
    const mobileToggle = document.getElementById("hammy");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = navMenu ? navMenu.querySelectorAll("a") : [];
    const revealItems = document.querySelectorAll(".reveal");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxCounter = document.getElementById("lightboxCounter");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");
    const photoCards = document.querySelectorAll(".photo-card");

    let currentIndex = 0;
    let currentGallery = "february";

    const galleryData = {
        february: [
            { src: "feb-survival(1).jpg", alt: "Cadet standing at attention beside the memorial during the event" },
            { src: "feb-survival(2).jpg", alt: "Cadet standing beside wreaths during the event" },
            { src: "feb-survival(3).jpg", alt: "Cadets positioned around the memorial site" },
            { src: "feb-survival(4).jpg", alt: "Cadets standing in formation around the monument" },
            { src: "feb-survival(5).jpg", alt: "Evening guard image of a cadet with ceremonial rifle" },
            { src: "feb-survival(6).jpg", alt: "Cadets posted at the memorial with attendees in the background" },
            { src: "feb-survival(7).jpg", alt: "Cadets and attendees surrounding the memorial during the event" },
            { src: "feb-survival(8).jpg", alt: "Cadet standing near wreaths and memorial stone" },
            { src: "feb-survival(9).jpg", alt: "Night-time cadet guard posture in front of the memorial" },
            { src: "feb-survival(10).jpg", alt: "Cadets walking through the event area during the daytime ceremony" },
            { src: "feb-survival(11).jpg", alt: "Night-time portrait of cadet with ceremonial rifle in front of the memorial" },
            { src: "feb-survival(12).jpg", alt: "Cadets positioned on each side of the memorial during the ceremony" },
            { src: "feb-survival(13).jpg", alt: "Cadets and memorial shown in a wide daytime event shot" },
            { src: "feb-survival(14).jpg", alt: "Cadet standing in front of the memorial during the ceremony" },
            { src: "feb-survival(15).jpg", alt: "Night-time cadet formation around the memorial site" },
            { src: "feb-survival(16).jpg", alt: "Night-time memorial guard image with cadets in position" }
        ],
        ngta: [
            { src: "img1.png", alt: "Cadets standing in formation indoors during the directed activity" },
            { src: "img2.png", alt: "Instructor leading a practical demonstration while cadets observe" },
            { src: "img3.png", alt: "Cadets lined up along the wall during the indoor activity" },
            { src: "img4.png", alt: "Cadets standing in formation and listening during the training session" },
            { src: "img5.png", alt: "Cadets and instructors gathered around a table during a practical demonstration" },
            { src: "img6.png", alt: "Instructor guiding a cadet through a hands-on practical activity" },
            { src: "img7.png", alt: "Wide room overview showing participants assembled for the training event" },
            { src: "img8.png", alt: "Close-up of cadet participation during instructor-led activity" },
            { src: "img9.png", alt: "Indoor activity floor overview with cadets and instructors in session" },
            { src: "img10.png", alt: "Wide indoor training overview with cadets and instructors gathered for activity instruction" },
            { src: "img11.png", alt: "Rear perspective of cadets observing an instructor during the indoor activity" },
            { src: "img12.png", alt: "Cadets lined up and attentive during the directed training activity" }
        ]
    };

    // ── Navbar ──
    const setScrolledState = () => {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    };

    // ── Mobile menu ──
    const openMenu = () => {
        if (!mobileToggle || !navMenu) return;
        mobileToggle.classList.add("active");
        navMenu.classList.add("active");
        document.body.classList.add("menu-open");
        mobileToggle.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
        if (!mobileToggle || !navMenu) return;
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
        mobileToggle.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
        if (!navMenu) return;
        navMenu.classList.contains("active") ? closeMenu() : openMenu();
    };

    // ── Reveal on scroll ──
    const setupReveal = () => {
        if (!revealItems.length) return;

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("active");
                            obs.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
            );

            revealItems.forEach((item) => {
                if (!item.classList.contains("active")) {
                    observer.observe(item);
                }
            });
        } else {
            revealItems.forEach((item) => item.classList.add("active"));
        }
    };

    // ── Lightbox ──
    const updateLightbox = (index) => {
        const images = galleryData[currentGallery];
        if (!images || !images.length || !lightboxImage) return;

        currentIndex = (index + images.length) % images.length;
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;

        if (lightboxCaption) {
            lightboxCaption.textContent = images[currentIndex].alt;
        }

        if (lightboxCounter) {
            lightboxCounter.textContent = (currentIndex + 1) + " / " + images.length;
        }
    };

    const openLightbox = (galleryName, index) => {
        if (!lightbox) return;
        currentGallery = galleryName;
        updateLightbox(index);
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
    };

    const showNextImage = () => updateLightbox(currentIndex + 1);
    const showPrevImage = () => updateLightbox(currentIndex - 1);

    // ── Bind events ──

    if (mobileToggle && navMenu) {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.setAttribute("aria-label", "Toggle navigation menu");
        mobileToggle.setAttribute("aria-controls", "nav-menu");
        mobileToggle.addEventListener("click", toggleMenu);

        navLinks.forEach((link) => link.addEventListener("click", closeMenu));

        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains("active")) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    photoCards.forEach((card) => {
        card.addEventListener("click", () => {
            const index = Number(card.dataset.index) || 0;
            const galleryName = card.dataset.gallery || "february";
            openLightbox(galleryName, index);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener("click", showNextImage);
    if (lightboxPrev) lightboxPrev.addEventListener("click", showPrevImage);

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (navMenu && navMenu.classList.contains("active")) closeMenu();
            if (lightbox && lightbox.classList.contains("active")) closeLightbox();
        }
        if (lightbox && lightbox.classList.contains("active")) {
            if (e.key === "ArrowRight") showNextImage();
            if (e.key === "ArrowLeft") showPrevImage();
        }
    });

    // Touch swipe for lightbox
    let touchStartX = 0;

    if (lightbox) {
        lightbox.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener("touchend", (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? showNextImage() : showPrevImage();
            }
        }, { passive: true });
    }

    // Scroll
    window.addEventListener("scroll", setScrolledState, { passive: true });

    // Init
    setScrolledState();
    setupReveal();
});
