const fs = require('fs');
const files = ['d:/temp/cs/index.html', 'd:/temp/cs/home2.html', 'd:/temp/cs/collections.html', 'd:/temp/cs/pricing.html', 'd:/temp/cs/workshops.html', 'd:/temp/cs/quiz.html'];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // remove quiz links
  content = content.replace(/\s*<a href="quiz\.html"[^>]*>Fragrance Quiz<\/a>/g, '');
  content = content.replace(/\s*<a href="quiz\.html" class="btn btn-secondary btn-sm">Take Quiz<\/a>/g, '');

  const toggleButtons = `<button class="icon-btn theme-toggle" onclick="toggleTheme()" title="Toggle theme"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></button><button class="icon-btn rtl-toggle" onclick="toggleRTL()" title="Toggle RTL"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 8 3 12 7 16"/><line x1="21" y1="12" x2="3" y2="12"/></svg></button>`;
  
  if (!content.includes('toggleTheme()" title="Toggle theme"')) {
      // It's possible the original already has this from my earlier thought, but no it hasn't.
  }

  // Handle formatted html (index.html, home2.html)
  content = content.replace(/<div class="nav-ctas">\s*<a href="collections\.html" class="btn btn-primary btn-sm">Shop Now<\/a>\s*<\/div>/g, `<div class="nav-ctas">\n          ${toggleButtons}\n          <a href="collections.html" class="btn btn-primary btn-sm">Shop Now</a>\n        </div>`);
  
  // Handle minified-like html (collections.html, pricing.html etc)
  content = content.replace(/<div class="nav-ctas"><a href="collections\.html" class="btn btn-primary btn-sm">Shop Now<\/a><\/div>/g, `<div class="nav-ctas">${toggleButtons}<a href="collections.html" class="btn btn-primary btn-sm">Shop Now</a></div>`);

  fs.writeFileSync(f, content);
});
