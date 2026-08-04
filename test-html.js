const https = require('https');
https.get('https://dima-razrab.com/blog/avtomatizaciya-zayavok', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
  const chunks = [];
  r.on('data', (d) => chunks.push(d));
  r.on('end', () => {
    const html = Buffer.concat(chunks).toString();
    console.log('HTML length:', html.length);
    
    // Ищем href
    const hrefLinks = html.match(/href=["'][^"']+?["']/gi) || [];
    console.log('\nhref links found:', hrefLinks.length);
    hrefLinks.slice(0, 15).forEach((l) => console.log('  ', l));
    
    // Ищем ссылки на блог
    const blogLinks = html.match(/href=["'][^"']*\/blog\/[^"']+?["']/gi) || [];
    console.log('\nBlog links found:', blogLinks.length);
    blogLinks.forEach((l) => console.log('  ', l));
    
    // Проверяем Next.js data
    const nextData = html.match(/__NEXT_DATA__/);
    console.log('\n__NEXT_DATA__ found:', !!nextData);
    
    // Ищем <a теги
    const aTags = html.match(/<a\s[^>]*>/gi) || [];
    console.log('\n<a> tags found:', aTags.length);
    aTags.slice(0, 10).forEach((l) => console.log('  ', l));
  });
});
