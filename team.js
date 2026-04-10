// Renders team.html content from data/officers.js
// Do not edit layout here — update data/officers.js instead.

var PERSON_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">' +
        '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>' +
        '<circle cx="12" cy="7" r="4"/>' +
    '</svg>';

var PERSON_SVG_SM =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
        '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>' +
        '<circle cx="12" cy="7" r="4"/>' +
    '</svg>';

function roleAbbr(role) {
    if (/civilian instructor/i.test(role)) return "CI";
    if (/civilian volunteer/i.test(role)) return "CV";
    return role.split(/\s+/).map(function(w) { return w[0]; }).join("").toUpperCase();
}

function renderTeam(data) {
    if (!data) return;

    var profilesList = document.getElementById("profiles-list");
    if (profilesList && data.featured) {
        profilesList.innerHTML = data.featured.map(function(o) {
            var photoHtml = o.photo
                ? '<img src="' + o.photo + '" alt="' + o.photoAlt + '" style="width:180px;height:220px;object-fit:cover;border-radius:12px;">'
                : '<div class="image-placeholder">' + PERSON_SVG + '<span>Photo</span></div>';

            var bioHtml = o.bio.split(/\n\n+/).filter(Boolean).map(function(p) { return "<p>" + p + "</p>"; }).join("");

            return (
                '<article class="profile-card featured">' +
                    '<div class="profile-image">' + photoHtml + '</div>' +
                    '<div class="profile-content">' +
                        '<div class="rank-badge">' + o.rank + '</div>' +
                        '<h2>' + o.name + '</h2>' +
                        bioHtml +
                    '</div>' +
                '</article>'
            );
        }).join("");
    }

    var staffCards = document.getElementById("staff-cards");
    if (staffCards && data.staff) {
        staffCards.innerHTML = data.staff.map(function(s) {
            return (
                '<div class="staff-card">' +
                    '<div class="staff-icon">' + PERSON_SVG_SM + '</div>' +
                    '<h3>' + s.name + '</h3>' +
                    '<span class="role-tag">' + roleAbbr(s.role) + '</span>' +
                '</div>'
            );
        }).join("");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fetch("data/officers.json")
        .then(function(r) { return r.json(); })
        .then(function(data) { renderTeam(data); })
        .catch(function(err) { console.error("Could not load officers data:", err); });

    var navbar  = document.getElementById("navbar");
    var hammy   = document.getElementById("hammy");
    var navMenu = document.getElementById("nav-menu");

    if (navbar) {
        window.addEventListener("scroll", function() {
            navbar.classList.toggle("scrolled", window.scrollY > 20);
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
});
