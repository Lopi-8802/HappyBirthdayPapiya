// --- PASSCODE LOGIN LOGIC (Passcode: 1013) ---
const CORRECT_PASSCODE = "1111";
let currentInput = "";

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index < currentInput.length) dot.classList.add('filled');
        else dot.classList.remove('filled');
    });
}

function pressKey(key) {
    // Attempt to trigger background music if element exists
    const music = document.getElementById('bg-music');
    if (music && music.paused) {
        music.play().catch(e => console.log("Audio autoplay restricted: ", e));
    }

    if (currentInput.length < 4) {
        currentInput += key;
        updateDots();
    }
    if (currentInput.length === 4) {
        setTimeout(() => {
            if (currentInput === CORRECT_PASSCODE) {
                nextScreen('screen-lock', 'screen-countdown');
                startCountdown();
            } else {
                nextScreen('screen-lock', 'screen-wrong-passcode');
            }
            currentInput = "";
            updateDots();
        }, 300);
    }
}

// --- COUNTDOWN SYSTEM & CLEAR HEARTS GENERATOR ---
let clearHeartsInterval;

function startCountdown() {
    const countdownNum = document.getElementById('countdown-num');
    const countdownScreen = document.getElementById('screen-countdown');
    let count = 3;
    countdownNum.textContent = count;
    
    startClearHeartsRain();

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownNum.textContent = count;
        } else {
            clearInterval(interval);
            stopClearHeartsRain();
            
            countdownScreen.classList.remove('active');
            document.getElementById('screen-welcome').classList.add('active');
        }
    }, 1000);
}

function startClearHeartsRain() {
    const container = document.getElementById('bg-hearts');
    
    spawnOneClearHeart(container);
    clearHeartsInterval = setInterval(() => {
        spawnOneClearHeart(container);
    }, 120);
}

function spawnOneClearHeart(parent) {
    const heart = document.createElement('div');
    heart.classList.add('clear-heart');
    heart.style.left = Math.random() * 100 + '%';
    const size = Math.random() * 10 + 18;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    
    heart.style.setProperty('--pseudo-size', size + 'px');
    
    heart.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
    parent.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

function stopClearHeartsRain() {
    clearInterval(clearHeartsInterval);
}

// --- SCREEN TRANSITION SYSTEM ---
function nextScreen(currentId, nextId) {
    document.getElementById(currentId).classList.remove('active');
    document.getElementById(nextId).classList.add('active');
      // ADD THIS NEW CHECK AT THE BOTTOM OF THE FUNCTION:
    if (nextScreenId === 'screen-gift') { // Replace 'screen-gift' with the actual ID of your last screen
        const finalImg = document.getElementById('final-surprise-img');
        if (finalImg && finalImg.getAttribute('data-src')) {
            // Push the real URL into the src attribute right as the screen loads
            finalImg.src = finalImg.getAttribute('data-src');
            finalImg.style.display = 'block'; 
        }
    }
}

// --- GAME 1: BALLOON POPPING (FIXED ORDER) ---
let poppedCount = 0;
const targetWords = ["You", "Are", "So", "Special!"];
const revealedWords = ["", "", "", ""];

function popBalloon(element, index) {
    if (!element.classList.contains('popped')) {
        element.classList.add('popped');
        poppedCount++;
        revealedWords[index] = targetWords[index];
        
        const currentSentence = revealedWords.filter(word => word !== "").join(" ");
        document.getElementById('pop-text').textContent = currentSentence;

        if (poppedCount === 4) {
            document.getElementById('balloon-next-btn').style.display = 'inline-block';
        }
    }
}

// --- GAME 2: BLOWING CANDLE ---
function blowCandle() {
    const flame = document.getElementById('cake-flame');
    if (!flame.classList.contains('out')) {
        flame.classList.add('out');
        document.getElementById('candle-instruction').innerHTML = "Close your eyes & make a wish! ✨";
        document.getElementById('candle-next-btn').style.display = 'inline-block';
    }
}

// --- GAME 3: OPEN ENVELOPE ---
function openEnvelope() {
    const env = document.getElementById('envelope');
    env.classList.add('open');
    setTimeout(() => {
        document.getElementById('letter-next-btn').style.display = 'inline-block';
    }, 600);
}

// --- GAME 4: GIFT BOX OPENING ---
function openGift() {
    document.getElementById('gift-box-element').style.display = 'none';
    document.getElementById('gift-surprise-img').style.display = 'block';
    document.getElementById('gift-heading').textContent = "Happy Birthday Once Again!";
    document.getElementById('gift-subtext').style.display = 'block';
    document.getElementById('restart-btn').style.display = 'inline-block';
}

// --- UTILITY: AMBIENT BG HEARTS ---
function generateFallingHearts() {
    const container = document.getElementById('bg-hearts');
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(heart);
    }
}

function restartApp() {
    location.reload();
}

window.addEventListener('DOMContentLoaded', generateFallingHearts);
