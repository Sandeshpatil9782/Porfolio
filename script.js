document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Overlay & Hamburger
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    let menuOpen = false;

    function toggleMenu() {
        menuOpen = !menuOpen;
        if (menuOpen) {
            hamburger.classList.add('active');
            mobileMenu.classList.add('active');
            navbar.classList.add('menu-open');
            document.body.classList.add('menu-open');
        } else {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            navbar.classList.remove('menu-open');
            document.body.classList.remove('menu-open');
        }
    }

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuOpen) toggleMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMenu();
            }
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuOpen) {
                toggleMenu();
            }
        });
    }

    // 3. Typewriter Effect
    const roles = [
        "Power BI Developer",
        "Data Analyst",
        "Tableau Developer",
        "Excel Expert",
        "Python Developer"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter');
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    setTimeout(typeEffect, 1000);

    // 4. Mouse Tracking for Premium Glow Cards
    const glowCards = document.querySelectorAll('.glow-card');
    
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set CSS variables for the radial gradient
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 5. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: stop observing once animated
                // obs.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    
    const animElements = document.querySelectorAll('.scroll-anim, .timeline-node');
    animElements.forEach(el => observer.observe(el));

    // 6. Tracing Beam Timeline Logic
    const tracingBeamContainers = document.querySelectorAll('.tracing-beam-container');
    
    window.addEventListener('scroll', () => {
        tracingBeamContainers.forEach(container => {
            const beamFill = container.querySelector('.tracing-beam-fill');
            if (!beamFill) return;
            
            const rect = container.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the section we have scrolled through
            // Start animation when the section enters the middle of the screen
            const scrollDistance = (windowHeight / 2) - sectionTop;
            
            let percentage = (scrollDistance / sectionHeight) * 100;
            
            // Clamp percentage between 0 and 100
            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;
            
            beamFill.style.height = `${percentage}%`;
        });
    });

    // 7. Hero Keyword Animation
    const keywords = document.querySelectorAll('.keyword');
    if (keywords.length > 0) {
        setTimeout(() => {
            keywords.forEach((keyword, index) => {
                setTimeout(() => {
                    keyword.classList.add('show');
                }, index * 200);
            });
        }, 600);
    }

    // 8. Generate Subtle Sparkles Background
    const sparklesContainer = document.getElementById('sparkles-container');
    const numSparkles = 40; 

    for (let i = 0; i < numSparkles; i++) {
        createSparkle();
    }

    function createSparkle() {
        if (!sparklesContainer) return;
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = Math.random() * 2 + 1; 
        const delay = Math.random() * 5;
        
        sparkle.style.top = `${top}%`;
        sparkle.style.left = `${left}%`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.animationDelay = `${delay}s`;
        
        sparklesContainer.appendChild(sparkle);
    }

    // 9. Resume Modal Functionality
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtns = document.querySelectorAll('.open-resume-modal');
    const closeResumeBtn = document.getElementById('close-resume-modal');

    if (resumeModal && closeResumeBtn) {
        // Open modal
        openResumeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                resumeModal.classList.add('active');
                document.body.classList.add('no-scroll');
            });
        });

        // Close modal
        const closeModal = () => {
            resumeModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };

        closeResumeBtn.addEventListener('click', closeModal);

        // Close on clicking outside
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // 10. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.dataset.filter;

                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.dataset.category === filterValue) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

    // 11. Certificate Modal Functionality
    const certModal = document.getElementById('cert-modal');
    const closeCertModalBtn = document.getElementById('close-cert-modal');
    const certIframe = document.getElementById('cert-iframe');
    const certDownloadBtn = document.getElementById('download-cert-btn');
    const certModalTitle = document.getElementById('cert-modal-title');
    const certModalSubtitle = document.getElementById('cert-modal-subtitle');
    const viewCertBtns = document.querySelectorAll('.view-cert-btn');

    if (certModal && closeCertModalBtn) {
        viewCertBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const certUrl = btn.getAttribute('data-cert');
                const title = btn.getAttribute('data-title');
                const org = btn.getAttribute('data-org');
                const date = btn.getAttribute('data-date');
                
                if (certUrl) {
                    certIframe.src = certUrl;
                    certDownloadBtn.href = certUrl;
                    certModalTitle.textContent = title || 'Certificate';
                    certModalSubtitle.textContent = (org && date) ? `${org} - ${date}` : (org || date || '');
                    
                    certModal.classList.add('active');
                    document.body.classList.add('no-scroll');
                }
            });
        });

        const closeCertModal = () => {
            certModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
            setTimeout(() => {
                certIframe.src = '';
            }, 300);
        };

        closeCertModalBtn.addEventListener('click', closeCertModal);

        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeCertModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModal.classList.contains('active')) {
                closeCertModal();
            }
        });
    }
});
