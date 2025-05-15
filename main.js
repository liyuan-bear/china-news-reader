
async function fetchNews(sourceName, rssUrl) {
  const container = document.getElementById("news-container");
  const sourceDiv = document.createElement("div");
  sourceDiv.className = "news-source";
  sourceDiv.innerHTML = `<h2>${sourceName}</h2><div>Loading...</div>`;
  container.appendChild(sourceDiv);

  try {
    const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssUrl);
    const res = await fetch(proxyUrl);
    const data = await res.json();
    if (data.items && data.items.length) {
      const list = document.createElement("ul");
      data.items.slice(0, 5).forEach(item => {
        const li = document.createElement("li");
        li.className = "news-item";
        li.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a> <span class="news-time">(${new Date(item.pubDate).toLocaleDateString()})</span>`;
        list.appendChild(li);
      });
      sourceDiv.lastElementChild.remove(); // remove "Loading..."
      sourceDiv.appendChild(list);
    } else {
      sourceDiv.lastElementChild.innerText = "No articles found.";
    }
  } catch (err) {
    sourceDiv.lastElementChild.innerText = "Failed to load.";
  }
}

fetch("rss.json")
  .then(res => res.json())
  .then(sources => {
    for (const [name, url] of Object.entries(sources)) {
      fetchNews(name, url);
    }
  });
