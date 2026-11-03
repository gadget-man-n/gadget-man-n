(() => {
  const main = document.querySelector('main');
  if (!main) return;
  const loader = document.createElement('div');
  loader.className = 'page-loading';
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-label', '読み込み中');
  loader.innerHTML = '<span class="sr-only">読み込み中</span><div aria-hidden="true"><div class="skeleton-nav shimmer"></div><div class="skeleton-layout"><div><div class="skeleton-title shimmer"></div><div class="skeleton-line shimmer"></div><div class="skeleton-line shimmer"></div><div class="skeleton-button shimmer"></div></div><div class="skeleton-preview shimmer"></div></div><div class="skeleton-blocks"><div class="skeleton-block shimmer"></div><div class="skeleton-block shimmer"></div></div></div>';
  document.body.appendChild(loader);
  main.setAttribute('aria-busy', 'true');
  const images = Array.from(document.images, image => image.decode().catch(() => {}));
  Promise.all([...images, document.fonts.ready]).finally(() => {
    main.removeAttribute('aria-busy');
    loader.classList.add('loaded');
    loader.setAttribute('aria-hidden', 'true');
    loader.addEventListener('transitionend', () => loader.remove(), {once: true});
    setTimeout(() => loader.remove(), 350);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) loader.remove();
  });
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    }, {threshold: 0.08});
    document.querySelectorAll('.hero, main > section, .steps li').forEach(element => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  }
})();
