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
    numbers.forEach(number => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('lotto-number');
        numberDiv.textContent = number;
        lottoNumbersContainer.appendChild(numberDiv);
    });
});
