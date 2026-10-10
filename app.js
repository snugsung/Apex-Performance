const views = document.querySelectorAll('.view');
const links = document.querySelectorAll('[data-view]');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('primaryNav');
const searchForm = document.getElementById('siteSearch');
const searchInput = document.getElementById('searchInput');

function showView(viewId) {
  views.forEach(view => {
    view.classList.toggle('active', view.id === viewId);
  });

  links.forEach(link => {
    link.classList.toggle('active-link', link.dataset.view === viewId);
  });

  if (nav) {
    nav.classList.remove('open');
  }

  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  window.location.hash = viewId;
  document.getElementById('main-content').focus();
}

links.forEach(link => {
  link.addEventListener('click', event => {
    const viewId = link.dataset.view;
    if (!viewId) return;
    event.preventDefault();
    showView(viewId);
  });
});

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const searchMap = {
  classes: ['class', 'classes', 'schedule', 'availability', 'waitlist', 'yoga', 'pilates', 'weightlifting', 'hiit', 'zumba'],
  membership: ['membership', 'memberships', 'discount', 'discounts', 'educators', 'retirees', 'military', 'first responders'],
  about: ['about', 'wendy', 'rader', 'employee', 'employees', 'location', 'phone', 'contact'],
  account: ['account', 'billing', 'payment', 'payments', 'late', 'on time', 'member', 'cancellation', 'cancellations'],
  home: ['home']
};

if (searchForm) {
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      showView('home');
      return;
    }

    let matchedView = 'home';

    for (const [viewId, terms] of Object.entries(searchMap)) {
      if (terms.some(term => query.includes(term))) {
        matchedView = viewId;
        break;
      }
    }

    showView(matchedView);
  });
}

if (window.location.hash) {
  const target = window.location.hash.replace('#', '');
  if ([...views].some(view => view.id === target)) {
    showView(target);
  }
}
