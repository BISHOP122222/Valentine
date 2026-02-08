// CONFIGURATION: Replace with your actual email address!
const yourEmail = "milanjohnso9@gmail.com";

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const question = document.getElementById('question');
const subtext = document.getElementById('subtext');
const hiddenMessage = document.getElementById('hidden-message');
const buttonsContainer = document.querySelector('.buttons');

// "No" button runs away on hover/touch
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents "tap" from turning into a click
    moveNoButton();
});

function moveNoButton() {
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate random position within the container bounds
    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = containerRect.height - btnRect.height - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    if (noBtn.style.position !== 'absolute') {
        noBtn.style.position = 'absolute';
    }

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// "Yes" button click
yesBtn.addEventListener('click', () => {
    // 1. Hide the question and buttons
    question.style.display = 'none';
    subtext.style.display = 'none';
    buttonsContainer.style.display = 'none';
    document.querySelector('.heart-container').style.display = 'none';

    // 2. Show the hidden message
    hiddenMessage.style.display = 'block';

    // 3. Launch Confetti!
    launchConfetti();

    // 4. Send Email Notification
    sendEmail();
});

function sendEmail() {
    const emailEndpoint = `https://formsubmit.co/ajax/${yourEmail}`;

    fetch(emailEndpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            message: "She said YES! 💍💖",
            date: new Date().toLocaleString()
        })
    })
        .then(response => response.json())
        .then(data => console.log("Email sent successfully:", data))
        .catch(error => console.error("Error sending email:", error));
}

function launchConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
