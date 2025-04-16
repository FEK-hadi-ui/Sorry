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

// Create firework explosion
function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    document.body.appendChild(firework);
    
    // Random color
    const colors = ['#e94d58', '#f3a2a9', '#ffb6c1', '#9b6b9d', '#b4869f'];
    firework.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Animate explosion
    firework.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(30)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    // Remove after animation
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

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

// Create sparkles effect
function createSparkles() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            
            document.body.appendChild(sparkle);
            
            // Remove after animation completes
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, i * 200);
    }
}

// Create butterflies
function createButterflies() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const butterfly = document.createElement('div');
            butterfly.className = 'butterfly';
            
            // Random vertical position
            const y = Math.random() * window.innerHeight * 0.7;
            butterfly.style.top = y + 'px';
            
            // Random animation duration
            const duration = 15 + Math.random() * 10;
            butterfly.style.animationDuration = duration + 's';
            
            document.body.appendChild(butterfly);
            
            // Remove after animation
            setTimeout(() => {
                butterfly.remove();
            }, duration * 1000);
        }, i * 3000);
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
yesBtn.addEventListener("click", function() {
    question.innerHTML = "MERI JAAN";
    
    // Larger embedded Google Drive frame with no borders
    gif.innerHTML = '<iframe src="https://drive.google.com/file/d/1CMFVnBT34sHlBSRI2wbdRqcQ5llQRXHT/preview" width="100%" height="100%" allow="autoplay" style="border: none; border-radius: 0; height: 70vh;" class="google-drive-photo"></iframe>';
    
    // Create falling hearts
    createFallingHearts();
    
    // Create multiple visual effects
    createSparkles();
    createButterflies();
    
    // Create flowers and hearts at regular intervals
    const intervalId = setInterval(() => {
        createFlowersAndHearts(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        );
        
        // Random fireworks
        if (Math.random() > 0.7) {
            createFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }
    }, 300);
    
    // Stop effects after 5 seconds
    setTimeout(() => {
        clearInterval(intervalId);
    }, 5000);
    
    // Make message button visible
    messageContainer.style.display = "block";
    setTimeout(() => {
        messageContainer.classList.add("visible");
    }, 10);
    
    // Hide buttons
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
});

// Message button click handler
messageBtn.addEventListener("click", function() {
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
                <p>Go On a Date with me</p>
                <a href="tel:+923156909969" class="phone-link">+971 567 811 986</a>
            </div>
        </div>
        <button class="modal-close-btn">Close</button>
    `;
    
    document.body.appendChild(modalContainer);
    modalContainer.appendChild(modalContent);
    
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

// No button hover handler - make it move away when hovered
noBtn.addEventListener("mouseover", function() {
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - noBtnRect.width;
    const maxY = window.innerHeight - noBtnRect.height;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});

// Prevent default click on No button
noBtn.addEventListener("click", function(e) {
    e.preventDefault();
    
    // Make the button move anyway
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - noBtnRect.width;
    const maxY = window.innerHeight - noBtnRect.height;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    
    return false;
});
