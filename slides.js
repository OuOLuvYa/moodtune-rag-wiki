const deck = document.querySelector('#deck');
const slides = [...document.querySelectorAll('.slide')];
const counter = document.querySelector('#counter');
const progressBar = document.querySelector('#progressBar');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const overviewButton = document.querySelector('#overview');
const fullscreenButton = document.querySelector('#fullscreen');
let current = Math.max(0, slides.findIndex(slide => `#${slide.id}` === location.hash));
let overviewMode = false;

function showSlide(index, updateHash = true) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === current);
    slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
  });
  counter.textContent = `${current + 1} / ${slides.length}`;
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;
  document.title = `${slides[current].dataset.title}｜RAG 如何做心情歌單推薦`;
  if (updateHash) history.replaceState(null, '', `#${slides[current].id}`);
}

function move(delta) {
  if (overviewMode) toggleOverview(false);
  showSlide(current + delta);
}

function toggleOverview(force) {
  overviewMode = typeof force === 'boolean' ? force : !overviewMode;
  deck.classList.toggle('overview-mode', overviewMode);
  document.body.style.overflow = overviewMode ? 'auto' : 'hidden';
  overviewButton.textContent = overviewMode ? '返回' : '總覽';
  slides.forEach(slide => slide.setAttribute('aria-hidden', overviewMode ? 'false' : (slide.classList.contains('active') ? 'false' : 'true')));
}

prevButton.addEventListener('click', () => move(-1));
nextButton.addEventListener('click', () => move(1));
overviewButton.addEventListener('click', () => toggleOverview());
fullscreenButton.addEventListener('click', async () => {
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
  else await document.exitFullscreen?.();
});
slides.forEach((slide, index) => slide.addEventListener('click', () => {
  if (!overviewMode) return;
  current = index;
  toggleOverview(false);
  showSlide(current);
}));
window.addEventListener('hashchange', () => {
  const index = slides.findIndex(slide => `#${slide.id}` === location.hash);
  if (index >= 0) showSlide(index, false);
});
document.addEventListener('keydown', event => {
  if (['ArrowRight','PageDown',' '].includes(event.key)) { event.preventDefault(); move(1); }
  if (['ArrowLeft','PageUp'].includes(event.key)) { event.preventDefault(); move(-1); }
  if (event.key === 'Home') showSlide(0);
  if (event.key === 'End') showSlide(slides.length - 1);
  if (event.key.toLowerCase() === 'o') toggleOverview();
  if (event.key.toLowerCase() === 'f') fullscreenButton.click();
  if (event.key === 'Escape' && overviewMode) toggleOverview(false);
});
showSlide(current, false);

