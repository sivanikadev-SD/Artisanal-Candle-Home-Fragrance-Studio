const fs = require('fs');
const files = ['d:/temp/cs/index.html', 'd:/temp/cs/home2.html', 'd:/temp/cs/collections.html', 'd:/temp/cs/pricing.html', 'd:/temp/cs/workshops.html', 'd:/temp/cs/quiz.html'];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  if (!content.includes('href="login.html"')) {
      content = content.replace(/(<a href="pricing\.html"[^>]*>Pricing<\/a>\s*(?:<!--\s*<a[^>]*>Dashboard<\/a>\s*-->\s*)?)/g, '$1<a href="login.html">Log In</a><a href="signup.html">Create Account</a>');
  }

  fs.writeFileSync(f, content);
});
