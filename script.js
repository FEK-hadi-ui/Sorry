// DOM Elements
const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".tenor-gif-embed");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const messageContainer = document.querySelector(".message-button-container");
const messageBtn = document.querySelector(".message-btn");

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
        });
    }
});

function showSpecialMessage() {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalContent.innerHTML = `
        <div class="message-text" style="line-height: 1.8; margin-bottom: 25px; text-align: left;">
            I’m not sure if I’ll be here when you come back, and I don’t know what the future holds for my surgery or if it will be successful. But if you happen to see this, please know that I am holding onto hope for the day you return.
            <br><br>
            I am still looking for you, still waiting i check this website everyday and i see you everyday and and all i get are bad dreams reallyy bad  .
            <br><br>
            I miss you more than words can express. I promise to reignite the spark you once had and make it shine brighter than ever. You mean the world to me, and I want you to know that.

You mentioned I never opened up with you, and I realize now how true that is. I was afraid that if I shared my true self, you might not like me, and I couldn’t bear the thought of losing you. But I want to change that.

You said, “I’m not the girl,” but I need you to know that you are the girl. Please come back. I’m here, ready to show you just how special you are to me and how much you mean in my life.
            <br><br>
            <div style="text-align: center; margin-top: 15px; font-weight: bold; color: #e94d58;">
                Please message me on WhatsApp:<br>
                <a href="tel:+971567811986" style="color: #e94d58; text-decoration: none;">+971 567 811 986</a>
            </div>
        </div>
        <button class="modal-close-btn">Close</button>
    `;
    
    const modalStyles = `
        <style>
            .modal-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
                padding: 20px;
            }
            .modal-content {
                background: white;
                padding: 2.5rem;
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                transform: translateY(20px);
                transition: transform 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            .modal-container.visible {
                opacity: 1;
            }
            .modal-container.visible .modal-content {
                transform: translateY(0);
            }
            .message-text {
                font-size: 1.1em;
                color: #333;
            }
            .modal-close-btn {
                background: #e94d58;
                color: white;
                padding: 12px 30px;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-size: 1.1em;
                transition: all 0.3s ease;
                margin-top: 20px;
            }
            .modal-close-btn:hover {
                background: #d43d47;
                transform: translateY(-2px);
            }
            @media (max-width: 600px) {
                .modal-content {
                    padding: 1.5rem;
                }
                .message-text {
                    font-size: 1em;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
    
    setTimeout(() => {
        modalContainer.classList.add('visible');
    }, 10);
    
    const closeBtn = modalContent.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => {
        modalContainer.classList.remove('visible');
        setTimeout(() => {
            modalContainer.remove();
        }, 300);
    });
}

// No button hover handler
noBtn.addEventListener("mouseover", () => {
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - noBtnRect.width;
    const maxY = window.innerHeight - noBtnRect.height;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});

// Prevent default click on No button
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    return false;
});
