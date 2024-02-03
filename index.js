
// Get all the grid cells
const gridCells = document.querySelectorAll('.grid-cell');


// Add event listener to each grid cell
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
        if(cell.classList.contains('active')) {
            audioPlayer.play();
            volumeSlider.style.display = 'block';
            lottieContainer.style.display = 'block';

          
          if (!animationInstance) {
            animationInstance =   lottie.loadAnimation({
                container: lottieContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: "images/wave.json"
            });

        } else {
            animationInstance.play();
        }

        }   else {
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

function updateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-US', {
        // weekday: 'long', // "Monday"
        year: '2-digit', // "2021"
        month: '2-digit', // "July"
        day: '2-digit', // "19"
        hour: '2-digit', // "12 AM/PM"
        minute: '2-digit', // "00"
        second: '2-digit' // "00"
    });
    document.getElementById('date-time').textContent = dateTimeString;
}

setInterval(updateTime, 1000);
updateTime();