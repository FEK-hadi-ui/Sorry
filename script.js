// Constants
const CONSTANTS = {
  COLORS: ['#e94d58', '#ff0', '#ffa500', '#ff69b4'],
  ANIMATION_DURATION: 5000,
  FIREWORK_INTERVAL: 300,
  FIREWORK_COUNT: 30,
  FLOWER_COUNT: 50,
  HEART_COUNT: 50,
  MESSAGES: {
    SUCCESS: "You don't know how happy hadi will be",
    PHONE: '+971 567 811 986'
  },
  EMOJIS: {
    FLOWERS: ['🌸', '🌺', '🌹', '🌷', '💐', '🌻'],
    HEARTS: ['❤️', '💖', '💝', '💕', '💗', '💓']
  }
};

// DOM Elements with error handling
const elements = {
  init() {
    try {
      this.wrapper = document.querySelector(".wrapper");
      this.question = document.querySelector(".question");
      this.gif = document.querySelector(".tenor-gif-embed");
      this.yesBtn = document.querySelector(".yes-btn");
      this.noBtn = document.querySelector(".no-btn");
      this.messageContainer = document.querySelector(".message-button-container");
      this.messageBtn = document.querySelector(".message-btn");

      if (!this.yesBtn || !this.noBtn || !this.messageBtn) {
        throw new Error('Required button elements not found');
      }
    } catch (error) {
      console.error('Error initializing elements:', error);
    }
  }
};

// Effects Manager
class EffectsManager {
  static init() {
    this.injectStyles();
  }

  static injectStyles() {
    const styles = `
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

      .floating-emoji {
        position: fixed;
        pointer-events: none;
        font-size: 24px;
        z-index: 1000;
        animation: float 6s linear infinite;
        opacity: 0;
      }

      @keyframes float {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) rotate(360deg);
          opacity: 0;
        }
      }

      @keyframes sway {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(30px); }
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  static createFirework(x, y) {
    Array.from({ length: CONSTANTS.FIREWORK_COUNT }).forEach(() => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        background: ${CONSTANTS.COLORS[Math.floor(Math.random() * CONSTANTS.COLORS.length)]};
      `;

      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 50;
      const xVelocity = Math.cos(angle) * velocity;
      const yVelocity = Math.sin(angle) * velocity;

      document.body.appendChild(firework);
      this.animateFirework(firework, xVelocity, yVelocity);
    });
  }

  static animateFirework(element, xVelocity, yVelocity) {
    let opacity = 1;
    let scale = 1;

    const animate = () => {
      element.style.transform = `translate(${xVelocity * scale}px, ${yVelocity * scale}px) scale(${scale})`;
      element.style.opacity = opacity;

      opacity -= 0.02;
      scale += 0.05;

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        element.remove();
      }
    };

    requestAnimationFrame(animate);
  }

  static createFlowersAndHearts() {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999;
    `;

    const createEmoji = (emoji) => {
      const element = document.createElement('div');
      element.className = 'floating-emoji';
      element.textContent = emoji;
      element.style.cssText = `
        left: ${Math.random() * 100}vw;
        animation-duration: ${3 + Math.random() * 4}s;
        animation-delay: ${Math.random() * 2}s;
        transform: scale(${0.5 + Math.random() * 0.5});
      `;
      return element;
    };

    // Create flowers
    Array.from({ length: CONSTANTS.FLOWER_COUNT }).forEach(() => {
      const flower = createEmoji(
        CONSTANTS.EMOJIS.FLOWERS[Math.floor(Math.random() * CONSTANTS.EMOJIS.FLOWERS.length)]
      );
      container.appendChild(flower);
    });

    // Create hearts
    Array.from({ length: CONSTANTS.HEART_COUNT }).forEach(() => {
      const heart = createEmoji(
        CONSTANTS.EMOJIS.HEARTS[Math.floor(Math.random() * CONSTANTS.EMOJIS.HEARTS.length)]
      );
      container.appendChild(heart);
    });

    document.body.appendChild(container);
    return container;
  }
}

// Modal Manager
class ModalManager {
  static showMessage(message, onClose) {
    const modal = this.createModal(message);
    document.body.appendChild(modal);

    requestAnimationFrame(() => modal.classList.add('visible'));

    const closeBtn = modal.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('visible');
      setTimeout(() => {
        modal.remove();
        if (onClose) onClose();
      }, 300);
    });
  }

  static createModal(messageContent) {
    const container = document.createElement('div');
    container.className = 'modal-container';
    container.innerHTML = `
      <div class="modal-content">
        <div class="message-text">
          ${messageContent}
          <div class="contact-info">
            Please message me on WhatsApp:<br>
            <a href="tel:${CONSTANTS.MESSAGES.PHONE}">${CONSTANTS.MESSAGES.PHONE}</a>
          </div>
        </div>
        <button class="modal-close-btn">Close</button>
      </div>
    `;
    return container;
  }
}

// Event Handlers
function handleYesClick() {
  elements.question.innerHTML = CONSTANTS.MESSAGES.SUCCESS;
  elements.gif.innerHTML = '<iframe src="https://giphy.com/embed/jL8Pnjy66JYVa" width="480" height="269" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/disney-jL8Pnjy66JYVa">via GIPHY</a></p>';
  
  elements.messageContainer.style.display = "block";
  elements.yesBtn.style.display = "none";
  elements.noBtn.style.display = "none";

  const fireworkInterval = setInterval(() => {
    EffectsManager.createFirework(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight
    );
  }, CONSTANTS.FIREWORK_INTERVAL);

  setTimeout(() => {
    clearInterval(fireworkInterval);
  }, CONSTANTS.ANIMATION_DURATION);

  setTimeout(() => {
    elements.messageContainer.classList.add("visible");
  }, 10);
}

function handleNoButtonHover(event) {
  const btn = event.target;
  const maxX = window.innerWidth - btn.offsetWidth;
  const maxY = window.innerHeight - btn.offsetHeight;

  btn.style.position = 'fixed';
  btn.style.left = Math.floor(Math.random() * maxX) + "px";
  btn.style.top = Math.floor(Math.random() * maxY) + "px";
}

// Initialize
function init() {
  elements.init();
  EffectsManager.init();

  // Event Listeners
  elements.yesBtn.addEventListener("click", handleYesClick);
  elements.noBtn.addEventListener("mouseover", handleNoButtonHover);
  elements.noBtn.addEventListener("click", (e) => e.preventDefault());
  
  elements.messageBtn.addEventListener("click", () => {
    const effectsContainer = EffectsManager.createFlowersAndHearts();
    ModalManager.showMessage(
      `I Know you are tired both physically and mentally and i know i just keep making everything worse for you, im sorry im sorry for being like this i try to change but that
      im failing yusra, i dont know what to do im afraid that im not making this any better, i dont want to lose you i dont want you to go, im afraid one day you will stop,
      im afraid kuch farq nhi paray ga yusra ko, YUSRA PLEASE COME BACK AND PLEASE COMMUNICATE, YOU ARE NOT BURI, YOU ARE NOT AN ASSHOLE, I AM THE ASSHOLE FOR NOT APPRECIATING YOU,
PLEASE ILL DO EVERYTHING TO MAKE THIS RIGHT, YUSRA I LOVE YOU AND YOU ARE LITERALLY EVERYTHING THAT IS GOOD IN MY LIFE AND I DONT WANT TO LOSE MY ONLY YUSRA MY ONLY REASON THAT MAKES ME WANT TO BE HAPPY 
YOU ARE A PART OF ME AND EVERYTHING THAT MAKES HADI HADI, WITHOUT YOU IM JUST A JAHIL SERAIKI, YOU MAKE ME HAPPY AND YOU COMPLETE MY LIFE AND AND YUSRA AS MUCH AS I MISS YOU AND LOVE YOU EVERY SECOND, I WILL NOT MAKE IT ANYMORE EXHAUSTING, SO PLEASE COME BACK TO THE YUSRA THAT HAS SO MANY PERSONALITIES AND EACH ONE IS SOMETHING I LOVE MORE THAN EVERYTHING IN THE WORLD`, // Your full message here
      () => effectsContainer.remove()
    );
  });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
