const searchSong = async() => {
  const searchText = document.getElementById("searchSong").value;
  const res = await fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
    const data = await res.json()
     displaySong(data.data);
};

document.getElementById('searchSong').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    document.getElementById('searchBtn').click();
  }
})

const displaySong = (songs) => {
  songContainer.innerText = "";
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "search-result col-md-8 mx-auto py-4";
    songDiv.innerHTML = ` 
    <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
        </div>
        <audio controls>

          <source src="${song.preview}" type="audio/ogg">

          <source src="" type="audio/mpeg">

         Your browser does not support the audio element.

        </audio>
        <div class="col-md-3 text-md-right text-center">
            <button onclick=" getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>`;
    songContainer.appendChild(songDiv);
  });
};

     const getLyrics = async(artist, title) => {
     const url = (` https://api.lyrics.ovh/v1/${artist}/${title}`)
       const res = await fetch(url);
       const data = await res.json();
       displayLyrics(data.lyrics);
};

const displayLyrics = lyric => {
  lyricContainer.innerText = " ";
  const lyricDiv = document.getElementById('lyricContainer')
  lyricDiv.innerText = lyric;
}


