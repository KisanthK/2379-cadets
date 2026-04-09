// ============================================
// 2379 Burlington Army Cadets
// Shared JavaScript — Mobile Menu & Nav Scroll
// ============================================

// Mobile Menu Toggle
const menuBtn = document.getElementById('hammy');
const menuLinks = document.getElementById('nav-menu');

if (menuBtn && menuLinks) {
    menuBtn.addEventListener('click', () => {
        menuLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Close menu when a link is clicked
    menuLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Trigger on load in case page is already scrolled
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
}
