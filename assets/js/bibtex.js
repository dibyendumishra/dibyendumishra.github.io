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
  function authorsToString(auth){
    if (!auth) return '';
    // Split authors on " and ", then normalize each
    return auth.split(/\s+and\s+/i).map(name => {
      name = name.trim();
      // Handle "Last, First Middle" -> "First Middle Last"
      if (name.includes(',')) {
        const [last, first] = name.split(',').map(s => s.trim());
        // Some BibTeX have suffixes like "Jr." → keep it after last
        // first may already contain middle parts
        return first + (last ? ' ' + last : '');
      }
      return name; // Already "First Last"
    }).join(', ');
  }
  
  function normalize(e){
    const f = e.fields;
    return { key:e.citationKey, type:e.entryType, title:f.title||'', authors:authorsToString(f.author||f.authors||''), year:f.year||'', venue:f.journal||f.booktitle||f.howpublished||'', url:f.url||'' };
  }
  return { parse, normalize };
})();
