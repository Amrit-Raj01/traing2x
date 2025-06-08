class Song {
    constructor(title, artist, category, audioSrc, imageSrc) {
        this.title = title;
        this.artist = artist;
        this.category = category;
        this.audioSrc = audioSrc;
        this.imageSrc = imageSrc;
        this.isFavorite = false;
    }
}

class SongRecommender {
    constructor() {
        this.songs = [];
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.currentSong = null;
        this.audioPlayer = document.getElementById('audio-player');
        
        this.init();
    }
    
    init() {
        this.loadSongs();
        this.renderSongs();
        this.setupEventListeners();
        this.updatePlayer();
    }
    
    loadSongs() {
        // Romantic Songs
        this.songs = [
            new Song("Tum Hi Ho", "Arijit Singh", "romantic", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "images/romantic.jpg"),
            new Song("Tera Ban Jaunga", "Akhil Sachdeva", "romantic", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", "images/romantic.jpg"),
            new Song("Raabta", "Arijit Singh", "romantic", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", "images/romantic.jpg"),
            new Song("Pehla Nasha", "Udit Narayan", "romantic", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", "images/romantic.jpg"),
            new Song("Tum Se Hi", "Mohit Chauhan", "romantic", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", "images/romantic.jpg"),
            new Song("Mere Haath Mein", "Sonu Nigam", "romantic", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", "images/romantic.jpg"),
            new Song("Ae Dil Hai Mushkil", "Arijit Singh", "romantic", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", "images/romantic.jpg"),
            new Song("Tujhe Kitna Chahne Lage", "Arijit Singh", "romantic", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", "images/romantic.jpg"),
            new Song("Tere Bina", "A.R. Rahman", "romantic", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", "images/romantic.jpg"),
            new Song("Mere Bina", "Pritam", "romantic", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", "images/romantic.jpg"),
            
            // Party Songs
            new Song("Badtameez Dil", "Benny Dayal", "party", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", "images/party.jpg"),
            new Song("DJ Waley Babu", "Badshah", "party", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", "images/party.jpg"),
            new Song("Kar Gayi Chull", "Badshah", "party", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", "images/party.jpg"),
            new Song("Sooraj Dooba Hain", "Arijit Singh", "party", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", "images/party.jpg"),
            new Song("The Disco Song", "Vishal Dadlani", "party", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", "images/party.jpg"),
            new Song("Bang Bang", "Benny Dayal", "party", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", "images/party.jpg"),
            new Song("Gandi Baat", "Raftaar", "party", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3", "images/party.jpg"),
            new Song("Lungi Dance", "Yo Yo Honey Singh", "party", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3", "images/party.jpg"),
            new Song("High Heels", "Yo Yo Honey Singh", "party", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3", "images/party.jpg"),
            new Song("Party All Night", "Yo Yo Honey Singh", "party", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3", "images/party.jpg"),
            
            // Sad Songs
            new Song("Channa Mereya", "Arijit Singh", "sad", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3", "images/sad.jpg"),
            new Song("Tum Ho", "Mohit Chauhan", "sad", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3", "images/sad.jpg"),
            new Song("Phir Bhi Tumko Chaahunga", "Arijit Singh", "sad", "https://www
