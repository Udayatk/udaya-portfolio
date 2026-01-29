// ===== ELITE DEVELOPER PORTFOLIO - JAVASCRIPT =====

// GSAP Initialization
gsap.registerPlugin(ScrollTrigger);

// Global Variables
let cursorDot = null;
let cursorOutline = null;
let isLoaded = false;
let currentTheme = localStorage.getItem('theme') || 'dark';

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Set initial page state
    document.body.style.opacity = '0';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    // Show loading screen
    showLoadingScreen();
    
    // Initialize all components
    initializePage();
});

// Loading Screen
function showLoadingScreen() {
    const loadingProgress = document.getElementById('loadingProgress');
    let progress = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(progressInterval);
            setTimeout(() => {
                hideLoadingScreen();
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 150);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 800);
}

// Page Initialization
function initializePage() {
    createCustomCursor();
    initializeNavigation();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeScrollProgress();
    initializeBackToTop();
    initializeHeroAnimations();
    initializeTypewriter();
    initializeCounters();
    initializeScrollAnimations();
    initializeFormHandling();
    createFloatingParticles();
    createNeuralNetwork();
    
    // Fade in the page
    setTimeout(() => {
        gsap.to(document.body, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
                isLoaded = true;
                startHeroAnimations();
            }
        });
    }, 2000);
}

// Custom Cursor
function createCustomCursor() {
    // Create cursor elements
    const cursorDotEl = document.createElement('div');
    cursorDotEl.className = 'cursor-dot';
    
    const cursorOutlineEl = document.createElement('div');
    cursorOutlineEl.className = 'cursor-outline';
    
    document.body.appendChild(cursorDotEl);
    document.body.appendChild(cursorOutlineEl);
    
    cursorDot = cursorDotEl;
    cursorOutline = cursorOutlineEl;
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        gsap.to(cursorDot, {
            x: mouseX,
            y: mouseY,
            duration: 0.1,
            ease: "power2.out"
        });
        
        gsap.to(cursorOutline, {
            x: mouseX,
            y: mouseY,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .skill-tag, .nav-link');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorDot, {
                scale: 2,
                backgroundColor: "#ff6b6b",
                duration: 0.3
            });
            gsap.to(cursorOutline, {
                scale: 1.5,
                borderColor: "#ff6b6b",
                duration: 0.3
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorDot, {
                scale: 1,
                backgroundColor: "#00d4ff",
                duration: 0.3
            });
            gsap.to(cursorOutline, {
                scale: 1,
                borderColor: "rgba(0, 212, 255, 0.5)",
                duration: 0.3
            });
        });
    });
}

// Navigation
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    duration: 1.2,
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Hero Animations
function initializeHeroAnimations() {
    // Initial states
    gsap.set([".hero-greeting", ".hero-description", ".hero-buttons", ".hero-stats"], {
        opacity: 0,
        y: 60
    });
    
    gsap.set(".code-window", {
        opacity: 0,
        scale: 0.8,
        rotationY: 45
    });
    
    gsap.set(".floating-shapes .shape", {
        scale: 0,
        opacity: 0
    });
}

function startHeroAnimations() {
    const tl = gsap.timeline();
    
    // Animate name parts
    tl.to(".name-part", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2
    })
    
    // Animate greeting and other elements
    .to(".hero-greeting", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4")
    
    .to(".hero-description", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4")
    
    .to(".hero-buttons", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.3")
    
    .to(".hero-stats", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.3")
    
    // Animate code window
    .to(".code-window", {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.6")
    
    // Animate floating shapes
    .to(".floating-shapes .shape", {
        scale: 1,
        opacity: 0.1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2
    }, "-=0.8");
    
    // Start typing animation after name animation
    setTimeout(() => {
        startTypewriter();
        startCodeTyping();
        // Start counter animations
        startCounterAnimations();
    }, 1500);
}

// Typewriter Effect
function initializeTypewriter() {
    // Initialize role text
    const roleText = document.querySelector('.role-text');
    if (roleText) {
        roleText.textContent = '';
    }
}

function startTypewriter() {
    const roles = [
        'AI/ML Developer',
        'Python Developer', 
        'Data Science Engineer',
        'Software Engineer',
        'Tech Innovator'
    ];
    
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;
    const roleElement = document.querySelector('.role-text');
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 2000;
    
    function typeRole() {
        const current = roles[currentRole];
        
        if (!isDeleting) {
            roleElement.textContent = current.substring(0, currentChar + 1);
            currentChar++;
            
            if (currentChar === current.length) {
                isDeleting = true;
                setTimeout(typeRole, pauseDuration);
                return;
            }
        } else {
            roleElement.textContent = current.substring(0, currentChar - 1);
            currentChar--;
            
            if (currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % roles.length;
            }
        }
        
        setTimeout(typeRole, isDeleting ? deleteSpeed : typeSpeed);
    }
    
    typeRole();
}

// Code Typing Animation
function startCodeTyping() {
    const codeLines = [
        { text: 'const developer = {', className: 'code-text' },
        { text: '  name: "Elite Developer",', className: 'variable' },
        { text: '  skills: [', className: 'keyword' },
        { text: '    "JavaScript", "React", "Node.js",', className: 'string' },
        { text: '    "Python", "MongoDB", "AWS"', className: 'string' },
        { text: '  ],', className: 'keyword' },
        { text: '  passion: "Building amazing experiences",', className: 'property' },
        { text: '  currentlyLearning: "AI & Machine Learning"', className: 'comment' },
        { text: '};', className: 'code-text' }
    ];
    
    const typingContainer = document.querySelector('.typing-line .code-text');
    if (!typingContainer) return;
    
    let lineIndex = 0;
    let charIndex = 0;
    
    function typeCodeLine() {
        if (lineIndex >= codeLines.length) return;
        
        const currentLine = codeLines[lineIndex];
        
        if (charIndex <= currentLine.text.length) {
            typingContainer.innerHTML = `<span class="${currentLine.className}">${currentLine.text.substring(0, charIndex)}</span>`;
            charIndex++;
            setTimeout(typeCodeLine, 50);
        } else {
            lineIndex++;
            charIndex = 0;
            if (lineIndex < codeLines.length) {
                setTimeout(typeCodeLine, 1000);
            }
        }
    }
    
    typeCodeLine();
}

// Animated Counters
function initializeCounters() {
    // Counter initialization will be handled by startCounterAnimations
}

function startCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, 0, target);
    });
}

function animateCounter(element, start, end, suffix = '') {
    const duration = 2000;
    const increment = end / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        // Special formatting for CGPA
        if (end === 7) {
            element.textContent = (current / 10 * 7.51).toFixed(2);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Scroll Animations
function initializeScrollAnimations() {
    // Fade in animations
    const fadeElements = document.querySelectorAll('.section-header, .about-text, .skill-category, .contact-item, .contact-form, .project-card, .timeline-item');
    
    fadeElements.forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Skill tags animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        gsap.fromTo(tag,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: tag,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                stagger: 0.1
            }
        );
    });
    
    // Project cards hover animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, x: -100 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.2
            }
        );
    });
    
    // Parallax effect for shapes
    gsap.utils.toArray('.shape').forEach(shape => {
        gsap.to(shape, {
            y: -100,
            rotation: 360,
            ease: "none",
            scrollTrigger: {
                trigger: shape,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
    
    // Profile card hover animation
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.addEventListener('mouseenter', () => {
            gsap.to(profileCard, {
                y: -10,
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        profileCard.addEventListener('mouseleave', () => {
            gsap.to(profileCard, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }
}

// Floating Particles
function createFloatingParticles() {
    const particleCount = 50;
    const heroSection = document.querySelector('.hero');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = '#00d4ff';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        
        heroSection.appendChild(particle);
        
        // Animate particles
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            duration: Math.random() * 20 + 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 5
        });
        
        gsap.to(particle, {
            opacity: Math.random() * 0.8 + 0.2,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
        });
    }
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageTextarea = contactForm.querySelector('textarea[name="message"]');
    const submitBtn = contactForm.querySelector('.btn-primary');
    
    // Input focus animations
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Floating label effect
        input.addEventListener('input', () => {
            const label = input.previousElementSibling;
            if (input.value.length > 0) {
                label.style.transform = 'translateY(-25px) scale(0.85)';
                label.style.color = '#00d4ff';
            } else {
                label.style.transform = 'translateY(0) scale(1)';
                label.style.color = '#ffffff';
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate form
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageTextarea.value.trim()) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(emailInput.value)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Animate submit button
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
        
        // Simulate form submission
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            
            // Reset labels
            formInputs.forEach(input => {
                const label = input.previousElementSibling;
                label.style.transform = 'translateY(0) scale(1)';
                label.style.color = '#ffffff';
            });
        }, 2000);
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.color = '#ffffff';
    notification.style.fontFamily = 'Space Grotesk, sans-serif';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(400px)';
    notification.style.transition = 'transform 0.3s ease';
    notification.textContent = message;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4ecdc4, #00d4ff)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a6f)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Button Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('click', () => {
            gsap.to(btn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    });
});

// Responsive Navigation
function initializeMobileMenu() {
    // Add mobile menu functionality if needed
    // This would be implemented based on the mobile menu design
}

// Performance Optimization
function optimizeAnimations() {
    // Reduce animations on low-end devices
    const isLowEndDevice = navigator.hardwareConcurrency < 4 || 
                          navigator.deviceMemory < 4 ||
                          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isLowEndDevice) {
        gsap.globalTimeline.timeScale(2); // Speed up animations
        // Disable some particle effects
        document.querySelectorAll('.floating-shapes .shape').forEach(shape => {
            if (Math.random() > 0.5) {
                shape.style.display = 'none';
            }
        });
    }
}

// Initialize performance optimizations
optimizeAnimations();

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadResources();

// Easter Eggs and Interactive Elements
function addEasterEggs() {
    // Konami Code
    let konamiCode = false;
    let konamiSequence = [];
    const konamiTarget = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', (e) => {
        konamiSequence.push(e.keyCode);
        if (konamiSequence.length > konamiTarget.length) {
            konamiSequence.shift();
        }
        
        if (JSON.stringify(konamiSequence) === JSON.stringify(konamiTarget) && !konamiCode) {
            konamiCode = true;
            activateMatrixMode();
        }
    });
}

function activateMatrixMode() {
    // Add matrix rain effect
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.style.position = 'fixed';
    matrixCanvas.style.top = '0';
    matrixCanvas.style.left = '0';
    matrixCanvas.style.width = '100%';
    matrixCanvas.style.height = '100%';
    matrixCanvas.style.zIndex = '9999';
    matrixCanvas.style.pointerEvents = 'none';
    matrixCanvas.style.opacity = '0.1';
    
    document.body.appendChild(matrixCanvas);
    
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = fontSize + 'px arial';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 35);
    
    setTimeout(() => {
        clearInterval(matrixInterval);
        document.body.removeChild(matrixCanvas);
        showNotification('Matrix mode deactivated! 🔥', 'success');
    }, 10000);
    
    showNotification('Matrix mode activated! 🚀', 'success');
}

// Initialize easter eggs
addEasterEggs();

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    
    // Add smooth transition effect
    gsap.to('body', {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    });
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (!themeIcon) return;
    
    themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
}

// Mobile Navigation
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll Progress
function initializeScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: { y: 0 },
            duration: 1,
            ease: "power2.inOut"
        });
    });
}

// Enhanced Particles Effect
function createFloatingParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and properties
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Random color
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (container.contains(particle)) {
                container.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create particles at intervals
    setInterval(createParticle, 300);
}

// Neural Network Background
function createNeuralNetwork() {
    const container = document.getElementById('neuralNetwork');
    if (!container) return;
    
    // Create nodes
    for (let i = 0; i < 20; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(node);
    }
    
    // Create connections
    for (let i = 0; i < 15; i++) {
        const connection = document.createElement('div');
        connection.className = 'neural-connection';
        connection.style.left = Math.random() * 80 + '%';
        connection.style.top = Math.random() * 100 + '%';
        connection.style.width = (Math.random() * 200 + 50) + 'px';
        connection.style.transform = `rotate(${Math.random() * 360}deg)`;
        connection.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(connection);
    }
}

// Window resize handler
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
    
    // Update neural network on resize
    const neuralNetwork = document.getElementById('neuralNetwork');
    if (neuralNetwork) {
        neuralNetwork.innerHTML = '';
        createNeuralNetwork();
    }
});