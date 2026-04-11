// ── Render training schedule from data/schedule.json ──
function renderSchedule(s) {
    var card = document.getElementById("schedule-card");
    if (!card || !s) return;

    var html =
        '<div class="log-group">' +
            '<div class="log-icon">\uD83D\uDCC5</div>' +
            '<div class="log-text">' +
                '<h3>Training Nights</h3>' +
                '<p>' + s.trainingDay + '</p>' +
                '<p class="time">' + s.trainingTime + '</p>' +
            '</div>' +
        '</div>' +
        '<div class="log-group">' +
            '<div class="log-icon">\uD83D\uDCCD</div>' +
            '<div class="log-text">' +
                '<h3>Headquarters</h3>' +
                '<p>' + s.addressLine1 + '</p>' +
                '<p>' + s.addressLine2 + '</p>' +
            '</div>' +
        '</div>' +
        '<div class="entrance-instruction">' +
            '<div class="instruction-header"><strong>Important Entrance Info:</strong></div>' +
            '<p>' + s.entranceNoteHtml + '</p>' +
        '</div>';

    card.insertAdjacentHTML("afterbegin", html);
}

// ── Render sponsors from data/sponsors.json ──
function renderSponsors(sponsorsData) {
    if (!sponsorsData) return;

    var primaryEl   = document.getElementById("primary-sponsors");
    var secondaryEl = document.getElementById("secondary-sponsors");

    function logoCard(sponsor, cardClass) {
        var imgTag = '<img src="' + sponsor.img + '" alt="' + sponsor.alt + '">';
        var inner = sponsor.href
            ? '<a href="' + sponsor.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + sponsor.ariaLabel + '">' + imgTag + '</a>'
            : imgTag;
        return '<div class="' + cardClass + ' reveal">' + inner + '</div>';
    }

    if (primaryEl) {
        primaryEl.innerHTML = sponsorsData.primary.map(function(s) {
            return logoCard(s, "logo-card-premium");
        }).join("");
    }

    if (secondaryEl) {
        secondaryEl.innerHTML = sponsorsData.secondary.map(function(s) {
            return logoCard(s, "logo-card-standard");
        }).join("");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        fetch("data/schedule.json").then(function(r) { return r.json(); }),
        fetch("data/sponsors.json").then(function(r) { return r.json(); })
    ]).then(function(results) {
        renderSchedule(results[0]);
        renderSponsors(results[1]);
    }).catch(function(err) {
        console.error("Could not load site data:", err);
    });
    const navbar = document.getElementById("navbar");
    const mobileToggle = document.getElementById("hammy");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = navMenu ? navMenu.querySelectorAll("a") : [];
    const revealItems = document.querySelectorAll(".reveal");

    if (!navbar || !mobileToggle || !navMenu) return;

    const setScrolledState = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    };

    const openMenu = () => {
        mobileToggle.classList.add("active");
        navMenu.classList.add("active");
        document.body.classList.add("menu-open");
        mobileToggle.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
        mobileToggle.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
        if (navMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const setupReveal = () => {
        if (!revealItems.length) return;

        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("active");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

            revealItems.forEach((item) => {
                revealObserver.observe(item);
            });
        } else {
            revealItems.forEach((item) => item.classList.add("active"));
        }
    };

    mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.setAttribute("aria-label", "Toggle navigation menu");
    mobileToggle.setAttribute("aria-controls", "nav-menu");

    mobileToggle.addEventListener("click", toggleMenu);

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = mobileToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle && navMenu.classList.contains("active")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navMenu.classList.contains("active")) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    window.addEventListener("scroll", setScrolledState, { passive: true });

    setScrolledState();
    setupReveal();
});