function renderInfoBlocks(blocks) {
    var grid = document.getElementById("info-blocks-grid");
    if (!grid || !blocks) return;

    var rows = [];
    for (var i = 0; i < blocks.length; i += 3) {
        var rowItems = blocks.slice(i, i + 3).map(function(b) {
            return (
                '<div class="info-block">' +
                    '<div class="block-icon">' + b.icon + '</div>' +
                    '<h3>' + b.title + '</h3>' +
                    '<p>' + b.description + '</p>' +
                '</div>'
            );
        }).join("");
        rows.push('<div class="grid-3">' + rowItems + '</div>');
    }
    grid.innerHTML = rows.join("");
}

function renderPortalCards(cards) {
    var grid = document.getElementById("portal-cards-grid");
    if (!grid || !cards) return;

    grid.innerHTML = cards.map(function(c) {
        return (
            '<div class="glass-card reveal">' +
                '<div class="card-status">' + c.status + '</div>' +
                '<div class="card-main-content">' +
                    '<div class="icon-box-modern">' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
                            '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>' +
                            '<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' +
                        '</svg>' +
                    '</div>' +
                    '<div class="text-content">' +
                        '<h3>' + c.title + '</h3>' +
                        '<p>' + c.description + '</p>' +
                    '</div>' +
                '</div>' +
                '<div class="card-footer">' +
                    '<a href="' + c.linkUrl + '" class="pro-link-modern">' + c.linkLabel + ' <span>→</span></a>' +
                '</div>' +
            '</div>'
        );
    }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/resources.json")
        .then(function(r) { return r.json(); })
        .then(function(data) {
            renderInfoBlocks(data.infoBlocks);
            renderPortalCards(data.portalCards);
            document.querySelectorAll(".info-block, .glass-card, .reveal").forEach(function(el) {
                el.classList.add("active");
            });
        })
        .catch(function(err) { console.error("Could not load resources data:", err); });

    const navbar = document.getElementById("navbar");
    const mobileToggle = document.getElementById("hammy");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = navMenu ? navMenu.querySelectorAll("a") : [];
    const revealItems = document.querySelectorAll(".schedule-item");

    if (!navbar || !mobileToggle || !navMenu) return;

    const setScrolledState = () => {
        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    const openMenu = () => {
        mobileToggle.classList.add("active");
        navMenu.classList.add("active");
        document.body.style.overflow = "hidden";
        mobileToggle.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
        mobileToggle.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
        if (navMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.setAttribute("aria-label", "Toggle navigation menu");

    mobileToggle.addEventListener("click", toggleMenu);

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
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

    window.addEventListener("scroll", setScrolledState, { passive: true });
    setScrolledState();
});