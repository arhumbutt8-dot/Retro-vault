// Cart
let cartCount = 0;
const cartEl = document.querySelector('.cart-count');
const toast = document.getElementById('toast');

// Recently Viewed — React Component
const { useState, useEffect } = React;

function RecentlyViewed() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    window.addRecentlyViewed = (name, platform, price) => {
      setItems(prev => {
        const filtered = prev.filter(i => i.name !== name);
        return [{ name, platform, price }, ...filtered].slice(0, 5);
      });
    };
  }, []);

  if (items.length === 0) return null;

  const platformColors = {
    nes:     'bg-red-600',
    snes:    'bg-purple-700',
    n64:     'bg-green-700',
    gb:      'bg-blue-600',
    sega:    'bg-blue-800',
    console: 'bg-gray-600',
  };

  return React.createElement('section', { className: 'py-16 px-8 border-t border-gray-800 max-w-6xl mx-auto' },
    React.createElement('h2', {
      className: 'text-center text-yellow-400 tracking-widest mb-10 text-sm uppercase font-bold'
    }, '🕐 Recently Viewed'),
    React.createElement('div', { className: 'flex flex-wrap gap-4 justify-center' },
      items.map((item, i) =>
        React.createElement('div', {
          key: i,
          className: 'bg-gray-900 border border-gray-700 hover:border-cyan-400 transition-colors duration-200 p-4 rounded min-w-[160px] flex flex-col gap-2'
        },
          React.createElement('span', {
            className: `text-white text-xs font-bold px-2 py-1 rounded w-fit ${platformColors[item.platform.toLowerCase()] || 'bg-gray-600'}`
          }, item.platform),
          React.createElement('p', { className: 'text-white text-sm font-semibold' }, item.name),
          React.createElement('span', { className: 'text-green-400 font-bold text-base' }, item.price)
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('recently-viewed-root'))
  .render(React.createElement(RecentlyViewed));

document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    cartEl.textContent = cartCount;
    showToast();

    // Track recently viewed
    const card = btn.closest('.game-card, .featured-card, .console-card');
    if (card) {
      const name = card.querySelector('h3, h4')?.textContent?.trim() || 'Unknown';
      const platform = card.querySelector('.platform-tag')?.textContent?.trim() || 'Console';
      const price = card.querySelector('.price')?.textContent?.trim() || '';
      if (window.addRecentlyViewed) window.addRecentlyViewed(name, platform, price);
    }
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
