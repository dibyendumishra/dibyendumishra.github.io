(function(){
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme'); if (savedTheme) root.setAttribute('data-theme', savedTheme);

  const bg = document.querySelector('.bg-grid');
  const choices = ['escher','swirl','maze'];
  const pick = choices[Math.floor(Math.random()*choices.length)];
  bg.classList.add('bg-' + pick);

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme') || 'noir';
    const next = (cur === 'noir') ? 'paper' : 'noir';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-link').forEach(a => { if (a.getAttribute('href').includes(page)) a.classList.add('active'); });
  const y = document.getElementById('yearNow'); if (y) y.textContent = new Date().getFullYear();
})();
