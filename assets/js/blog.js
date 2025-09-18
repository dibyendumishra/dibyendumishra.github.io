(async function(){
  const txt = await fetch('data/posts.bib').then(r=>r.text()).catch(()=>'');

  const items = Bib.parse(txt).map(Bib.normalize)
    .sort((a,b)=> (parseInt(b.year)||0)-(parseInt(a.year)||0));

  // Titles only, each linking to url (if any)
  const ul = document.getElementById('blogs');
  ul.innerHTML = items.map(it => {
    const title = it.url
      ? `<a class="pub-title" href="${it.url}" target="_blank" rel="noopener">${it.title}</a>`
      : `<span class="pub-title">${it.title}</span>`;
    return `<li class="pub">${title}</li>`;
  }).join('');
})();
