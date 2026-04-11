// Renders social.html content from data/social.js
// Do not edit layout here — update data/social.js instead.

var ICONS = {
    ig: {
        iconClass: "platform-icon--ig",
        btnClass:  "cta-btn--ig",
        platformSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
        ctaSvg:     '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>'
    },
    fb: {
        iconClass: "platform-icon--fb",
        btnClass:  "cta-btn--fb",
        platformSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
        ctaSvg:     '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
    },
    yt: {
        iconClass: "platform-icon--yt",
        btnClass:  "cta-btn--yt",
        platformSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
        ctaSvg:     '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
    }
};

var ARROW_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>';

function renderSocial(data) {
    if (!data) return;

    var platformGrid = document.getElementById("platform-grid");
    if (platformGrid) {
        platformGrid.innerHTML = data.platforms.map(function(p) {
            var ico = ICONS[p.iconType] || ICONS.ig;
            return (
                '<a href="' + p.url + '" target="_blank" rel="noopener noreferrer" class="platform-card reveal">' +
                    '<div class="platform-icon ' + ico.iconClass + '">' + ico.platformSvg + '</div>' +
                    '<div class="platform-body">' +
                        '<h3>' + p.name + '</h3>' +
                        '<p class="platform-handle">' + p.handle + '</p>' +
                        '<p class="platform-desc">' + p.desc + '</p>' +
                    '</div>' +
                    '<div class="platform-cta">' +
                        '<span>' + p.ctaLabel + '</span>' +
                        ARROW_SVG +
                    '</div>' +
                '</a>'
            );
        }).join("");
    }

    var whyGrid = document.getElementById("why-grid");
    if (whyGrid) {
        whyGrid.innerHTML = data.whyCards.map(function(c) {
            return (
                '<div class="why-card reveal">' +
                    '<div class="why-icon">' + c.icon + '</div>' +
                    '<h3>' + c.title + '</h3>' +
                    '<p>' + c.desc + '</p>' +
                '</div>'
            );
        }).join("");
    }

    var ctaLinks = document.getElementById("cta-links");
    if (ctaLinks) {
        ctaLinks.innerHTML = data.platforms.map(function(p) {
            var ico = ICONS[p.iconType] || ICONS.ig;
            return (
                '<a href="' + p.url + '" target="_blank" rel="noopener noreferrer" class="cta-btn ' + ico.btnClass + '">' +
                    ico.ctaSvg +
                    p.name +
                '</a>'
            );
        }).join("");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Social data loaded async below

    var navbar  = document.getElementById("navbar");
    var hammy   = document.getElementById("hammy");
    var navMenu = document.getElementById("nav-menu");

    if (navbar) {
        window.addEventListener("scroll", function() {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        }, { passive: true });
    }

    if (hammy && navMenu) {
        hammy.addEventListener("click", function() {
            hammy.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });
        navMenu.querySelectorAll("a").forEach(function(link) {
            link.addEventListener("click", function() {
                hammy.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
            });
        });
    }

    // ── Load social data and render ──
    // Try window global first (works with file://), fall back to fetch
    var socialPromise = window.socialData
        ? Promise.resolve(window.socialData)
        : fetch("data/social.json").then(function(r) { return r.json(); });

    socialPromise
        .then(function(data) {
            renderSocial(data);
            if ("IntersectionObserver" in window) {
                var observer = new IntersectionObserver(function(entries, obs) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("active");
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.12 });
                document.querySelectorAll(".reveal").forEach(function(el) {
                    observer.observe(el);
                });
            } else {
                document.querySelectorAll(".reveal").forEach(function(el) {
                    el.classList.add("active");
                });
            }
        })
        .catch(function(err) {
            console.error("Could not load social data:", err);
        });
});
