const display = document.getElementById('display');
const keyboard = document.querySelector('.keyboard');
const keys = document.querySelectorAll('.key');
let currentInput = '';

keys.forEach(key => {
    key.addEventListener('click', () => {
        handleInput(key.dataset.code);
        if (key.dataset.code === '=') {
            key.classList.add('active');
            setTimeout(() => key.classList.remove('active'), 100);
            triggerGlowAnimation();
        }
    });
});

window.addEventListener('keydown', e => {
    const key = e.key === 'Enter' ? '=' : e.key;
    if (/[0-9+\-*/.=]/.test(key) || key === 'Backspace') {
        handleInput(key);
        const keyElement = document.querySelector(`.key[data-code="${key}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
            setTimeout(() => keyElement.classList.remove('active'), 100);
            if (key === '=') {
                triggerGlowAnimation();
            }
        }
    }
});

function handleInput(input) {
    if (input === 'C') {
        currentInput = '';
    } else if (input === '=') {
        try {
            currentInput = eval(currentInput).toString();
        } catch {
            currentInput = 'Error';
        }
    } else if (input === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput += input;
    }
    display.textContent = currentInput || '0';
}

function triggerGlowAnimation() {
    const centerX = keyboard.offsetWidth / 2;
    const centerY = keyboard.offsetHeight / 2;

    keys.forEach(key => {
        const rect = key.getBoundingClientRect();
        const keyX = rect.left + rect.width / 2;
        const keyY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(centerX - keyX, 2) + Math.pow(centerY - keyY, 2));

        setTimeout(() => {
            key.style.setProperty('--color', 'hsl(120, 80%, 60%)');
            key.classList.add('active');
            setTimeout(() => {
                key.classList.remove('active');
                key.style.removeProperty('--color');
            }, 200);
        }, distance * 0.5);
    });
}