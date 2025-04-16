// DOM Elements
const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif-container");
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

    /* Flower and Heart styles */
    .flower, .heart {
        position: fixed;
        pointer-events: none;
        z-index: 1000;
        animation: float 6s ease-in infinite;
    }

    .flower {
        font-size: 2rem;
    }

    .heart {
        font-size: 1.5rem;
        color: #e94d58;
    }

    @keyframes float {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x), var(--end-y)) rotate(360deg);
            opacity: 0;
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

// Flower and Heart effect function
function createFlowersAndHearts(x, y) {
    const flowers = ['🌸', '🌺', '🌹', '🌷', '💐'];
    const hearts = ['❤️', '💖', '💝', '💕', '💓'];
    
    for (let i = 0; i < 3; i++) {
        // Create flower
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = x + 'px';
        flower.style.top = y + 'px';
        
        // Random end position
        const endX = (Math.random() - 0.5) * 200;
        const endY = -Math.random() * 300;
        flower.style.setProperty('--end-x', `${endX}px`);
        flower.style.setProperty('--end-y', `${endY}px`);
        
        document.body.appendChild(flower);
        
        // Create heart
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = (x + Math.random() * 50) + 'px';
        heart.style.top = (y + Math.random() * 50) + 'px';
        
        // Random end position for heart
        const heartEndX = (Math.random() - 0.5) * 200;
        const heartEndY = -Math.random() * 300;
        heart.style.setProperty('--end-x', `${heartEndX}px`);
        heart.style.setProperty('--end-y', `${heartEndY}px`);
        
        document.body.appendChild(heart);
        
        // Remove elements after animation
        setTimeout(() => {
            flower.remove();
            heart.remove();
        }, 6000);
    }
}

// Create falling hearts animation
function createFallingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'falling-hearts-container';
    document.body.appendChild(heartsContainer);
    
    // Create hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.innerHTML = '❤️';
            
            // Random position
            const startPositionX = Math.random() * window.innerWidth;
            heart.style.left = startPositionX + 'px';
            heart.style.top = '-50px';
            
            // Random size
            const size = Math.random() * 20 + 10;
            heart.style.fontSize = size + 'px';
            
            // Random animation duration
            const duration = Math.random() * 3 + 3;
            heart.style.animationDuration = duration + 's';
            
            // Add to container
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }, i * 100);
    }
    
    // Remove container after all hearts are done
    setTimeout(() => {
        heartsContainer.remove();
    }, 8000);
}

// Yes button click handler
yesBtn.addEventListener("click", () => {
    question.innerHTML = "yusra :(";
    gif.innerHTML = '<iframe src="https://drive.google.com/file/d/1CMFVnBT34sHlBSRI2wbdRqcQ5llQRXHT/preview" width="100%" height="350" allow="autoplay" style="border: none; border-radius: 12px;"></iframe>';
    messageContainer.style.display = "block";
    
    // Create falling hearts
    createFallingHearts();
    
    // Create flowers and hearts at regular intervals
    const intervalId = setInterval(() => {
        createFlowersAndHearts(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        );
    }, 300);
    
    // Stop effects after 5 seconds
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
    showSpecialMessage();
});

function showSpecialMessage() {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalContent.innerHTML = `
        <div class="message-text">
            <h2 class="message-heading">My dearest Yusra,</h2>
            <p>I wanted to write you this letter to tell you something simple, yet something that feels too big for words—I am so incredibly lucky to have you in my life.</p>
            <p>From the way you talk to the way you care, from your strength to your softness, you've become a part of me I never want to be without. I know I've caused problems, I've said the wrong things, acted the wrong way, and made you feel things you didn't deserve to feel. For all of that, I am truly sorry. If I could take away every moment that hurt you and replace it with nothing but love and warmth, I would do it in a heartbeat.</p>
            <p>But even through the worst of it, you've stayed. You've cared. You've been there in ways that not everyone would be. That means more to me than I'll ever be able to express. Thank you—thank you for being in my life, for being patient with me, for being someone I can fight for, grow with, and hold close forever.</p>
            <p>You make my world feel full. You make everything better just by being in it. And I don't just love you—I love you with every part of me that knows how to love. I love you with my words, my actions, my silence, and my chaos. My heart may be flawed, but it is entirely yours.</p>
            <p class="signature">Forever grateful, <strong>Haadi</strong></p>
            <div class="contact-info">
                <p>Please call me or message me, I'm missing you:</p>
                <a href="tel:+971567811986" class="phone-link">+971 567 811 986</a>
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
                background-image: linear-gradient(to bottom, rgba(255,255,255,0.97), rgba(255,255,255,0.97)), 
                                  url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-15c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z' fill='%23f3d8e6' fill-opacity='0.4'/%3E%3C/svg%3E");
                padding: 2.5rem;
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                transform: translateY(20px);
                transition: transform 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(155, 107, 157, 0.3);
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
                line-height: 1.8;
                margin-bottom: 25px;
                text-align: left;
            }
            .message-heading {
                color: #9b6b9d;
                font-size: 1.8em;
                margin-bottom: 20px;
                font-weight: normal;
                letter-spacing: 0.5px;
                text-align: center;
            }
            .message-text p {
                margin-bottom: 15px;
            }
            .signature {
                text-align: right;
                font-style: italic;
                margin-top: 30px;
                font-size: 1.2em;
            }
            .contact-info {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid rgba(155, 107, 157, 0.3);
            }
            .phone-link {
                display: inline-block;
                margin-top: 10px;
                color: #9b6b9d;
                font-size: 1.2em;
                text-decoration: none;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            .phone-link:hover {
                color: #b4869f;
                transform: scale(1.05);
            }
            .modal-close-btn {
                background: #9b6b9d;
                color: white;
                padding: 12px 30px;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-size: 1.1em;
                transition: all 0.3s ease;
                margin-top: 20px;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            .modal-close-btn:hover {
                background: #b4869f;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(155, 107, 157, 0.3);
            }
            @media (max-width: 600px) {
                .modal-content {
                    padding: 1.5rem;
                }
                .message-text {
                    font-size: 1em;
                }
                .message-heading {
                    font-size: 1.5em;
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
