/* ========================================================
   1. FAREYİ TAKİP EDEN YUMUŞAK ORTAM IŞIĞI (SPOTLIGHT)
======================================================== */
const spotlight = document.querySelector('.cursor-spotlight');

window.addEventListener('mousemove', (e) => {
  if (spotlight) {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  }
});

/* ========================================================
   2. CANLI DAKTİLO (TYPEWRITER) EFEKTİ
======================================================== */
const typewriterElement = document.getElementById('typewriter-text');
const words = [
  "Yazılım Mühendisliği Öğrencisi",
  "Android & Kotlin Geliştirici",
  "3D Tasarım & Modelleme (Blender)",
  "Modern Web & Arayüz Geliştirici",
  "İlişkisel Veritabanı (SQL)"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 90;
const deletingSpeed = 45;
const delayBetweenWords = 1800;

function typeEffect() {
  if (!typewriterElement) return;

  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = delayBetweenWords;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}
typeEffect();

/* ========================================================
   3. KAYDIRMA ANİMASYONLARI (SCROLL REVEAL)
======================================================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

/* ========================================================
   4. İNTERAKTİF PROJE FİLTRELEME
======================================================== */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-showcase');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.classList.remove('hide-card');
      } else {
        card.classList.add('hide-card');
      }
    });
  });
});

/* ========================================================
   5. TEMA DEĞİŞTİRME (AYDINLIK / KARANLIK)
======================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const savedTheme = localStorage.getItem('nujen-portfolio-theme');

const moonSvg = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
const sunSvg = `
  <circle cx="12" cy="12" r="5"></circle>
  <line x1="12" y1="1" x2="12" y2="3"></line>
  <line x1="12" y1="21" x2="12" y2="23"></line>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
  <line x1="1" y1="12" x2="3" y2="12"></line>
  <line x1="21" y1="12" x2="23" y2="12"></line>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
`;

if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeIcon.innerHTML = sunSvg;
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  themeIcon.innerHTML = moonSvg;
}

themeToggleBtn.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.innerHTML = moonSvg;
    localStorage.setItem('nujen-portfolio-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.innerHTML = sunSvg;
    localStorage.setItem('nujen-portfolio-theme', 'dark');
  }
});