(async function(){
  // Current Projects (one-line items)
  try {
    const projects = await fetch('data/projects.json').then(r=>r.json());
    document.getElementById('projects').innerHTML = projects.map(p =>
      `<li><span class="what"><strong>${p.title}</strong> — ${p.update}</span></li>`
    ).join('');
  } catch {}

  // Recent publications (unchanged)
  try{
    const bib = await fetch('data/pubs.bib').then(r=>r.text());
    const items = Bib.parse(bib).map(Bib.normalize)
      .sort((a,b)=> (parseInt(b.year)||0)-(parseInt(a.year)||0)).slice(0,3);
    document.getElementById('recent-pubs').innerHTML = items.map(it => {
      const title = it.url ? `<a class="pub-title" href="${it.url}" target="_blank" rel="noopener">${it.title}</a>` : `<span class="pub-title">${it.title}</span>`;
      const venue = it.venue ? ` · <span class="venue">${it.venue}</span>` : '';
      return `<li class="pub">${title}<div class="pub-meta"><span class="authors">${it.authors}</span>${venue} · <span class="year">${it.year}</span></div></li>`;
    }).join('');
  } catch {}
})();
