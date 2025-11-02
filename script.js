document.addEventListener('DOMContentLoaded', () => {
    // === NAVBAR MOBILE ===
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // === ANIMATIONS AU SCROLL ===
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const animatedElements = document.querySelectorAll(
        '.hero-content, .about-content, .skill-card, .project-card, .contact-form, .stat-item'
    );

    const fadeUpObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 100); // effet progressif
                fadeUpObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.classList.add('fade-up-init');
        fadeUpObserver.observe(el);
    });

    // === COMPTEURS ANIMÉS ===
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(element) {
        const targetText = element.textContent.replace(/\D/g, '');
        const target = parseInt(targetText);
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        // effet pulse avant le comptage
        element.classList.add('pulse');
        setTimeout(() => {
            element.classList.remove('pulse');
        }, 400);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // === SCROLL FLUIDE ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === FORMULAIRE DE CONTACT ===
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            // mini animation de confirmation
            contactForm.classList.add('form-sent');
            setTimeout(() => {
                alert(`✅ Merci ${name} ! Votre message a bien été envoyé.`);
                contactForm.reset();
                contactForm.classList.remove('form-sent');
            }, 800);
        } else {
            alert('⚠️ Veuillez remplir tous les champs requis.');
        }
    });
});
