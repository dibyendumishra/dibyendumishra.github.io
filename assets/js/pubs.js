(async function(){
  const txt = await fetch('data/pubs.bib').then(r=>r.text()).catch(()=>'');
  const items = Bib.parse(txt).map(Bib.normalize).sort((a,b)=> (parseInt(b.year)||0)-(parseInt(a.year)||0));
  const ul = document.getElementById('pubs');
  ul.innerHTML = items.map(it => {
    const title = it.url ? `<a class="pub-title" href="${it.url}" target="_blank" rel="noopener">${it.title}</a>` : `<span class="pub-title">${it.title}</span>`;
    const venue = it.venue ? ` · <span class="venue">${it.venue}</span>` : '';
    return `<li class="pub" data-title="${escapeHtml(it.title)}" data-authors="${escapeHtml(it.authors)}" data-year="${it.year}" data-venue="${escapeHtml(it.venue)}">
      ${title}
      <div class="pub-meta"><span class="authors">${it.authors}</span>${venue} · <span class="year">${it.year}</span></div>
    </li>`;
  }).join('');

  function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

  const q = document.getElementById('q-pub'), y = document.getElementById('year-pub'), a = document.getElementById('author-pub'), clr = document.getElementById('clear-pub');
  function apply(){
    const qs=(q.value||'').toLowerCase(), ys=(y.value||'').trim(), as=(a.value||'').toLowerCase();
    ul.querySelectorAll('li.pub').forEach(li => {
      const t=(li.dataset.title||'').toLowerCase(), au=(li.dataset.authors||'').toLowerCase(), yr=(li.dataset.year||'').trim(), v=(li.dataset.venue||'').toLowerCase();
      const pass=(!qs||t.includes(qs)||au.includes(qs)||v.includes(qs)) && (!ys||ys===yr) && (!as||au.includes(as));
      li.style.display = pass ? '' : 'none';
    });
  }
  [q,y,a].forEach(el => el && el.addEventListener('input', apply));
  clr && clr.addEventListener('click', ()=>{ if(q) q.value=''; if(y) y.value=''; if(a) a.value=''; apply(); });
})();
