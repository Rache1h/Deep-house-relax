document.addEventListener('DOMContentLoaded', function() {
    const songs = [
        { id: 1, imageSrc: 'images/chill1.webp', audioSrc: 'audio/Black Mamba.mp3' },
        { id: 2, imageSrc: 'images/chill2.webp', audioSrc: 'audio/pablo remake.mp3' },
        { id: 3, imageSrc: 'images/chill3.webp', audioSrc: 'audio/passages.mp3' },
        { id: 4, imageSrc: 'images/chill4.webp', audioSrc: 'audio/because of this.mp3' },
        { id: 5, imageSrc: 'images/chill5.webp', audioSrc: 'audio/convex.mp3' },
        { id: 6, imageSrc: 'images/chill6.webp', audioSrc: 'audio/in other words.mp3' },
    ];

    function renderSongs() {
        const container = document.getElementById('songsContainer');
        container.innerHTML = songs.map(song => `
            <div class="grid-cell" data-song="${song.audioSrc}">
                <img src="${song.imageSrc}" alt="Image ${song.id}">
                <div class="lottie-animation" style="display: none;"></div>
                <input type="range" min="0" max="100" value="100" class="volume-slider" style="display: none;">
                <audio class="audio-player" style="display: none;" src="${song.audioSrc}"></audio>
            </div>
        `).join('');

        attachEventListeners();
    }

    function attachEventListeners() {
        const gridCells = document.querySelectorAll('.grid-cell');

        gridCells.forEach(cell => {
            const volumeSlider = cell.querySelector('.volume-slider');
            const audioPlayer = cell.querySelector('.audio-player');
            const lottieContainer = cell.querySelector('.lottie-animation');
            let animationInstance = null;

            volumeSlider.addEventListener('input', (e) => {
                audioPlayer.volume = volumeSlider.value / 100;
                e.stopPropagation();
            });
            
            cell.addEventListener('click', (e) => {
                if (!e.target.classList.contains('volume-slider')) {
                    cell.classList.toggle('active');
                    if (cell.classList.contains('active')) {
                        audioPlayer.play();
                        volumeSlider.style.display = 'block';
                        lottieContainer.style.display = 'block';
          
                        if (!animationInstance) {
                            animationInstance = lottie.loadAnimation({
                                container: lottieContainer,
                                renderer: 'svg',
                                loop: true,
                                autoplay: true,
                                path: "images/wave.json"
                            });
                        } else {
                            animationInstance.play();
                        }
                    } else {
                        audioPlayer.pause();
                        volumeSlider.style.display = 'none';
                        lottieContainer.style.display = 'none';
                        if (animationInstance) {
                            animationInstance.stop();
                        }
                    }
                }
            });
        });
    }

    function updateTime() {
        const now = new Date();
        const dateTimeString = now.toLocaleString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('date-time').textContent = dateTimeString;
    }

    setInterval(updateTime, 1000);
    updateTime();
    renderSongs();
});
