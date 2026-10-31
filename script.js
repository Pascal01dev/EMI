document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobileNav');
    const savedTheme = localStorage.getItem('emi-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');

    document.documentElement.dataset.theme = initialTheme;

    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.type = 'button';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-gear" aria-hidden="true"></i><span>Light mode</span>';

    const updateThemeToggle = () => {
        const isLight = document.documentElement.dataset.theme === 'light';
        themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
        themeToggle.innerHTML = `<i class="fa-solid fa-gear" aria-hidden="true"></i><span>${isLight ? 'Dark mode' : 'Light mode'}</span>`;
    };

    themeToggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem('emi-theme', nextTheme);
        updateThemeToggle();
    });

    const placeThemeToggle = () => {
        const desktopHeader = document.querySelector('.desktop-header .head');
        const isMobile = window.matchMedia('(max-width: 992px)').matches;
        (isMobile ? document.body : desktopHeader)?.appendChild(themeToggle);
    };

    placeThemeToggle();
    window.addEventListener('resize', placeThemeToggle);
    updateThemeToggle();

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }
});