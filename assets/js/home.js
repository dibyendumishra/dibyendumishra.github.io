(async function(){
  try {
    const news = await fetch('data/news.json').then(r=>r.json());
    document.getElementById('news').innerHTML = news.slice(0,3).map(n => `<li><span class="when">${n.date}</span><span class="what">${n.text}</span></li>`).join('');
  } catch {}
  try{
    const bib = await fetch('data/pubs.bib').then(r=>r.text());
    const items = Bib.parse(bib).map(Bib.normalize).sort((a,b)=> (parseInt(b.year)||0)-(parseInt(a.year)||0)).slice(0,3);
    document.getElementById('recent-pubs').innerHTML = items.map(it => {
      const title = it.url ? `<a class="pub-title" href="${it.url}" target="_blank" rel="noopener">${it.title}</a>` : `<span class="pub-title">${it.title}</span>`;
      const venue = it.venue ? ` · <span class="venue">${it.venue}</span>` : '';
      return `<li class="pub">${title}<div class="pub-meta"><span class="authors">${it.authors}</span>${venue} · <span class="year">${it.year}</span></div></li>`;
    }).join('');
  } catch {}
})();
