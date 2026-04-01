const fs = require('fs');
const files = ['d:/temp/cs/index.html', 'd:/temp/cs/home2.html', 'd:/temp/cs/collections.html', 'd:/temp/cs/pricing.html', 'd:/temp/cs/workshops.html', 'd:/temp/cs/quiz.html'];

const newLogoPrimary = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 14C12 12.8954 12.8954 12 14 12H22C23.1046 12 24 12.8954 24 14V28C24 29.1046 23.1046 30 22 30H14C12.8954 30 12 29.1046 12 28V14Z" stroke="var(--primary)" stroke-width="2"/><path d="M10 10H26V12H10V10Z" fill="var(--primary)"/><path d="M18 4C18 4 15 6.5 15 8C15 9.65685 16.3431 11 18 11C19.6569 11 21 9.65685 21 8C21 6.5 18 4 18 4Z" fill="var(--primary)"/></svg>`;

const newLogoLight = newLogoPrimary.replace(/var\(--primary\)/g, 'var(--primary-light)');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  content = content.replace(/<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg"><path d="M18 4C18 4 10 12 10 20C10 24\.418 13\.582 28 18 28C22\.418 28 26 24\.418 26 20C26 12 18 4 18 4Z"[^>]*><path d="M18 12C18 12 14 16 14 20C14 22\.209 15\.791 24 18 24C20\.209 24 22 22\.209 22 20C22 16 18 12 18 12Z"[^>]*><\/svg>/g, (match) => {
      if(match.includes('--primary-light')) return newLogoLight;
      return newLogoPrimary;
  });

  // some files might not have xmlns attribute because I wrote them differently maybe? Let's just use a broader regex.
  content = content.replace(/<svg width="36" height="36" viewBox="0 0 36 36" fill="none"[^>]*>.*?<path d="M18 4C18 4 10 12 10 20C10 24\.418.*?<\/svg>/g, (match) => {
      if(match.includes('--primary-light')) return newLogoLight;
      return newLogoPrimary;
  });

  fs.writeFileSync(f, content);
});
