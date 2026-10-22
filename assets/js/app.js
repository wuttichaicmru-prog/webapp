'use strict';
(() => {
  const button = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const setMenu = open => {
    menu.classList.toggle('hidden', !open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู');
  };
  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (!document.getElementById('navbar').contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setMenu(false); button.focus();
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', () => setMenu(false));
  document.getElementById('current-year').textContent = new Date().getFullYear();
  const settings = window.BB_SETTINGS || {};
  let hasSocial = false;
  document.querySelectorAll('[data-social]').forEach(link => {
    const value = settings[link.dataset.social + 'Url'];
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:') return;
      link.href = url.href; link.hidden = false; hasSocial = true;
    } catch (_) { /* Unconfigured links stay hidden. */ }
  });
  document.getElementById('social-section').hidden = !hasSocial;
  const viewer = document.getElementById('photo-viewer');
  const links = [...document.querySelectorAll('[data-lightbox]')];
  let current = 0;
  let trigger = null;
  const display = index => {
    current = (index + links.length) % links.length;
    const link = links[current];
    const img = document.getElementById('viewer-image');
    img.src = link.href; img.alt = link.querySelector('img').alt;
    document.getElementById('viewer-caption').textContent = img.alt;
    document.getElementById('photo-count').textContent = `${current + 1} / ${links.length}`;
  };
  if (typeof viewer.showModal === 'function') {
    links.forEach((link, index) => link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); trigger = link; display(index); viewer.showModal();
      document.body.classList.add('lightbox-open');
      document.getElementById('photo-close').focus();
    }));
    document.getElementById('photo-prev').addEventListener('click', () => display(current - 1));
    document.getElementById('photo-next').addEventListener('click', () => display(current + 1));
    document.getElementById('photo-close').addEventListener('click', () => viewer.close());
    viewer.addEventListener('close', () => {
      document.body.classList.remove('lightbox-open');
      if (trigger) trigger.focus();
    });
    viewer.addEventListener('click', event => {
      const r = viewer.getBoundingClientRect();
      if (event.target === viewer && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) viewer.close();
    });
    viewer.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); display(current - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); display(current + 1); }
    });
  }
})();
