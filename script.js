// Animation Logic with Split Sequence for Z-Index Control

document.addEventListener('DOMContentLoaded', () => {
    const sealButton = document.getElementById('sealButton');
    const flap = document.getElementById('flap');
    const letter = document.getElementById('letter');
    const closeBtn = document.getElementById('closeBtn');

    // Create particles
    createParticles();

    sealButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubbling

        // 1. Open Flap
        flap.classList.add('open');

        // 2. Fly UP (Start animation)
        setTimeout(() => {
            letter.classList.add('fly-up');
            createConfetti();
        }, 400);

        // 3. Switch Layer & Fly DOWN (after 1s)
        // This is the CRITICAL step: switching z-index when letter is "in the air"
        setTimeout(() => {
            letter.classList.remove('fly-up');
            letter.classList.add('fly-down');
            letter.classList.add('on-top'); // Force z-index 100
        }, 1400);

        // 4. Settle (after another 1s)
        setTimeout(() => {
            letter.classList.add('settle');
        }, 2400);
    });

    closeBtn.addEventListener('click', () => {
        // Reverse animation
        letter.classList.remove('fly-up', 'fly-down', 'on-top', 'settle');

        setTimeout(() => {
            flap.classList.remove('open');
        }, 600);
    });
});

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(p);
    }
}

function createConfetti() {
    const container = document.getElementById('confetti');
    const colors = ['#4A5FC1', '#FFD700', '#DAA520'];
    for (let i = 0; i < 50; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + '%';
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(c);
    }
    setTimeout(() => container.innerHTML = '', 4000);
}
