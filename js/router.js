// Minimal hash router with modal-friendly behavior
function showView(id) {
    document.querySelectorAll('[data-router="view"]').forEach(sec => sec.hidden = true);
    const el = document.getElementById(id);
    if (el) el.hidden = false;
}

function handleRoute() {
    const h = location.hash;
    if (h.startsWith('#/post/')) {
        const slug = h.split('/')[2];
        showView('writing');
        if (slug) window.renderPost(slug);
        return;
    }
    if (h === '#/writing') {
        showView('writing');
        window.renderWritingList();
        return;
    }

    showView('home');
}

// window.addEventListener('hashchange', handleRoute);
// window.addEventListener('load', handleRoute);
  