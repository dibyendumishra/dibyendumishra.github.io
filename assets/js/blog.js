(async function(){
  const txt = await fetch('data/posts.bib').then(r=>r.text()).catch(()=>'');
  const items = Bib.parse(txt).map(Bib.normalize).sort((a,b)=> (parseInt(b.year)||0)-(parseInt(a.year)||0));
  const ul = document.getElementById('blogs');
  ul.innerHTML = items.map(it => {
    const link = it.url || '#';
    return `<li class="card media" data-title="${escapeHtml(it.title)}" data-authors="${escapeHtml(it.authors)}" data-year="${it.year}">
      <a href="${link}" target="_blank" rel="noopener" class="cover-link">
        <img src="assets/img/others/movies/movie1.jpg" class="card-img" alt="" loading="lazy">
      </a>
      <div class="card-body">
        <h3><a class="pub-title" href="${link}" target="_blank" rel="noopener">${it.title}</a></h3>
        <p>${it.authors}${it.year ? ' · '+it.year : ''}</p>
      </div>
    </li>`;
  }).join('');

  function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

  const q=document.getElementById('q-blog'), y=document.getElementById('year-blog'), a=document.getElementById('author-blog'), clr=document.getElementById('clear-blog');
  function apply(){
    const qs=(q.value||'').toLowerCase(), ys=(y.value||'').trim(), as=(a.value||'').toLowerCase();
    ul.querySelectorAll('li.card').forEach(li => {
      const t=(li.dataset.title||'').toLowerCase(), au=(li.dataset.authors||'').toLowerCase(), yr=(li.dataset.year||'').trim();
      const pass = (!qs||t.includes(qs)||au.includes(qs)) && (!ys||ys===yr) && (!as||au.includes(as));
      li.style.display = pass ? '' : 'none';
    });
  }
  [q,y,a].forEach(el => el && el.addEventListener('input', apply));
  clr && clr.addEventListener('click', ()=>{ if(q) q.value=''; if(y) y.value=''; if(a) a.value=''; apply(); });
})();
