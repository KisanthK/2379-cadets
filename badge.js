// Moved out of an inline <script> in badge.html so it runs under the site's
// Content-Security-Policy (script-src 'self' blocks inline scripts).

const hammy = document.getElementById('hammy');
const menu = document.getElementById('nav-menu');
hammy.addEventListener('click', () => {
    hammy.classList.toggle('active');
    menu.classList.toggle('active');
});
