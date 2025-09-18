const Bib = (() => {
  function parse(bib) {
    const entries = [];
    const reEntry = /@([a-zA-Z]+)\s*\{\s*([^,]+)\s*,([\s\S]*?)\}\s*(?=@|$)/g;
    let m;
    while ((m = reEntry.exec(bib))){
      const [_, type, key, body] = m;
      const fields = {};
      const reField = /([a-zA-Z]+)\s*=\s*(\{[^{}]*\}|"[^"]*"|[^,\n]+)\s*,?/g;
      let f;
      while ((f = reField.exec(body))){
        const name = f[1].toLowerCase();
        let val = f[2].trim();
        if ((val.startsWith('{') && val.endsWith('}')) || (val.startsWith('"') && val.endsWith('"'))) val = val.slice(1,-1);
        fields[name] = val.replace(/\s+/g,' ').trim();
      }
      entries.push({ entryType: type.toLowerCase(), citationKey: key, fields });
    }
    return entries;
  }
  function authorsToString(auth){ return !auth ? '' : auth.split(/\s+and\s+/i).map(s=>s.trim()).join(', '); }
  function normalize(e){
    const f = e.fields;
    return { key:e.citationKey, type:e.entryType, title:f.title||'', authors:authorsToString(f.author||f.authors||''), year:f.year||'', venue:f.journal||f.booktitle||f.howpublished||'', url:f.url||'' };
  }
  return { parse, normalize };
})();
