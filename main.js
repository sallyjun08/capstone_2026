const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generatorBtn = document.getElementById('generator-btn');
const themeToggle = document.getElementById('theme-toggle');

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

generatorBtn.addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    lottoNumbersContainer.innerHTML = '';
    generatorBtn.disabled = true;

    numbers.forEach((finalNumber, index) => {
        // Stagger each ball's appearance
        setTimeout(() => {
            const div = document.createElement('div');
            div.classList.add('lotto-number', getBallClass(finalNumber));
            div.textContent = Math.floor(Math.random() * 45) + 1;
            lottoNumbersContainer.appendChild(div);

            // Slot-machine spin: show random numbers, then reveal
            let spins = 0;
            const totalSpins = 7 + index * 2;
            const interval = setInterval(() => {
                div.textContent = Math.floor(Math.random() * 45) + 1;
                spins++;
                if (spins >= totalSpins) {
                    clearInterval(interval);
                    div.textContent = finalNumber;
                }
            }, 75);
        }, index * 180);
    });

    // Re-enable after all animations finish
    const totalDuration = (numbers.length - 1) * 180 + (7 + (numbers.length - 1) * 2) * 75 + 200;
    setTimeout(() => { generatorBtn.disabled = false; }, totalDuration);
});
