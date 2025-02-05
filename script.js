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

// Yes button click handler
yesBtn.addEventListener("click", () => {
    question.innerHTML = "yusra :(";
    gif.innerHTML = '<iframe src="https://giphy.com/embed/jL8Pnjy66JYVa" width="480" height="269" style="width:100%;height:auto;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/disney-jL8Pnjy66JYVa">via GIPHY</a></p>';
    messageContainer.style.display = "block";
    
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
        <div class="message-text" style="line-height: 1.8; margin-bottom: 25px; text-align: left;">
            I Know you are tired both physically and mentally and i know i just keep making everything worse for you, im sorry im sorry for being like this i try to change but that
            im failing yusra, i dont know what to do im afraid that im not making this any better, i dont want to lose you i dont want you to go, im afraid one day you will stop,
            im afraid kuch farq nhi paray ga yusra ko, YUSRA PLEASE COME BACK AND PLEASE COMMUNICATE, YOU ARE NOT BURI, YOU ARE NOT AN ASSHOLE, I AM THE ASSHOLE FOR NOT APPRECIATING YOU,
            <br><br>
            PLEASE ILL DO EVERYTHING TO MAKE THIS RIGHT, YUSRA I LOVE YOU AND YOU ARE LITERALLY EVERYTHING THAT IS GOOD IN MY LIFE AND I DONT WANT TO LOSE MY ONLY YUSRA MY ONLY REASON THAT MAKES ME WANT TO BE HAPPY 
            <br><br>
            YOU ARE A PART OF ME AND EVERYTHING THAT MAKES HADI HADI, WITHOUT YOU IM JUST A JAHIL SERAIKI, YOU MAKE ME HAPPY AND YOU COMPLETE MY LIFE AND AND YUSRA AS MUCH AS I MISS YOU AND LOVE YOU EVERY SECOND, I WILL NOT MAKE IT ANYMORE EXHAUSTING, SO PLEASE COME BACK TO THE YUSRA THAT HAS SO MANY PERSONALITIES AND EACH ONE IS SOMETHING I LOVE MORE THAN EVERYTHING IN THE WORLD
            <br><br>
            I know i say this har dfa but please trust me on this and please help me on this :/
            <br><br>
            <div style="text-align: center; margin-top: 15px; font-weight: bold; color: #e94d58;">
                Please call me or message me,im dying for you:<br>
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
