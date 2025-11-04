document.addEventListener('DOMContentLoaded', () => {
    // === MENU MOBILE ===
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

    // === EFFET DE DÉFILEMENT SUR LA NAVBAR ===
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // === ANIMATIONS AU DÉFILEMENT ===
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const animatedElements = document.querySelectorAll(
        '.hero-content, .about-content, .skill-card, .project-card, .contact-form, .stat-number'
    );

    const fadeUpObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 100);
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

    // === DÉFILEMENT FLUIDE ===
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


// === BOUTON EN/FR ===
const toggleLangBtn = document.getElementById('toggleLang');
let currentLang = 'fr'; // langue actuelle

// Texte français -> anglais
const translations = {
    'Accueil': 'Home',
    'À propos': 'About',
    'Compétences': 'Skills',
    'Projets': 'Projects',
    'Contact': 'Contact',
    'Salut, moi c’est ': 'Hi, I am ',
    'Passion pour la tech, le gaming et la gestion des réseaux sociaux.': 'Passionate about tech, gaming, and social media management.',
    'En savoirs plus': 'Learn More',
    'Me contacter': 'Contact Me',
    'À propos de moi': 'About Me',
    'Je suis passionné par la technologie, la robotique et le développement logiciel. Je m’intéresse également aux jeux vidéo et à la gestion des réseaux sociaux, pour créer des expériences interactives et connectées.':
        'I am passionate about technology, robotics, and software development. I am also interested in video games and social media management, creating interactive and connected experiences.',
    'Mon objectif :': 'My Goal:',
    'Concevoir des solutions élégantes, robustes et fonctionnelles - que ce soit pour le web, les applications mobiles, les projets robotiques et objets connectés, tout en gérant efficacement la communication sur les réseaux sociaux.':
        'Design elegant, robust, and functional solutions – for the web, mobile apps, robotics and IoT projects, while managing social media effectively.',
    'Années d’expérience': 'Years of Experience',
    'Projets livrés': 'Projects Delivered',
    'Clients satisfaits': 'Happy Clients',
    'Mes compétences': 'My Skills',
    'Développement Front-end': 'Front-end Development',
    'Développement Back-end': 'Back-end Development',
    'Conception d’applications de contrôle, création de chatbots et réalisation de robots.': 'Control app design, chatbot creation and robotics projects.',
    'Cloud et IA': 'Cloud & AI',
    'Gestion des Réseaux Sociaux': 'Social Media Management',
    'Projets récents': 'Recent Projects',
    "Site Vitrine d'EMIAPROC - IUT de DOUALA": 'EMIAPROC Showcase Website - IUT of DOUALA',
    'Un site personnel moderne avec animations, transitions et responsive design pour le club robotique de l\'IUT de DOUALA.':
        'A modern personal website with animations, transitions, and responsive design for the IUT of DOUALA robotics club.',
    'Application IoT': 'IoT Application',
    'Contrôle et visualisation de capteurs à distance via une plateforme web.': 'Remote sensor control and visualization via a web platform.',
    'Site e-commerce - Ebooks': 'E-commerce Site - Ebooks',
    'Site de vente en ligne avec gestion des produits, panier et paiement sécurisé.': 'Online store with product management, shopping cart, and secure payment.',
    'Me contacter': 'Contact Me',
    'Discutons ensemble': 'Let’s Talk',
    'Vous avez un projet ou une collaboration en tête ? Laissez-moi un message, et je reviendrai vers vous rapidement.':
        'Do you have a project or collaboration in mind? Leave me a message, and I will get back to you soon.',
    'Envoyez-moi un message': 'Send Me a Message',
    'Nom complet': 'Full Name',
    'Adresse e-mail': 'Email Address',
    'Message': 'Message',
    'Votre nom': 'Your Name',
    'Votre email': 'Your Email',
    'Votre message...': 'Your Message...',
    'Envoyer le message': 'Send Message',
    'Code avec passion et determination.': 'Coding with passion and determination.'
};

toggleLangBtn.addEventListener('click', () => {
    if (currentLang === 'fr') {
        // passer à l’anglais
        currentLang = 'en';
        toggleLangBtn.textContent = 'FR';
        Object.keys(translations).forEach(frenchText => {
            document.body.innerHTML = document.body.innerHTML.replace(frenchText, translations[frenchText]);
        });
    } else {
        // retourner au français
        currentLang = 'fr';
        toggleLangBtn.textContent = 'EN';
        Object.keys(translations).forEach(frenchText => {
            document.body.innerHTML = document.body.innerHTML.replace(translations[frenchText], frenchText);
        });
    }
});
