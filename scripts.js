// Navigation, hover, click animations, modal, and section reveal
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id], main section.panel');
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('.nav');

  // Mobile toggle
  if(hamburger){
    hamburger.addEventListener('click', () => nav.classList.toggle('open'));
    hamburger.addEventListener('keydown', e => { if(e.key === 'Enter') nav.classList.toggle('open'); });
  }

  // Smooth scroll + click pulse
  function clickPulse(el){
    el.animate([{transform:'scale(1)'},{transform:'scale(.98)'},{transform:'scale(1)'}],{duration:260,easing:'ease-out'});
  }
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const targetId = a.dataset.target;
      const target = document.getElementById(targetId);
      if(!target) return;
      clickPulse(a);
      target.scrollIntoView({behavior:'smooth',block:'start'});
      // set active
      navLinks.forEach(n => n.classList.remove('active'));
      a.classList.add('active');
      nav.classList.remove('open');
    });
  });

  // IntersectionObserver for reveal and active nav
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector('.nav-link[data-target="'+id+'"]');
      if(entry.isIntersecting){
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
        if(link) link.classList.add('active');
        entry.target.classList.add('visible');
      }
    });
  }, {threshold:0.28});
  document.querySelectorAll('main section').forEach(s => io.observe(s));

  // Hero circle rotation and pointer parallax
  const circleInner = document.getElementById('circleInner');
  let rot = 0;
  function rotateLoop(){ rot = (rot + 0.12) % 360; if(circleInner) circleInner.style.transform = 'rotate(' + rot + 'deg)'; requestAnimationFrame(rotateLoop); }
  rotateLoop();
  const circleWrap = document.getElementById('circleWrap');
  if(circleWrap){
    circleWrap.addEventListener('mousemove', e => {
      const rect = circleWrap.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width;
      const dy = (e.clientY - (rect.top + rect.height/2)) / rect.height;
      circleInner.style.transform = `rotate(${rot}deg) translate(${dx*6}px, ${dy*6}px) scale(1.01)`;
    });
    circleWrap.addEventListener('mouseleave', () => circleInner.style.transform = `rotate(${rot}deg) scale(1)`);
  }

  // Portfolio quick modal and open project page
  const grid = document.getElementById('portfolioGrid');
  const modal = document.getElementById('quickModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const openProject = document.getElementById('openProject');
  const modalClose = document.getElementById('modalClose');

  if(grid){
    grid.addEventListener('click', e => {
      const card = e.target.closest('.card');
      if(!card) return;
      modalImg.src = card.dataset.img;
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      openProject.href = card.dataset.page || '#';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    });
  }
  if(modalClose) modalClose.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
  function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }

  // Mini thumb open video in modal (simple)
  document.querySelectorAll('.mini-thumb').forEach(t => {
    t.addEventListener('click', e => {
      const v = t.dataset.video;
      if(!v) return;
      // open in new tab for simplicity
      window.open(v, '_blank');
    });
  });

  // Contact form demo
  const sendBtn = document.getElementById('sendBtn');
  if(sendBtn){
    sendBtn.addEventListener('click', () => {
      sendBtn.animate([{transform:'translateY(0)'},{transform:'translateY(-4px)'},{transform:'translateY(0)'}],{duration:300});
      sendBtn.textContent = 'Sent';
      setTimeout(()=> sendBtn.textContent = 'Send Message', 1800);
    });
  }

  // Lazy load images
  document.querySelectorAll('img').forEach(img => { if('loading' in HTMLImageElement.prototype) img.loading = 'lazy'; });

  // Replace ad-slot innerHTML with your ad provider script when ready
});
