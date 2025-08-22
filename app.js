// Resume Website Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Active navigation link highlighting
    initNavigationHighlighting();
    
    // Scroll animations
    initScrollAnimations();
    
    // Navbar background on scroll
    initNavbarScroll();
    
    // Typing animation for hero title
    initTypingAnimation();
    
    // Initialize action buttons
    initActionButtons();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Initialize action buttons functionality
function initActionButtons() {
    // View Experience button
    const viewExperienceBtn = document.querySelector('a[href="#experience"]');
    if (viewExperienceBtn) {
        viewExperienceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('experience');
        });
    }
    
    // View Projects button  
    const viewProjectsBtn = document.querySelector('a[href="#projects"]');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('projects');
        });
    }
    
    // Add print button functionality
    setTimeout(() => {
        const printButton = document.querySelector('.btn:has(.fa-print)');
        if (printButton) {
            printButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.print();
            });
        }
    }, 100);
}

// Helper function to scroll to sections
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update active navigation state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Active navigation link highlighting based on scroll position
function initNavigationHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        const scrollPos = window.scrollY + 120; // Offset for navbar
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').substring(1);
            if (linkHref === currentSection) {
                link.classList.add('active');
            }
        });
        
        // Handle top of page (home section)
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }
    
    // Throttled scroll handler for better performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    updateActiveLink(); // Initial update
}

// Scroll animations for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .education-card, .timeline-item'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Navbar background change on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = `rgba(19, 52, 59, 0.98)`;
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.background = `rgba(19, 52, 59, 0.95)`;
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
}

// Typing animation for hero title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100);
        } else {
            // Add blinking cursor
            setTimeout(() => {
                heroTitle.innerHTML += '<span class="cursor">|</span>';
                
                // Animate cursor blinking
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    setInterval(() => {
                        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                    }, 500);
                }
            }, 500);
        }
    }
    
    // Start typing animation after initial page load
    setTimeout(typeText, 1000);
}

// Skill tag hover effects
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Contact links interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
        
        // Ensure external links open properly
        if (link.href) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// Project cards tilt effect
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
});

// Timeline marker animation
document.addEventListener('DOMContentLoaded', function() {
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 1s ease-in-out infinite';
            }
        });
    }, {
        threshold: 0.5
    });
    
    timelineMarkers.forEach(marker => {
        observer.observe(marker);
    });
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 60px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #218098, #32b8c6);
        z-index: 1001;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
});

// Add particle effect to hero section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #32b8c6;
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${5 + Math.random() * 5}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
});

// Add print functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add print button to hero section
    setTimeout(() => {
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons) {
            const printButton = document.createElement('button');
            printButton.className = 'btn btn--outline';
            printButton.innerHTML = '<i class="fas fa-print"></i> Print Resume';
            printButton.addEventListener('click', function() {
                window.print();
            });
            
            heroButtons.appendChild(printButton);
        }
    }, 100);
});

// Enhanced scroll reveal animations
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll(
        '.hero-content, .summary-card, .section-title'
    );
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });
});

// Add all required animations and styles
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .hero {
            position: relative;
            overflow: hidden;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
            25% { transform: translateY(-10px) translateX(5px) rotate(90deg); }
            50% { transform: translateY(-20px) translateX(-5px) rotate(180deg); }
            75% { transform: translateY(-10px) translateX(3px) rotate(270deg); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(33, 128, 141, 0.4); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); box-shadow: 0 0 0 10px rgba(33, 128, 141, 0); }
        }
        
        .cursor {
            color: #218098;
            font-weight: bold;
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.6s ease-out;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .reveal.hero-content {
            transform: translateY(30px);
        }
        
        .revealed.hero-content {
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});