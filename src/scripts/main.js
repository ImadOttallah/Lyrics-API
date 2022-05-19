// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import axios from 'axios';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';

const renderToDom = (divId, textToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToRender;
};
const getLyrics = (artist, song) => new Promise((resolve, reject) => {
  axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const lyricsOnDom = (artist, song) => {
  getLyrics(artist, song).then((response) => {
    document.querySelector('#lyrics-container').innerHTML = response.lyrics;
  });
};
const searchLyrics = () => {
  let domString = '';
  domString = `<form>
  <div class="mb-3">
    <label for="artist" class="form-label">Artist</label>
    <input type="text" class="form-control" id="artist" required>
  </div>
  <div class="mb-3">
    <label for="song" class="form-label">Song</label>
    <input type="text" class="form-control" id="song" required>
  </div>
  <button type="submit" class="btn btn-primary" id="song-btn">Submit</button>
</form>`;
  renderToDom('#app', domString);
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputArtist = document.querySelector('#artist').value;
    const inputSong = document.querySelector('#song').value;
    lyricsOnDom(inputArtist, inputSong);
  });
};

const startApp = () => {
  // lyricsOnDom();
  searchLyrics();
};
startApp();
