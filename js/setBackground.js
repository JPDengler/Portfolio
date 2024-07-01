document.addEventListener('DOMContentLoaded', function() {
    const backgroundContainer = document.getElementById('background-container');
    const hours = new Date().getHours();
    let backgroundImage = '';

    if (hours >= 0 && hours < 5) {
        backgroundImage = 'images/12AM-5AM.png';
    } else if (hours >= 5 && hours < 9) {
        backgroundImage = 'images/5-9AM.png';
    } else if (hours >= 9 && hours < 12) {
        backgroundImage = 'images/9AM-12PM.png';
    } else if (hours >= 12 && hours < 15) {
        backgroundImage = 'images/12PM-3PM.png';
    } else if (hours >= 15 && hours < 21) {
        backgroundImage = 'images/3PM-9PM.png';
    } else if (hours >= 21 && hours < 24) {
        backgroundImage = 'images/9PM-12AM.png';
    }

    backgroundContainer.style.backgroundImage = `url(${backgroundImage})`;
});