// Moved out of an inline <script> in qualification.html so it runs under the site's
// Content-Security-Policy (script-src 'self' blocks inline scripts).

function centerLastRow() {
    const grid = document.querySelector('.badge-grid');
    const cards = document.querySelectorAll('.badge-card');

    if (!grid || cards.length === 0) return;

    // Reset previous positions
    cards.forEach(card => card.style.gridColumn = "");

    const gridWidth = grid.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const gap = 30; 

    const colsPerRow = Math.floor((gridWidth + gap) / (cardWidth + gap));
    const totalCards = cards.length;
    const leftover = totalCards % colsPerRow;

    // Only center if there are leftovers (like the 2 bottom cards)
    if (leftover > 0 && colsPerRow > leftover) {
        const firstLeftoverIndex = totalCards - leftover;
        const startCol = Math.floor((colsPerRow - leftover) / 2) + 1;
        cards[firstLeftoverIndex].style.gridColumnStart = startCol;
    }
    console.log("Grid Updated: Centered last row.");
}

// Mobile Menu Toggle Logic
const menuBtn = document.getElementById('hammy');
const menuLinks = document.getElementById('nav-menu');

if (menuBtn && menuLinks) {
    menuBtn.addEventListener('click', () => {
        menuLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        console.log("Menu Toggled");
    });
}

// Run on load and resize
window.addEventListener('load', centerLastRow);
window.addEventListener('resize', centerLastRow);
