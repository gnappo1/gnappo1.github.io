// Writing list + post rendering into a modal
const DATA_URL = 'data/writing.json';
const POST_URL = (slug) => `posts/${slug}.md`;

async function renderWritingList() {
    const list = document.getElementById('writing-list');
    if (!list) return;
    list.innerHTML = '<div class="post"><div class="left"><span class="title">Loading…</span></div></div>';
    try {
        const res = await fetch(DATA_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error(res.status);
        const items = await res.json();
        list.innerHTML = items.map(it => (
            `<a class="post" href="#/post/${it.slug}">
        <div class="left">
          <span class="title">${it.title}</span>
          <span class="series">${it.subtitle || ''}</span>
        </div>
        <span class="meta">${it.series || (it.tags ? it.tags.join(' • ') : '')}</span>
      </a>`
        )).join('');
    } catch {
        list.innerHTML = '<div class="post"><div class="left"><span class="title">Could not load posts</span></div></div>';
    }
}

// ---- Modal controls ----
const modal = document.getElementById('post-modal');
const backdrop = document.getElementById('modal-backdrop');
const mTitle = document.getElementById('modal-title');
const mMeta = document.getElementById('modal-meta');
const mContent = document.getElementById('modal-content');
const mClose = document.getElementById('modal-close');

function openModal() {
    document.body.classList.add('modal-open');
    modal.hidden = false; backdrop.hidden = false;
    requestAnimationFrame(() => { modal.classList.add('open'); backdrop.classList.add('open'); });
}
function closeModal() {
    modal.classList.remove('open'); backdrop.classList.remove('open');
    document.body.classList.remove('modal-open');
    setTimeout(() => { modal.hidden = true; backdrop.hidden = true; }, 150);
}

[mClose, backdrop].forEach(el => el.addEventListener('click', () => {
    closeModal();
    if (location.hash.startsWith('#/post/')) history.pushState({}, '', '#/writing');
}));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
        if (location.hash.startsWith('#/post/')) history.pushState({}, '', '#/writing');
    }
});

// ---- Render a post into the modal ----
async function renderPost(slug) {
    try {
        const idxRes = await fetch(DATA_URL, { cache: 'no-store' });
        if (!idxRes.ok) throw new Error(idxRes.status);
        const idx = await idxRes.json();
        const item = idx.find(x => x.slug === slug);

        mTitle.textContent = item?.title || slug;
        mMeta.textContent = item?.subtitle || '';

        const mdRes = await fetch(POST_URL(slug), { cache: 'no-store' });
        if (!mdRes.ok) throw new Error(mdRes.status);
        const md = await mdRes.text();

        // Render Markdown (allow raw HTML for embeds)
        mContent.innerHTML = window.marked ? window.marked.parse(md) : `<pre>${md}</pre>`;

        // syntax highlight if Prism present
        if (window.Prism) Prism.highlightAllUnder(mContent);

        openModal();
    } catch (err) {
        mTitle.textContent = 'Post not found';
        mMeta.textContent = '';
        mContent.textContent = '';
        openModal();
    }
}

// Expose for router
window.renderWritingList = renderWritingList;
window.renderPost = renderPost;
