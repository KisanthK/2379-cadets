// ── Render officers from data/officers.json ──

function renderOfficers(data) {
    var list = document.getElementById("officers-list");
    var staffGrid = document.getElementById("staff-grid");

    if (list && data.featured) {
        list.innerHTML = data.featured.map(function(o) {
            var photoClass = "officer-photo" + (o.extraPhotoClass ? " " + o.extraPhotoClass : "");
            var bioHtml = o.bio.split(/\n\n+/).filter(Boolean).map(function(p) {
                return "<p>" + p + "</p>";
            }).join("");
            var tagsHtml = (o.tags || []).map(function(t) {
                return '<span class="chip">' + t + "</span>";
            }).join("");
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
    }

    if (staffGrid && data.staff) {
        staffGrid.innerHTML = data.staff.map(function(s) {
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

function setupReveal() {
    var revealItems = document.querySelectorAll(".reveal");
    if (!revealItems.length) return;

    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        revealItems.forEach(function(item) { revealObserver.observe(item); });
    } else {
        revealItems.forEach(function(item) { item.classList.add("active"); });
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
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.setAttribute("aria-label", "Toggle navigation menu");
        mobileToggle.setAttribute("aria-controls", "nav-menu");

        mobileToggle.addEventListener("click", function() {
            var open = navMenu.classList.contains("active");
            mobileToggle.classList.toggle("active", !open);
            navMenu.classList.toggle("active", !open);
            document.body.classList.toggle("menu-open", !open);
            mobileToggle.setAttribute("aria-expanded", String(!open));
        });

        navMenu.querySelectorAll("a").forEach(function(link) {
            link.addEventListener("click", function() {
                mobileToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
                mobileToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", function(e) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains("active")) {
                mobileToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
                mobileToggle.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && navMenu.classList.contains("active")) {
                mobileToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
                mobileToggle.setAttribute("aria-expanded", "false");
            }
        });

        window.addEventListener("resize", function() {
            if (window.innerWidth > 768) {
                mobileToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
            }
        });
    }

    // ── Load data and render ──
    fetch("data/officers.json")
        .then(function(r) { return r.json(); })
        .then(function(data) {
            renderOfficers(data);
            setupReveal();
        })
        .catch(function(err) {
            console.error("Could not load officers data:", err);
        });
});
