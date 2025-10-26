// Theme toggling
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Set initial theme state
const storedDarkMode = localStorage.getItem('darkMode');
const isDarkMode = storedDarkMode !== null ? storedDarkMode === 'true' : true; // Default to dark
if (storedDarkMode === null) localStorage.setItem('darkMode', 'true');
body.classList.toggle('dark-mode', isDarkMode);
body.classList.toggle('light-mode', !isDarkMode);
themeToggle.checked = isDarkMode;

themeToggle.addEventListener('change', () => {
    const isDark = themeToggle.checked;
    body.classList.toggle('dark-mode', isDark);
    body.classList.toggle('light-mode', !isDark);
    localStorage.setItem('darkMode', isDark);
});

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('show');
    }
});

// Active link highlighting
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
