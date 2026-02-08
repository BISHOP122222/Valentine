// CONFIGURATION: Replace with your actual email address!
const yourEmail = "roddynasiima23@gmail.com";

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainContent = document.getElementById('main-content');
const hiddenMessage = document.getElementById('hidden-message');
const glassCard = document.querySelector('.glass-card');

// "No" button logic
let moveCount = 0;

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    const cardRect = glassCard.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate available space within the glass card
    // We keep it within the card for a cleaner look
    const maxX = cardRect.width - btnRect.width - 40;
    const maxY = cardRect.height - btnRect.height - 40;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    if (noBtn.style.position !== 'absolute') {
        noBtn.style.position = 'absolute';
        noBtn.style.zIndex = '100';
        noBtn.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    }

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    moveCount++;

    // Change button text periodically for fun
    if (moveCount === 3) noBtn.innerText = "Are you sure? 🥺";
    if (moveCount === 6) noBtn.innerText = "Think again! 💔";
    if (moveCount === 9) noBtn.innerText = "You're fast! 🏃‍♂️";
}

// "Yes" button click
yesBtn.addEventListener('click', () => {
    // 1. Hide the main content with a fade
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        mainContent.classList.add('hidden');

        // 2. Show the hidden message with a fade in
        hiddenMessage.classList.remove('hidden');
        hiddenMessage.style.opacity = '0';
        hiddenMessage.style.transform = 'translateY(20px)';

        // Force reflow
        hiddenMessage.offsetHeight;

        hiddenMessage.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        hiddenMessage.style.opacity = '1';
        hiddenMessage.style.transform = 'translateY(0)';

        // 3. Launch Confetti!
        launchConfetti();

        // 4. Trigger Emoji Magic!
        createEmojiMagic();

        // 5. Send Email Notification
        sendEmail();
    }, 400);
});

function createEmojiMagic() {
    const emojis = ['😍', '🥳', '🥰', '🥰', '😘', '😍', '🤩', '🙊', '🙉', '🙈', '🫦', '🫀', '⛹️‍♂️', '🤸', '💏', '🤗', '🫂', '💑', '💝', '💖', '💕', '💐'];
    const container = document.body;

    // Create regular floating emojis
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'floating-emoji';
            emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

            const isDrift = Math.random() > 0.5;
            emoji.style.left = Math.random() * 100 + 'vw';
            emoji.style.animation = `${isDrift ? 'driftAcross' : 'floatUp'} ${3 + Math.random() * 4}s linear forwards`;

            container.appendChild(emoji);

            // Cleanup
            setTimeout(() => emoji.remove(), 7000);
        }, i * 150);
    }

    // Create a burst from the center
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 200 + Math.random() * 300;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        emoji.style.left = '50vw';
        emoji.style.top = '50vh';
        emoji.style.setProperty('--tx', `${tx}px`);
        emoji.style.setProperty('--ty', `${ty}px`);
        emoji.style.animation = `heartBurst ${2 + Math.random() * 2}s cubic-bezier(0.165, 0.84, 0.44, 1) forwards`;

        container.appendChild(emoji);

        // Cleanup
        setTimeout(() => emoji.remove(), 4000);
    }
}

function sendEmail() {
    const emailEndpoint = `https://formsubmit.co/ajax/${yourEmail}`;

    fetch(emailEndpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            message: "Mirembe Joy said YES! 💍💖",
            date: new Date().toLocaleString()
        })
    })
        .then(response => response.json())
        .then(data => console.log("Email sent successfully:", data))
        .catch(error => console.error("Error sending email:", error));
}

function launchConfetti() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

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
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff4757', '#ff6b81', '#ffffff']
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff4757', '#ff6b81', '#ffffff']
        }));
    }, 250);
}
