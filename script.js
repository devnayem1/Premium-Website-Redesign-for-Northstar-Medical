/* PAGE ROUTING */
// Map: navIndex → sectionId (for scroll spy)
const NAV_SECTIONS = {
  0: 'hero',       // Home
  2: 'hiw',        // How It Works
  3: 'pricing',    // Pricing
  4: 'about',      // About Us (testimonials)
  5: 'faq',        // FAQ
  6: 'contact',    // Contact
};

function setNavActive(index){
  const links = document.querySelectorAll('#main-nav a');
  links.forEach(a => a.classList.remove('active'));
  if(index !== null && links[index]) links[index].classList.add('active');
}

function showPage(pageId){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if(target){ target.classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }
  if(pageId === 'home')     setNavActive(0);
  if(pageId === 'services') setNavActive(1);
  if(pageId === 'signin')   setNavActive(null);
  currentPage = pageId;
}

let currentPage = 'home';

function scrollToSection(id){
  if(currentPage !== 'home') showPage('home');
  setTimeout(()=>{
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  }, currentPage !== 'home' ? 80 : 10);
}

/* SCROLL SPY */
function runScrollSpy(){
  if(currentPage !== 'home') return;
  const offset = 120;
  const links = document.querySelectorAll('#main-nav a');
  let found = 0; // default = Home
  Object.entries(NAV_SECTIONS).forEach(([idx, secId]) => {
    const el = document.getElementById(secId);
    if(!el) return;
    const rect = el.getBoundingClientRect();
    if(rect.top <= offset) found = parseInt(idx);
  });
  links.forEach(a => a.classList.remove('active'));
  if(links[found]) links[found].classList.add('active');
}

/* HEADER SCROLL */
window.addEventListener('scroll', () => {
  document.getElementById('site-header').classList.toggle('scrolled', window.scrollY > 20);
  runScrollSpy();
});

/* MOBILE NAV */
function toggleMobileNav(){
  document.getElementById('main-nav').classList.toggle('mobile-open');
}
function closeMobileNav(){
  document.getElementById('main-nav').classList.remove('mobile-open');
}

/* THEME SWITCHER */
function toggleSwitcher(){
  document.getElementById('theme-switcher').classList.toggle('open');
}
function setTheme(n,el){
  document.documentElement.setAttribute('data-theme', n);
  document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
}
document.addEventListener('click', function(e){
  const sw = document.getElementById('theme-switcher');
  if(!sw.contains(e.target)) sw.classList.remove('open');
});

/* FAQ ACCORDION */
function toggleFaq(el){
  const item = el.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if(!wasOpen) item.classList.add('open');
}

/* SERVICE CARDS → navigate to services page */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => showPage('services'));
});

// Run spy on load
runScrollSpy();
