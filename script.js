// ── Render training schedule from data/schedule.json ──
function renderSchedule(s) {
    var card = document.getElementById("schedule-card");
    if (!card || !s) return;
    var btn = card.querySelector(".btn-primary-cta");

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

function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if ("IntersectionObserver" in window) {
        var obs = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
        items.forEach(function(item) { obs.observe(item); });
    } else {
        items.forEach(function(item) { item.classList.add("active"); });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.getElementById("navbar");
    var mobileToggle = document.getElementById("hammy");
    var navMenu = document.getElementById("nav-menu");

    // ── Navbar scroll ──
    if (navbar) {
        window.addEventListener("scroll", function() {
            navbar.classList.toggle("scrolled", window.scrollY > 20);
        }, { passive: true });
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    }

    // ── Mobile menu ──
    if (mobileToggle && navMenu) {
        var navLinks = navMenu.querySelectorAll("a");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.setAttribute("aria-label", "Toggle navigation menu");
        mobileToggle.setAttribute("aria-controls", "nav-menu");

        function closeMenu() {
            mobileToggle.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
            mobileToggle.setAttribute("aria-expanded", "false");
        }

        mobileToggle.addEventListener("click", function() {
            var open = navMenu.classList.contains("active");
            mobileToggle.classList.toggle("active", !open);
            navMenu.classList.toggle("active", !open);
            document.body.classList.toggle("menu-open", !open);
            mobileToggle.setAttribute("aria-expanded", String(!open));
        });

        navLinks.forEach(function(link) { link.addEventListener("click", closeMenu); });

        document.addEventListener("click", function(e) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains("active")) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && navMenu.classList.contains("active")) closeMenu();
        });

        window.addEventListener("resize", function() {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    // ── Load data and render (both in parallel) ──
    Promise.all([
        fetch("data/schedule.json").then(function(r) { return r.json(); }),
        fetch("data/sponsors.json").then(function(r) { return r.json(); })
    ]).then(function(results) {
        renderSchedule(results[0]);
        renderSponsors(results[1]);
        setupReveal();
    }).catch(function(err) {
        console.error("Could not load homepage data:", err);
    });
});