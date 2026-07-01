// ===== Covered in His Glory — shared scripts =====

// Scroll reveal
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !reveals.length) {
    reveals.forEach((el) => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach((el) => obs.observe(el));
})();

// Toast
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove('show'), 3600);
}

// Mobile drawer
function openDrawer() {
  const d = document.getElementById('mobileDrawer');
  if (d) d.classList.add('open');
}
function closeDrawer() {
  const d = document.getElementById('mobileDrawer');
  if (d) d.classList.remove('open');
}
document.addEventListener('click', (e) => {
  const d = document.getElementById('mobileDrawer');
  if (d && d.classList.contains('open') && e.target === d) closeDrawer();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
});

// Prayer tabs
function switchPrayerTab(which) {
  const tabs = document.querySelectorAll('.prayer-tab');
  if (!tabs.length) return;
  tabs.forEach((t) => t.classList.remove('active'));
  const priv = document.getElementById('panel-private');
  const pub = document.getElementById('panel-public');
  if (which === 'private') {
    tabs[0].classList.add('active');
    if (priv) priv.style.display = 'block';
    if (pub) pub.style.display = 'none';
  } else {
    tabs[1].classList.add('active');
    if (pub) pub.style.display = 'block';
    if (priv) priv.style.display = 'none';
  }
}

// Prayer wall "I'm praying for this" counter
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.wall-pray-btn');
  if (!btn || btn.dataset.prayed === '1') return;
  btn.dataset.prayed = '1';
  const countEl = btn.querySelector('.count');
  if (countEl) {
    const m = countEl.textContent.match(/\d+/);
    const n = m ? parseInt(m[0], 10) + 1 : 1;
    countEl.textContent = '— ' + n + ' praying';
  }
  btn.style.opacity = '0.7';
});

/*
  Form handling via Formspree.
  Each <form data-formspree> should have its action set to your Formspree
  endpoint, e.g. action="https://formspree.io/f/xxxxxxxx".
  Until real endpoints are added (still containing PLACEHOLDER), the form
  shows the confirmation toast without sending, so the site works immediately.
*/
function handleFormSubmit(e) {
  const form = e.target;
  e.preventDefault();

  const successMsg = form.getAttribute('data-success') ||
    "Thank you — your message has been received. 🌿";
  const action = form.getAttribute('action') || '';

  // Honeypot: if filled, silently ignore (bot).
  const hp = form.querySelector('input[name="_gotcha"]');
  if (hp && hp.value) { form.reset(); return; }

  // If no real endpoint yet, just confirm locally.
  if (!action || action.indexOf('PLACEHOLDER') !== -1) {
    form.reset();
    showToast(successMsg);
    return;
  }

  const btn = form.querySelector('.form-submit, button[type="submit"]');
  const originalText = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

  fetch(action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' },
  })
    .then((res) => {
      if (res.ok) {
        form.reset();
        showToast(successMsg);
      } else {
        showToast('Something went wrong — please try again or email us directly.');
      }
    })
    .catch(() => {
      showToast('Something went wrong — please try again or email us directly.');
    })
    .finally(() => {
      if (btn) { btn.disabled = false; btn.textContent = originalText; }
    });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-formspree]').forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
  });
});
