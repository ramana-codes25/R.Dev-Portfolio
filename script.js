/* ── Custom Cursor ── */
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

if (window.innerWidth > 768) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .skill-card, .project-card, .stat-card')
    .forEach(el => {
      el.addEventListener('mouseenter', () => {
        cur.style.transform  = 'translate(-50%,-50%) scale(2.4)';
        ring.style.transform = 'translate(-50%,-50%) scale(1.4)';
      });
      el.addEventListener('mouseleave', () => {
        cur.style.transform  = 'translate(-50%,-50%) scale(1)';
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });

} else {
  cur.style.display = 'none';
  ring.style.display = 'none';
}

/* ── Navbar scroll ── */
const nav = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const compact = window.scrollY > 60;
  const mob = window.innerWidth <= 768;

  nav.style.padding = compact
    ? (mob ? '11px 22px' : '12px 60px')
    : (mob ? '15px 22px' : '20px 60px');
});

/* ── Navbar toggle FIX ── */
document.addEventListener('DOMContentLoaded', () => {

  const navToggle  = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    navToggle.classList.add('open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function toggleMenu(e) {
    e.preventDefault();
    navToggle.classList.contains('open') ? closeMenu() : openMenu();
  }

  // ✅ FIXED EVENTS
  navToggle.addEventListener('click', toggleMenu);
  navToggle.addEventListener('touchstart', toggleMenu);

  document.querySelectorAll('.ovl-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

});

/* ── Reveal animation ── */
const revealEls = document.querySelectorAll(
  'section .reveal, section .tl-item, section .skill-card, footer .reveal'
);

revealEls.forEach(el => el.classList.add('will-animate'));

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('will-animate');
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => io.observe(el));

/* ── Typed text ── */
const roles = [
  // 'Fullstack Developer',
  
  
];

let ri = 0, ci = 0, del = false;
const tl = document.getElementById('typedLine');

function type() {
  const word = roles[ri];

  if (!del) {
    tl.textContent = word.slice(0, ci + 1) + (ci < word.length - 1 ? '|' : '');
    ci++;
    if (ci === word.length) {
      del = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    tl.textContent = word.slice(0, ci - 1) + '|';
    ci--;
    if (ci === 0) {
      del = false;
      ri = (ri + 1) % roles.length;
    }
  }

  setTimeout(type, del ? 55 : 95);
}

setTimeout(type, 1900);

/* ── Timeline delay ── */
document.querySelectorAll('.tl-item').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.18) + 's';
});

/* ── Contact Form ── */
document.getElementById('sendBtn').addEventListener('click', async function () {

  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const message = document.getElementById('senderMessage').value.trim();
  const feedback = document.getElementById('formFeedback');
  const btn = this;

  feedback.className = 'form-feedback';
  feedback.textContent = '';

  if (!name || !email || !message) {
    feedback.textContent = 'Fill all fields';
    feedback.className = 'form-feedback error';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'YOUR_KEY',
        name, email, message
      })
    });

    const data = await res.json();

    if (data.success) {
      feedback.textContent = 'Message sent ✓';
      feedback.className = 'form-feedback success';
    } else throw new Error();

  } catch {
    feedback.textContent = 'Failed ✗';
    feedback.className = 'form-feedback error';
  }

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Send Message →';
  }, 3000);

});