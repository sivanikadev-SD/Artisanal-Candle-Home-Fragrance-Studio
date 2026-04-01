const fs = require('fs');
const files = ['d:/temp/cs/index.html', 'd:/temp/cs/home2.html', 'd:/temp/cs/collections.html', 'd:/temp/cs/pricing.html', 'd:/temp/cs/workshops.html', 'd:/temp/cs/quiz.html'];

const newLogoPrimary = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 4C18 4 10 12 10 20C10 24.418 13.582 28 18 28C22.418 28 26 24.418 26 20C26 12 18 4 18 4Z" stroke="var(--primary)" stroke-width="2" fill="none"/><path d="M18 12C18 12 14 16 14 20C14 22.209 15.791 24 18 24C20.209 24 22 22.209 22 20C22 16 18 12 18 12Z" fill="var(--primary)"/></svg>`;
const newLogoLight = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 4C18 4 10 12 10 20C10 24.418 13.582 28 18 28C22.418 28 26 24.418 26 20C26 12 18 4 18 4Z" stroke="var(--primary-light)" stroke-width="2" fill="none"/><path d="M18 12C18 12 14 16 14 20C14 22.209 15.791 24 18 24C20.209 24 22 22.209 22 20C22 16 18 12 18 12Z" fill="var(--primary-light)"/></svg>`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Replace SVGs
  content = content.replace(/<svg width="36" height="36" viewBox="0 0 36 36" fill="none"[^>]*>[\s\S]*?<\/svg>/g, (match) => {
    // Keep icons that are NOT the logo (Wait, logo is 36x36. Other icons are 20x20 usually.)
    // If it has circle and path, it's the logo.
    if (match.includes('circle') && match.includes('18')) {
        if (match.includes('--primary-light')) return newLogoLight;
        return newLogoPrimary;
    }
    return match;
  });

  // Add Fragrance Quiz link back to main nav
  // we will insert it right after Collections
  // Check if we need to add it:
  if (!content.includes('>Fragrance Quiz</a>') && !content.includes('class="active">Fragrance Quiz</a>')) {
      content = content.replace(/(<a href="collections\.html"[^>]*>Collections<\/a>)/g, '$1<a href="quiz.html">Fragrance Quiz</a>');
  }

  fs.writeFileSync(f, content);
});
