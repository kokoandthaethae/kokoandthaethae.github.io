// Password functionality
const passwordScreen = document.getElementById('password-screen');
const homeScreen = document.getElementById('home-screen');
const portfolioSection = document.getElementById('portfolio');
const passwordInput = document.querySelector('.password-input');
const submitBtn = document.querySelector('.submit-btn');
const errorMessage = document.querySelector('.error-message');
const heartsContainer = document.getElementById('hearts-container');
const backBtn = document.querySelector('.back-btn');

// Our special password
const correctPassword = "2482025";

submitBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

function checkPassword() {
    if (passwordInput.value === correctPassword) {
        // Create hearts animation
        heartsContainer.style.display = 'block';
        createHearts();
        
        // Hide password screen and show home screen
        setTimeout(() => {
            passwordScreen.style.opacity = '0';
            setTimeout(() => {
                passwordScreen.style.display = 'none';
                homeScreen.style.display = 'flex';
                startAnniversaryCounter(); // Start the anniversary counter
            }, 1000);
        }, 2000);
    } else {
        errorMessage.style.display = 'block';
        passwordInput.style.borderColor = '#ff6b6b';
        passwordInput.value = '';
    }
}

// Create falling hearts
function createHearts() {
    const heartIcons = ['❤️', '💖', '💕', '💗', '💓', '💘', '💞'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, i * 100);
    }
}

// Anniversary counter functionality
function startAnniversaryCounter() {
    // Set your anniversary date here (YYYY, MM-1, DD)
    const anniversaryDate = new Date(2025, 7, 24); // August 24, 2025
    const loveQuotes = [
        "Every moment with you is a blessing",
        "I love you more with each passing day",
        "You are my sunshine on a cloudy day",
        "My heart is and always will be yours",
        "Growing old with you is my greatest dream",
        "You make my heart skip a beat",
        "I fall in love with you every day"
    ];
    
    function updateCounter() {
        const now = new Date();
        const diff = now - anniversaryDate;
        
        // Calculate time units
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30.44); // Average month length
        const years = Math.floor(months / 12);
        
        // Update the counter display
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months % 12;
        document.getElementById('days').textContent = Math.floor(days % 30.44);
        document.getElementById('hours').textContent = hours % 24;
        document.getElementById('minutes').textContent = minutes % 60;
        document.getElementById('seconds').textContent = seconds % 60;
        
        // Change quote every 10 seconds
        if (seconds % 10 === 0) {
            const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
            document.getElementById('love-quote').textContent = `"${randomQuote}"`;
        }
    }
    
    // Update counter immediately and then every second
    updateCounter();
    setInterval(updateCounter, 1000);
}

// Memory page click events
const memoryPages = document.querySelectorAll('.memory-page');
memoryPages.forEach(page => {
    page.addEventListener('click', function() {
        homeScreen.style.display = 'none';
        portfolioSection.style.display = 'block';
    });
});

// Back button functionality
backBtn.addEventListener('click', function() {
    portfolioSection.style.display = 'none';
    homeScreen.style.display = 'flex';
});

// Video placeholder click
const videoPlaceholder = document.querySelector('.video-placeholder');
videoPlaceholder.addEventListener('click', function() {
    alert("Love story video would play here! ❤️");
});