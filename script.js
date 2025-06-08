let favorites = [];

function loadSongs(category) {
  const search = document.getElementById("search").value;
  fetch(`songs?category=${category}&search=${search}`)
    .then(res => res.json())
    .then(data => {
      const songDiv = document.getElementById("songs");
      songDiv.innerHTML = '';
      data.forEach(song => {
        const div = document.createElement("div");
        div.className = "song-card";
        div.innerHTML = `
          <img src="${song.image}" alt="${song.title}">
          <h3>${song.title}</h3>
          <audio controls src="${song.url}"></audio><br>
          <button onclick='toggleFav("${song.id}", this)'>
            ${favorites.includes(song.id) ? "Unfavorite" : "Favorite"}
          </button>
        `;
        songDiv.appendChild(div);
      });
    });
}

function toggleFav(id, btn) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(x => x !== id);
    btn.innerText = "Favorite";
  } else {
    favorites.push(id);
    btn.innerText = "Unfavorite";
  }
  renderFavorites();
}

function renderFavorites() {
  fetch('songs')
    .then(res => res.json())
    .then(all => {
      const favDiv = document.getElementById("favorites");
      favDiv.innerHTML = '';
      all.filter(s => favorites.includes(s.id)).forEach(song => {
        const div = document.createElement("div");
        div.className = "song-card";
        div.innerHTML = `
          <img src="${song.image}" alt="${song.title}">
          <h3>${song.title}</h3>
          <audio controls src="${song.url}"></audio>
        `;
        favDiv.appendChild(div);
      });
    });
}

document.getElementById("search").addEventListener("input", () => loadSongs());
