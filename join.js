document.addEventListener("DOMContentLoaded", () => {
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