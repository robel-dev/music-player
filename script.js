/**
 * @Author: Robel Gebrewold
 * @Date:   2022-01-31T10:30:30+03:00
 * @Email:  robelamare20@gmail.com
 * @Project: music-player
 * @Last modified by:   Robel Gebrewold
 * @Last modified time: 2022-01-31T14:13:25+03:00
 */



const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'jazz-1',
    displayName: 'Chill Bro',
    artist: 'Mixkit Music',
    url: 'https://assets.mixkit.co/music/preview/mixkit-chill-bro-494.mp3',
  },
  {
    name: 'jazz-2',
    displayName: 'Danger',
    artist: 'Mixkit Music',
    url: 'https://assets.mixkit.co/music/preview/mixkit-danger-495.mp3',
  },
  {
    name: 'jazz-3',
    displayName: 'Dont Go',
    artist: 'Mixkit Music',
    url: 'https://assets.mixkit.co/music/preview/mixkit-dont-go-496.mp3',
  },
  {
    name: 'jazz-4',
    displayName: 'Hip Latin Jazz Groove',
    artist: 'Mixkit Music',
    url: 'https://assets.mixkit.co/music/preview/mixkit-hip-latin-jazz-groove-112.mp3'
  },
  {
    name: 'jazz-5',
    displayName: 'Romantic',
    artist: 'Mixkit Music',
    url: 'https://assets.mixkit.co/music/preview/mixkit-dont-go-496.mp3'
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  // music.src = `music/${song.name}.mp3`;
  music.src = song.url;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
