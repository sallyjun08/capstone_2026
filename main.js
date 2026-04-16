const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generatorBtn = document.getElementById('generator-btn');
const themeToggle = document.getElementById('theme-toggle');
const luckyMsg = document.querySelector('.lucky-msg');

const LUCKY_MESSAGES = [
    '⭐ Lucky stars are aligned!',
    '🍀 Fortune is on your side!',
    '🌈 Today could be your day!',
    '💫 The universe chose these for you!',
    '🎊 Magic numbers, incoming!',
    '✨ These feel like winners!',
    '🌟 Believe and it shall be!',
    '🎉 Go get that jackpot!',
];

// Apply saved theme on load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function getBallClass(num) {
    if (num <= 10) return 'ball-yellow';
    if (num <= 20) return 'ball-blue';
    if (num <= 30) return 'ball-red';
    if (num <= 40) return 'ball-gray';
    return 'ball-green';
}

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function launchConfetti() {
    const rect = generatorBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const emojis = ['⭐', '✨', '💫', '🌟', '🎊', '🎉', '🍀', '💝'];

    for (let i = 0; i < 22; i++) {
        const el = document.createElement('span');
        el.className = 'confetti-piece';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const angle = (i / 22) * 360 + Math.random() * 16;
        const dist  = 70 + Math.random() * 150;
        const dx    = Math.cos(angle * Math.PI / 180) * dist;
        const dy    = Math.sin(angle * Math.PI / 180) * dist;

        el.style.cssText = `
            left: ${cx}px;
            top: ${cy}px;
            --dx: ${dx}px;
            --dy: ${dy}px;
            font-size: ${10 + Math.random() * 14}px;
            animation-duration: ${0.55 + Math.random() * 0.55}s;
            animation-delay: ${Math.random() * 0.18}s;
        `;
        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
    }
}

generatorBtn.addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    lottoNumbersContainer.innerHTML = '';
    luckyMsg.classList.remove('show');
    generatorBtn.disabled = true;

    launchConfetti();

    numbers.forEach((finalNumber, index) => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.classList.add('lotto-number', getBallClass(finalNumber));
            div.textContent = Math.floor(Math.random() * 45) + 1;
            lottoNumbersContainer.appendChild(div);

            // Slot-machine spin → reveal
            let spins = 0;
            const totalSpins = 7 + index * 2;
            const interval = setInterval(() => {
                div.textContent = Math.floor(Math.random() * 45) + 1;
                spins++;
                if (spins >= totalSpins) {
                    clearInterval(interval);
                    div.textContent = finalNumber;
                    div.classList.add('revealed'); // enable hover wiggle
                }
            }, 75);
        }, index * 180);
    });

    // Show lucky message and re-enable button after all done
    const totalDuration = (numbers.length - 1) * 180 + (7 + (numbers.length - 1) * 2) * 75 + 200;
    setTimeout(() => {
        luckyMsg.textContent = LUCKY_MESSAGES[Math.floor(Math.random() * LUCKY_MESSAGES.length)];
        luckyMsg.classList.add('show');
        generatorBtn.disabled = false;
    }, totalDuration);
});
