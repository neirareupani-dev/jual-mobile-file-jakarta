/* ===== PRELOADER ===== */
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    preloader.classList.add("fade-out");
    setTimeout(() => preloader.remove(), 650);
});

/* ===== HEADER / NAVIGATION ===== */
const header = document.getElementById("header");
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav-link");
const dropdowns = document.querySelectorAll(".dropdown");
const dropdownToggles = document.querySelectorAll(".drop-toggle");

function closeMobileNav() {
    navbar?.classList.remove("active");
    dropdowns.forEach(dropdown => dropdown.classList.remove("open"));
    document.body.classList.remove("nav-open");
}

function openMobileNav() {
    navbar?.classList.add("active");
    document.body.classList.add("nav-open");
}

navToggle?.addEventListener("click", event => {
    event.stopPropagation();
    if (navbar?.classList.contains("active")) {
        closeMobileNav();
    } else {
        openMobileNav();
    }
});

navClose?.addEventListener("click", closeMobileNav);

/* Dropdowns: on mobile, first click opens the submenu instead of closing the nav. */
dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const parent = toggle.closest(".dropdown");
        dropdowns.forEach(dropdown => {
            if (dropdown !== parent) dropdown.classList.remove("open");
        });
        parent?.classList.toggle("open");
    });
});

/* Close the mobile menu only for real navigation links. */
navLinks.forEach(link => {
    link.addEventListener("click", event => {
        if (link.classList.contains("drop-toggle")) return;

        const href = link.getAttribute("href");
        if (href && href.startsWith("#") && href !== "#") {
            closeMobileNav();
        }
    });
});

/* Close mobile navigation when clicking outside it. */
document.addEventListener("click", event => {
    if (
        window.innerWidth <= 768 &&
        navbar?.classList.contains("active") &&
        !navbar.contains(event.target) &&
        !navToggle?.contains(event.target)
    ) {
        closeMobileNav();
    }

    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) dropdown.classList.remove("open");
    });
});

/* ===== STICKY HEADER ===== */
function updateHeader() {
    header?.classList.toggle("scrolled", window.scrollY > 50);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* ===== SMOOTH SCROLLING ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
        const href = anchor.getAttribute("href");

        /* Do not hijack empty/hash-only links or dropdown triggers. */
        if (!href || href === "#" || anchor.classList.contains("drop-toggle")) return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        closeMobileNav();

        const headerHeight = header?.offsetHeight || 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

        window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "smooth"
        });
    });
});

/* ===== MODALS: PROBLEM / INDUSTRY / PRODUCT / INFORMATION ===== */
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalLabel = document.getElementById("modalLabel");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

function openModal(id) {
    if (!modalOverlay || !modalTitle || !modalBody) return;

    const source = document.querySelector(`[data-modal-id="${id}"]`);
    if (!source) return;

    modalLabel.textContent = source.dataset.label || "Informasi";
    modalTitle.textContent = source.dataset.title || "Detail";
    modalBody.innerHTML = source.innerHTML;

    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalClose?.focus();
}

function closeModal() {
    if (!modalOverlay) return;

    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        openModal(button.dataset.modal);
    });
});

modalClose?.addEventListener("click", closeModal);

modalOverlay?.addEventListener("click", event => {
    if (event.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
        if (window.innerWidth <= 768) closeMobileNav();
    }
});

/* ===== FAQ ACCORDION ===== */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question?.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        faqItems.forEach(other => other.classList.remove("active"));
        if (!isOpen) item.classList.add("active");
    });
});

/* ===== SCROLL ANIMATIONS ===== */
function prepareMotionElements() {
    document.querySelectorAll(".section-header").forEach(element => {
        element.setAttribute("data-reveal", "up");
    });

    document.querySelectorAll(".problem-item").forEach((item, index) => {
        item.setAttribute("data-reveal", "up");
        item.style.transitionDelay = `${index * 90}ms`;
    });

    document.querySelectorAll(".checklist-item").forEach((item, index) => {
        item.setAttribute("data-reveal", "up");
        item.style.transitionDelay = `${index * 85}ms`;
    });

    document.querySelectorAll(".choice-card:not(.industry-choice-card)").forEach((card, index) => {
        card.setAttribute("data-reveal", index % 2 === 0 ? "up" : "down");
        card.style.transitionDelay = `${index * 120}ms`;
    });

    document.querySelectorAll(".article-card").forEach((card, index) => {
        card.setAttribute("data-reveal", "up");
        card.style.transitionDelay = `${index * 110}ms`;
    });

    document.querySelectorAll(".faq-item").forEach((item, index) => {
        item.setAttribute("data-reveal", "up");
        item.style.transitionDelay = `${index * 75}ms`;
    });

    document.querySelectorAll(".cta-content").forEach(element => {
        element.setAttribute("data-reveal", "zoom");
    });

    document.querySelectorAll(".footer-col").forEach((item, index) => {
        item.setAttribute("data-reveal", "up");
        item.style.transitionDelay = `${index * 90}ms`;
    });
}

function initMotionObserver() {
    const revealElements = document.querySelectorAll(
        "[data-reveal], .industry-choice-card, .animate-on-scroll"
    );

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("is-visible", "in-view");
        });
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible", "in-view");
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.14,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => observer.observe(element));
}

prepareMotionElements();
initMotionObserver();

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll("section[id]");
const sectionLinks = document.querySelectorAll('.nav-link[href^="#"]:not(.drop-toggle)');

function setActiveNav() {
    if (!sections.length) return;

    const scrollPosition = window.scrollY + (header?.offsetHeight || 0) + 80;
    let currentId = sections[0].id;

    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop) currentId = section.id;
    });

    sectionLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
}

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById("backToTop");

function updateBackToTop() {
    backToTop?.classList.toggle("show", window.scrollY > 300);
    backToTop?.classList.toggle("hide", window.scrollY <= 300);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
