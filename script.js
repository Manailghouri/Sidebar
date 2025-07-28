const body = document.querySelector('body');
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.toggle');
const modeSwitch = document.querySelector('.toggle-switch');
const modeText = document.querySelector('.mode-text');
const moonSun = document.querySelector('.moon-sun');
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileOverlay = document.querySelector('.mobile-overlay');

// Desktop sidebar toggle
if (toggle) {
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('close');
    });
}

// Mobile sidebar toggle
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        mobileOverlay.classList.toggle('active');
        body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : 'auto';
    });
}

// Close sidebar when clicking overlay
if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        mobileOverlay.classList.remove('active');
        body.style.overflow = 'auto';
    });
}

// Dark mode toggle - both switch and icon clickable
[modeSwitch, moonSun].forEach(el => {
    if (el) {
        el.addEventListener('click', () => {
            body.classList.toggle('dark');
            
            // Update mode text
            if (modeText) {
                modeText.innerText = body.classList.contains('dark') ? "Light mode" : "Dark mode";
            }
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', body.classList.contains('dark'));
        });
    }
});

// Load saved dark mode preference
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode === 'true') {
        body.classList.add('dark');
        if (modeText) {
            modeText.innerText = "Light mode";
        }
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
        mobileOverlay.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Navigation link active state
const navLinks = document.querySelectorAll('.nav-link a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
    });
});

// Close mobile sidebar when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
            mobileOverlay.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });
});

// Smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';