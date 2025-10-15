// Mobile menu
const menuBtn = document.getElementById('menu');
const mobile = document.getElementById('mobile');

function closeMenu() {
    mobile.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
}
function toggleMenu() {
    const isOpen = mobile.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
}

if (menuBtn && mobile) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    mobile.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

    // Close on outside click (single global listener)
    document.addEventListener('click', (e) => {
        const inside = mobile.contains(e.target) || menuBtn.contains(e.target);
        if (!inside) closeMenu();
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}


// Scroll spy for static sections
const links = document.querySelectorAll('.links a');
const sections = Array.from(document.querySelectorAll('main section')).map(sec => ({ id: sec.id || 'home', el: sec }));
function setActive() {
    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].el.getBoundingClientRect();
        if (rect.top <= 120) idx = i;
    }
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + sections[idx].id));
}
window.addEventListener('scroll', setActive, { passive: true });
window.addEventListener('load', () => {
    setActive();
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) e.target.classList.add('visible');
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Email copy
const copyBtn = document.getElementById('copy');
if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
        const email = document.getElementById('email-text').textContent.trim();
        try {
            await navigator.clipboard.writeText(email);
            const prev = copyBtn.textContent; copyBtn.textContent = 'Copied';
            setTimeout(() => copyBtn.textContent = prev, 1200);
        } catch (_) { }
    });
}