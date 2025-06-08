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
            new Song("Phir Bhi Tumko Chaahunga", "Arijit Singh", "sad", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-23.mp3", "images/sad.jpg"),
            new Song("Agar Tum Saath Ho", "Alka Yagnik", "sad", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-24.mp3", "images/sad.jpg"),
            new Song("Tujhse Naraz Nahi Zindagi", "Lata Mangeshkar", "sad", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-25.mp3", "images/sad.jpg"),
            new Song("Tere Bina Zindagi Se", "Lata Mangeshkar", "sad", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-26.mp3", "images/sad.jpg"),
            new Song("Kabira", "Tochi Raina", "sad", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-27.mp3", "images/sad.jpg"),
            new Song("Jeene Laga Hoon", "Atif Aslam", "sad", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-28.mp3", "images/sad.jpg"),
            new Song("Tere Liye", "Lata Mangeshkar", "sad", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-29.mp3", "images/sad.jpg"),
            new Song("Kal Ho Naa Ho", "Sonu Nigam", "sad", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-30.mp3", "images/sad.jpg"),
            
            // Workout Songs
            new Song("Sadda Haq", "Ranbir Kapoor", "workout", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-31.mp3", "images/workout.jpg"),
            new Song("Zinda", "Siddharth Mahadevan", "workout", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-32.mp3", "images/workout.jpg"),
            new Song("Malang", "Ved Sharma", "workout", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-33.mp3", "images/workout.jpg"),
            new Song("Brothers Anthem", "Vishal Dadlani", "workout", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-34.mp3", "images/workout.jpg"),
            new Song("Jai Ho", "A.R. Rahman", "workout", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-35.mp3", "images/workout.jpg"),
            new Song("Chak De India", "Sukhwinder Singh", "workout", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-36.mp3", "images/workout.jpg"),
            new Song("Bhaag Milkha Bhaag", "Shankar Mahadevan", "workout", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-37.mp3", "images/workout.jpg"),
            new Song("Kar Har Maidan Fateh", "Sukhwinder Singh", "workout", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-38.mp3", "images/workout.jpg"),
            new Song("Dangal", "Daler Mehndi", "workout", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-39.mp3", "images/workout.jpg"),
            new Song("Singh Is Kinng", "Suzanne D'Mello", "workout", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-40.mp3", "images/workout.jpg"),
            
            // Devotional Songs
            new Song("Om Jai Jagdish Hare", "Anuradha Paudwal", "devotional", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-41.mp3", "images/devotional.jpg"),
            new Song("Hanuman Chalisa", "Hariharan", "devotional", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-42.mp3", "images/devotional.jpg"),
            new Song("Shiv Tandav Stotram", "Uma Mohan", "devotional", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-43.mp3", "images/devotional.jpg"),
            new Song("Gayatri Mantra", "Anuradha Paudwal", "devotional", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-44.mp3", "images/devotional.jpg"),
            new Song("Jai Ganesh Deva", "Anuradha Paudwal", "devotional", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-45.mp3", "images/devotional.jpg"),
            new Song("Aigiri Nandini", "Shreya Ghoshal", "devotional", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-46.mp3", "images/devotional.jpg"),
            new Song("Vaishnav Jan To", "K.S. Chithra", "devotional", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-47.mp3", "images/devotional.jpg"),
            new Song("Shree Krishna Govind", "Anuradha Paudwal", "devotional", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-48.mp3", "images/devotional.jpg"),
            new Song("Jai Santoshi Maa", "Anuradha Paudwal", "devotional", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-49.mp3", "images/devotional.jpg"),
            new Song("Durga Chalisa", "Anuradha Paudwal", "devotional", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-50.mp3", "images/devotional.jpg")
        ];
        
        // Mark favorites from localStorage
        this.songs.forEach(song => {
            song.isFavorite = this.favorites.some(fav => 
                fav.title === song.title && fav.artist === song.artist
            );
        });
    }
    
    renderSongs() {
        const container = document.getElementById('song-container');
        container.innerHTML = '';
        
        const filteredSongs = this.songs.filter(song => {
            const matchesCategory = this.currentCategory === 'all' || song.category === this.currentCategory;
            const matchesSearch = song.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                                 song.artist.toLowerCase().includes(this.searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        
        if (filteredSongs.length === 0) {
            container.innerHTML = '<p class="no-results">No songs found. Try a different search or category.</p>';
            return;
        }
        
        filteredSongs.forEach(song => {
            const songCard = document.createElement('div');
            songCard.className = 'song-card';
            songCard.dataset.category = song.category;
            
            songCard.innerHTML = `
                <img src="${song.imageSrc}" alt="${song.title}" class="song-img">
                <div class="song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                    <span class="song-category">${song.category}</span>
                    <div class="song-actions">
                        <button class="play-btn" data-title="${song.title}" data-artist="${song.artist}">
                            <i class="fas fa-play"></i> Play
                        </button>
                        <button class="fav-btn ${song.isFavorite ? 'favorited' : ''}" data-title="${song.title}" data-artist="${song.artist}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(songCard);
        });
    }
    
    setupEventListeners() {
        // Category filter buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.category-btn.active').classList.remove('active');
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.renderSongs();
            });
        });
        
        // Search functionality
        document.getElementById('search-btn').addEventListener('click', () => {
            this.searchQuery = document.getElementById('search-input').value;
            this.renderSongs();
        });
        
        document.getElementById('search-input').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.searchQuery = document.getElementById('search-input').value;
                this.renderSongs();
            }
        });
        
        // Play song
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('play-btn') || e.target.closest('.play-btn')) {
                const btn = e.target.classList.contains('play-btn') ? e.target : e.target.closest('.play-btn');
                const title = btn.dataset.title;
                const artist = btn.dataset.artist;
                this.playSong(title, artist);
            }
            
            // Toggle favorite
            if (e.target.classList.contains('fav-btn') || e.target.closest('.fav-btn')) {
                const btn = e.target.classList.contains('fav-btn') ? e.target : e.target.closest('.fav-btn');
                const title = btn.dataset.title;
                const artist = btn.dataset.artist;
                this.toggleFavorite(title, artist);
            }
        });
        
        // Favorites modal
        document.getElementById('fav-btn').addEventListener('click', () => {
            this.showFavoritesModal();
        });
        
        document.querySelector('.close-btn').addEventListener('click', () => {
            document.getElementById('fav-modal').style.display = 'none';
        });
        
        // Player favorite button
        document.getElementById('player-fav-btn').addEventListener('click', () => {
            if (this.currentSong) {
                this.toggleFavorite(this.currentSong.title, this.currentSong.artist);
            }
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('fav-modal')) {
                document.getElementById('fav-modal').style.display = 'none';
            }
        });
    }
    
    playSong(title, artist) {
        const song = this.songs.find(s => s.title === title && s.artist === artist);
        if (song) {
            this.currentSong = song;
            this.audioPlayer.src = song.audioSrc;
            this.audioPlayer.play();
            this.updatePlayer();
        }
    }
    
    toggleFavorite(title, artist) {
        const song = this.songs.find(s => s.title === title && s.artist === artist);
        if (song) {
            song.isFavorite = !song.isFavorite;
            
            if (song.isFavorite) {
                if (!this.favorites.some(fav => fav.title === title && fav.artist === artist)) {
                    this.favorites.push({ title, artist, category: song.category, imageSrc: song.imageSrc });
                }
            } else {
                this.favorites = this.favorites.filter(fav => !(fav.title === title && fav.artist === artist));
            }
            
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
            this.renderSongs();
            
            // Update player favorite button if this is the current song
            if (this.currentSong && this.currentSong.title === title && this.currentSong.artist === artist) {
                this.updatePlayer();
            }
        }
    }
    
    updatePlayer() {
        const playerImg = document.getElementById('player-img');
        const playerTitle = document.getElementById('player-title');
        const playerArtist = document.getElementById('player-artist');
        const playerFavBtn = document.getElementById('player-fav-btn');
        
        if (this.currentSong) {
            playerImg.src = this.currentSong.imageSrc;
            playerImg.alt = this.currentSong.title;
            playerTitle.textContent = this.currentSong.title;
            playerArtist.textContent = this.currentSong.artist;
            
            if (this.currentSong.isFavorite) {
                playerFavBtn.innerHTML = '<i class="fas fa-heart"></i>';
                playerFavBtn.classList.add('favorited');
            } else {
                playerFavBtn.innerHTML = '<i class="far fa-heart"></i>';
                playerFavBtn.classList.remove('favorited');
            }
            
            document.getElementById('player').style.display = 'flex';
        } else {
            document.getElementById('player').style.display = 'none';
        }
    }
    
    showFavoritesModal() {
        const modal = document.getElementById('fav-modal');
        const favSongsContainer = document.getElementById('fav-songs');
        
        favSongsContainer.innerHTML = '';
        
        if (this.favorites.length === 0) {
            favSongsContainer.innerHTML = '<p>You have no favorite songs yet.</p>';
        } else {
            this.favorites.forEach(fav => {
                const favSongCard = document.createElement('div');
                favSongCard.className = 'fav-song-card';
                
                favSongCard.innerHTML = `
                    <img src="${fav.imageSrc}" alt="${fav.title}" class="fav-song-img">
                    <div class="fav-song-info">
                        <h4>${fav.title}</h4>
                        <p>${fav.artist}</p>
                    </div>
                    <button class="play-btn" data-title="${fav.title}" data-artist="${fav.artist}">
                        <i class="fas fa-play"></i>
                    </button>
                `;
                
                favSongsContainer.appendChild(favSongCard);
            });
        }
        
        modal.style.display = 'flex';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SongRecommender();
});
