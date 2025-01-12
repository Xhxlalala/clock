let currentTime = new Date();
let isCustomTime = false;

function createMinuteMarks() {
    const minuteMarksContainer = document.querySelector('.minute-marks');
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {  // Skip positions where hour marks are
            const mark = document.createElement('div');
            mark.style.transform = `rotate(${i * 6}deg)`;
            minuteMarksContainer.appendChild(mark);
        }
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateClock(time) {
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;

    document.getElementById('hour').style.transform = `rotate(${hourDeg}deg)`;
    document.getElementById('minute').style.transform = `rotate(${minuteDeg}deg)`;
    document.getElementById('second').style.transform = `rotate(${secondDeg}deg)`;

    // Change background color every minute
    if (seconds === 0) {
        const clock = document.querySelector('.clock');
        clock.style.backgroundColor = getRandomColor();
    }
}

function setCustomTime() {
    const timeInput = document.getElementById('timeInput').value;
    if (timeInput) {
        const [hours, minutes] = timeInput.split(':');
        const newTime = new Date();
        newTime.setHours(hours);
        newTime.setMinutes(minutes);
        newTime.setSeconds(0);
        currentTime = newTime;
        isCustomTime = true;
        updateClock(currentTime);
    }
}

// Initial clock update
updateClock(currentTime);

// Add this new code to make the clock tick
setInterval(() => {
    if (!isCustomTime) {
        currentTime = new Date();
    } else {
        currentTime.setSeconds(currentTime.getSeconds() + 1);
    }
    updateClock(currentTime);
}, 1000);

// 在页面加载时调用
document.addEventListener('DOMContentLoaded', createMinuteMarks);