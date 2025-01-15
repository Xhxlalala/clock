let currentTime = new Date();
let isCustomTime = false;
let lastColorChangeTime = new Date();

function createMinuteMarks() {
    const minuteMarksContainer = document.querySelector('.minute-marks');
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
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
    const milliseconds = time.getMilliseconds();

    // Calculate more precise positions including milliseconds for smoother movement
    const hourDeg = (hours * 30) + (minutes * 0.5) + (seconds * (0.5/60));
    const minuteDeg = (minutes * 6) + (seconds * 0.1);
    const secondDeg = (seconds * 6) + (milliseconds * 0.006);

    // Get elements
    const hourHand = document.getElementById('hour');
    const minuteHand = document.getElementById('minute');
    const secondHand = document.getElementById('second');

    // Handle transition for second hand
    if (seconds === 0) {
        secondHand.style.transition = 'none';
        // Add a small delay to ensure the transition removal is registered
        setTimeout(() => {
            secondHand.style.transform = `rotate(${secondDeg}deg)`;
            // Restore the transition after the hand has moved to 0
            setTimeout(() => {
                secondHand.style.transition = 'transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44)';
            }, 0);
        }, 0);
    } else {
        secondHand.style.transform = `rotate(${secondDeg}deg)`;
    }

    // Update hour and minute hands
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;

    // Check if a minute has passed since the last color change
    const timeDiff = time.getTime() - lastColorChangeTime.getTime();
    if (timeDiff >= 60000) {
        const clock = document.querySelector('.clock');
        clock.style.backgroundColor = getRandomColor();
        lastColorChangeTime = new Date(time.getTime());
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
        lastColorChangeTime = new Date(currentTime.getTime());
        isCustomTime = true;
        updateClock(currentTime);
    }
}

// Initial clock update
updateClock(currentTime);

// Update interval reduced to 50ms for smoother movement
setInterval(() => {
    if (!isCustomTime) {
        currentTime = new Date();
    } else {
        currentTime.setSeconds(currentTime.getSeconds() + 1);
    }
    updateClock(currentTime);
}, 1000);

document.addEventListener('DOMContentLoaded', createMinuteMarks);