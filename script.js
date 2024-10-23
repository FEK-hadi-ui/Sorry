// DOM Elements
const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".tenor-gif-embed");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const messageContainer = document.querySelector(".message-button-container");
const messageBtn = document.querySelector(".message-btn");
const timerContainer = document.querySelector(".timer-container");
const timeDisplay = document.getElementById("time-display");

// Timer variables
let startTime;
let timerInterval;

// Create styles for effects
const effectStyles = `
    <style>
    /* Firework styles */
    .firework {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 6px;
        background: #e94d58;
        border-radius: 50%;
        pointer-events: none;
        z-index: 2000;
    }

    /* Rain styles */
    .raindrop {
        position: fixed;
        pointer-events: none;
        width: 2px;
        height: 100px;
        background: linear-gradient(transparent, #00f9);
        z-index: 1000;
    }

    @keyframes fall {
        0% {
            transform: translateY(-100vh);
        }
        100% {
            transform: translateY(100vh);
        }
    }

    @keyframes explode {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(30);
            opacity: 0;
        }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', effectStyles);

// Timer function
function updateTimer() {
    const currentTime = new Date();
    const timeDifference = currentTime - startTime;
    
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to start timer
function startTimer() {
    startTime = new Date();
    timerContainer.style.display = "block";
    setTimeout(() => {
        timerContainer.classList.add("visible");
    }, 10);
    
    timerInterval = setInterval(updateTimer, 1000);
}

// Firework effect function
function createFirework(x, y) {
    const colors = ['#e94d58', '#ff0', '#ffa500', '#ff69b4'];
    
    for (let i = 0; i < 30; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];
        firework.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
        
        const angle = (Math.random() * Math.PI * 2);
        const velocity = 50 + Math.random() * 50;
        const xVelocity = Math.cos(angle) * velocity;
        const yVelocity = Math.sin(angle) * velocity;
        
        document.body.appendChild(firework);
        
        let opacity = 1;
        let scale = 1;
        
        const animate = () => {
            firework.style.transform = `translate(${xVelocity * scale}px, ${yVelocity * scale}px) scale(${scale})`;
            firework.style.opacity = opacity;
            
            opacity -= 0.02;
            scale += 0.05;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                firework.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Rain effect function
function createRain() {
    const rainContainer = document.createElement('div');
    rainContainer.style.position = 'fixed';
    rainContainer.style.top = '0';
    rainContainer.style.left = '0';
    rainContainer.style.width = '100%';
    rainContainer.style.height = '100%';
    rainContainer.style.pointerEvents = 'none';
    rainContainer.style.zIndex = '999';
    
    for (let i = 0; i < 100; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = Math.random() * 100 + 'vw';
        raindrop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        raindrop.style.animation = 'fall linear infinite';
        raindrop.style.opacity = Math.random() * 0.3 + 0.2;
        rainContainer.appendChild(raindrop);
    }
    
    document.body.appendChild(rainContainer);
    
    return rainContainer;
}

// Yes button click handler
yesBtn.addEventListener("click", () => {
    question.innerHTML = "You don't know how happy hadi will be";
    gif.innerHTML = '<iframe src="https://giphy.com/embed/gJiwjhuYhvpUJf0YTr" width="480" height="269" style="width:100%;height:auto;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/showtv-show-tv-ierde-aatay-ulusoy-gJiwjhuYhvpUJf0YTr">via GIPHY</a></p>';
    messageContainer.style.display = "block";
    
    // Start the timer
    startTimer();
    
    // Create multiple fireworks
    const intervalId = setInterval(() => {
        createFirework(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        );
    }, 300);
    
    // Stop fireworks after 5 seconds
    setTimeout(() => {
        clearInterval(intervalId);
    }, 5000);
    
    setTimeout(() => {
        messageContainer.classList.add("visible");
    }, 10);
    
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
});

// Message button click handler
messageBtn.addEventListener("click", () => {
    const rainContainer = createRain();
    showSpecialMessage();
    
    // Remove rain effect after modal is closed
    const closeBtn = document.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            rainContainer.remove();
            if (timer
