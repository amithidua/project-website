// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('day-mode')) {
            body.classList.remove('day-mode');
            body.classList.add('night-mode');
            localStorage.setItem('theme', 'night');
        } else {
            body.classList.remove('night-mode');
            body.classList.add('day-mode');
            localStorage.setItem('theme', 'day');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
    }

    // Butterfly Animation on Scroll
    const butterflies = document.querySelectorAll('.butterfly');
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        butterflies.forEach(function(butterfly, index) {
            const speed = 0.3 + (index * 0.1);
            const rotation = scrollY * speed;
            butterfly.style.transform = `rotate(${rotation % 360}deg)`;
        });
    });

    // Fairy Dust Cursor Effect
    const fairyDust = document.getElementById('fairy-dust');
    const dustParticles = [];
    const particleColors = ['#FFB3BA', '#B5EAD7', '#C3B1E1', '#FFD700'];
    const nightParticleColors = ['#862A33', '#2A6B54', '#483D64', '#A289DC'];

    function createDustParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 8 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        
        // Choose color based on theme
        let colors = body.classList.contains('night-mode') ? nightParticleColors : particleColors;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = Math.random() * 0.5 + 0.5;
        particle.style.pointerEvents = 'none';
        
        // Add glow effect
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${particle.style.backgroundColor}`;
        
        fairyDust.appendChild(particle);
        
        const speedX = Math.random() * 4 - 2;
        const speedY = Math.random() * 4 - 2;
        const life = Math.random() * 1000 + 500;
        
        dustParticles.push({
            element: particle,
            x: x,
            y: y,
            speedX: speedX,
            speedY: speedY,
            life: life,
            timestamp: Date.now()
        });
    }

    document.addEventListener('mousemove', function(e) {
        // Create 2-5 particles for each mouse movement
        const particleCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < particleCount; i++) {
            createDustParticle(e.clientX, e.clientY);
        }
    });

    function animateDustParticles() {
        const currentTime = Date.now();
        
        for (let i = 0; i < dustParticles.length; i++) {
            const particle = dustParticles[i];
            const age = currentTime - particle.timestamp;
            
            if (age > particle.life) {
                fairyDust.removeChild(particle.element);
                dustParticles.splice(i, 1);
                i--;
                continue;
            }
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            
            // Fade out based on age
            const opacity = 1 - (age / particle.life);
            particle.element.style.opacity = opacity;
        }
        
        requestAnimationFrame(animateDustParticles);
    }

    animateDustParticles();

    // Fairy Animation
    const fairy = document.querySelector('.fairy');
    
    fairy.addEventListener('click', function() {
        fairy.classList.add('fairy-wink');
        
        // Create a burst of fairy dust
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 20;
            const x = fairy.offsetLeft + fairy.offsetWidth / 2 + Math.cos(angle) * distance;
            const y = fairy.offsetTop + fairy.offsetHeight / 2 + Math.sin(angle) * distance;
            
            setTimeout(function() {
                createDustParticle(x, y);
            }, i * 50);
        }
        
        setTimeout(function() {
            fairy.classList.remove('fairy-wink');
        }, 300);
    });

    // Skill cards animation
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            // Create sparkle effect when hovering over skill cards
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * (rect.width / 2 - 10);
                    const sparkleX = centerX + Math.cos(angle) * distance;
                    const sparkleY = centerY + Math.sin(angle) * distance;
                    
                    createDustParticle(sparkleX, sparkleY);
                }, i * 100);
            }
        });
    });
});
