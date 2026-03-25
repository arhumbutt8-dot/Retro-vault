// Cart
let cartCount = 0;
const cartEl = document.querySelector('.cart-count');
const toast = document.getElementById('toast');

document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    cartEl.textContent = cartCount;
    showToast();
  });
});

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// Close nav on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const gameCards = document.querySelectorAll('.game-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    gameCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Contact form
function handleForm(e) {
  e.preventDefault();
  toast.textContent = '📨 Message sent!';
  showToast();
  e.target.reset();
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.style.borderBottomColor = window.scrollY > 50 ? 'var(--accent2)' : 'var(--accent)';
});
