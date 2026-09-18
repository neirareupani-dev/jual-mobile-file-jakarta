// ===== PRELOADER =====
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 600);
});

// ===== HEADER SCROLL & STICKY =====
const header = document.getElementById('header');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== MOBILE NAVIGATION TOGGLE =====
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navbar.classList.add('active');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

// ===== DROPDOWN TOGGLE (Mobile) =====
const dropdownToggles = document.querySelectorAll('.drop-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('open');
        }
    });
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => {
            i.classList.remove('active');
        });
        if (!isOpen) {
            item.classList.add('active');
        }
    });
});

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
};

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            animateObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => {
    animateObserver.observe(el);
});

// ===== NAVBAR HIGHLIGHT ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function setActiveNav() {
    let index = sections.length;
    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
    navItems.forEach((link) => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[href="#${sections[index]?.id}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

setActiveNav();
window.addEventListener('scroll', setActiveNav);

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    if (!backToTop) return;

    if (window.scrollY > 300) {
        backToTop.classList.add('show');
        backToTop.classList.remove('hide');
    } else {
        backToTop.classList.remove('show');
        backToTop.classList.add('hide');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hide on click
    backToTop.addEventListener('click', () => {
        setTimeout(() => {
            backToTop.classList.remove('show');
            backToTop.classList.add('hide');
        }, 500);
    });
}

// ===== FAQ ANIMATION ON SCROLL =====
const faqObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            faqObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.faq-item').forEach(item => {
    faqObserver.observe(item);
});

// ===== CLOSE DROPDOWN ON CLICK OUTSIDE =====
document.addEventListener('click', function (e) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
        if (!drop.contains(e.target)) {
            drop.classList.remove('open');
        }
    });
});
