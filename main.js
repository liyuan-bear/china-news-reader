
fetch('rss.json')
  .then(res => res.json())
  .then(sources => {
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    for (const [name, url] of Object.entries(sources)) {
      const div = document.createElement('div');
      div.className = 'news-source';
      div.innerHTML = `<h2>${name}</h2><p>Source: <a href="${url}" target="_blank">${url}</a></p>`;
      container.appendChild(div);
    }
  });
