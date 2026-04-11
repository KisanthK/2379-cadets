// ── Render officers from data/officers.js ──
function renderOfficers() {
    const list = document.getElementById("officers-list");
    const staffGrid = document.getElementById("staff-grid");
    if (!list || !window.officersData) return;

    list.innerHTML = window.officersData.featured.map(function(o) {
        var photoClass = "officer-photo" + (o.extraPhotoClass ? " " + o.extraPhotoClass : "");
        var bioHtml = o.bio.map(function(p) { return "<p>" + p + "</p>"; }).join("");
        var tagsHtml = o.tags.map(function(t) { return '<span class="chip">' + t + "</span>"; }).join("");
        return (
            '<article class="officer-card officer-card--featured reveal">' +
                '<div class="officer-accent"></div>' +
                '<div class="officer-photo-wrap">' +
                    '<img src="' + o.photo + '" alt="' + o.photoAlt + '" class="' + photoClass + '">' +
                '</div>' +
                '<div class="officer-body">' +
                    '<div class="officer-rank-badge">' + o.rank + '</div>' +
                    '<h3>' + o.name + '</h3>' +
                    bioHtml +
                    '<div class="officer-tags">' + tagsHtml + '</div>' +
                '</div>' +
            '</article>'
        );
    }).join("");

    if (staffGrid && window.officersData.staff) {
        staffGrid.innerHTML = window.officersData.staff.map(function(s) {
            return (
                '<div class="staff-card">' +
                    '<div class="staff-icon">\uD83C\uDF96\uFE0F</div>' +
                    '<h4>' + s.name + '</h4>' +
                    '<p>' + s.role + '</p>' +
                '</div>'
            );
        }).join("");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderOfficers();
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