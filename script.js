const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const scrollProgress = document.querySelector('.scroll-progress');

const updateScrollProgress = () => {
  if (!scrollProgress) {
    return;
  }

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const total = scrollHeight - clientHeight;
  const progress = total > 0 ? (scrollTop / total) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

const backToTop = document.querySelector('#back-to-top');

if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
  };

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const faqButtons = document.querySelectorAll('.faq-item button');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const answer = item.querySelector('.faq-answer');
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const symbol = button.querySelector('span');

    button.setAttribute('aria-expanded', String(!expanded));
    item.classList.toggle('open');

    if (answer) {
      if (!expanded) {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      } else {
        answer.style.maxHeight = '0px';
      }
    }

    if (symbol) {
      symbol.textContent = expanded ? '+' : '–';
    }
  });
});

const tocLinks = Array.from(document.querySelectorAll('.toc a'));

if (tocLinks.length > 0) {
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const id = entry.target.getAttribute('id');
          tocLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0.1,
      },
    );

    sections.forEach((section) => observer.observe(section));
  }
}
