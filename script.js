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

// === BOUTON EN/FR OPTIMISÉ ===
const toggleLangBtn = document.getElementById('toggleLang');
let currentLang = 'fr'; // langue actuelle

// Mapping français -> anglais
const translations = [
    // NAVBAR
    { selector: 'a[href="#accueil"]', fr: 'Accueil', en: 'Home' },
    { selector: 'a[href="#apropos"]', fr: 'À propos', en: 'About' },
    { selector: 'a[href="#competences"]', fr: 'Compétences', en: 'Skills' },
    { selector: 'a[href="#projets"]', fr: 'Projets', en: 'Projects' },
    { selector: 'a[href="#contact"]', fr: 'Contact', en: 'Contact' },

    // HERO
    { selector: '.titre-accueil', fr: 'Salut, moi c’est ', en: 'Hi, I am ' }, // texte avant le span
    { selector: '.sous-titre-accueil', fr: 'Passion pour la tech, le gaming et la gestion des réseaux sociaux.', en: 'Passionate about tech, gaming, and social media management.' },
    { selector: '.bouton-principal[href="#projets"]', fr: 'En savoirs plus', en: 'Learn More' },
    { selector: '.bouton-secondaire[href="#contact"]', fr: 'Me contacter', en: 'Contact Me' },

    // À PROPOS
    { selector: '#apropos .section-title', fr: 'À propos de moi', en: 'About Me' },
    { selector: '.texte-a-propos p:first-of-type', fr: "Je suis passionné par la technologie, la robotique et le développement logiciel.\nJ’aime transformer des idées innovantes en projets concrets, tels que la construction de robots, la création de Chatbots et le développement d’applications, tout en combinant créativité et expertise digitale.\nJe m’intéresse également aux jeux vidéo et à la gestion des réseaux sociaux, pour créer des expériences interactives et connectées.", en: "I am passionate about technology, robotics, and software development. I enjoy transforming innovative ideas into real projects, such as building robots, creating chatbots, and developing applications, combining creativity and digital expertise. I am also interested in video games and social media management to create interactive and connected experiences." },
    { selector: '.texte-a-propos p b', fr: 'Mon objectif :', en: 'My Goal:' },
    { selector: '.texte-a-propos p:last-of-type', fr: 'Concevoir des solutions élégantes, robustes et fonctionnelles - que ce soit pour le web, les applications mobiles, les projets robotiques et objets connectés, tout en gérant efficacement la communication sur les réseaux sociaux.', en: 'Design elegant, robust, and functional solutions – for the web, mobile apps, robotics, and IoT projects, while managing social media effectively.' },

    { selector: '.etiquette-stat:nth-of-type(1)', fr: 'Années d’expérience', en: 'Years of Experience' },
    { selector: '.etiquette-stat:nth-of-type(2)', fr: 'Projets livrés', en: 'Projects Delivered' },
    { selector: '.etiquette-stat:nth-of-type(3)', fr: 'Clients satisfaits', en: 'Happy Clients' },

    // COMPÉTENCES
    { selector: '#competences .section-title', fr: 'Mes compétences', en: 'My Skills' },
    { selector: '.carte-competence:nth-of-type(1) .titre-competence', fr: 'Développement Front-end', en: 'Front-end Development' },
    { selector: '.carte-competence:nth-of-type(2) .titre-competence', fr: 'Développement Back-end', en: 'Back-end Development' },
    { selector: '.carte-competence:nth-of-type(3) .titre-competence', fr: 'Conception d’applications de contrôle, création de chatbots et réalisation de robots.', en: 'Control app design, chatbot creation, and robotics projects.' },
    { selector: '.carte-competence:nth-of-type(4) .titre-competence', fr: 'Cloud et IA', en: 'Cloud & AI' },
    { selector: '.carte-competence:nth-of-type(5) .titre-competence', fr: 'Gestion des Réseaux Sociaux', en: 'Social Media Management' },

    // PROJETS
    { selector: '#projets .section-title', fr: 'Projets récents', en: 'Recent Projects' },
    { selector: '.carte-projet:nth-of-type(1) .project-title', fr: "Site Vitrine d'EMIAPROC - IUT de DOUALA", en: 'EMIAPROC Showcase Website - IUT of DOUALA' },
    { selector: '.carte-projet:nth-of-type(1) .project-description', fr: "Un site personnel moderne avec animations, transitions et responsive design pour le club robotique de l'IUT de DOUALA.", en: 'A modern personal website with animations, transitions, and responsive design for the IUT of DOUALA robotics club.' },
    { selector: '.carte-projet:nth-of-type(2) .project-title', fr: 'Application IoT', en: 'IoT Application' },
    { selector: '.carte-projet:nth-of-type(2) .project-description', fr: 'Contrôle et visualisation de capteurs à distance via une plateforme web.', en: 'Remote sensor control and visualization via a web platform.' },
    { selector: '.carte-projet:nth-of-type(3) .project-title', fr: 'Site e-commerce - Ebooks', en: 'E-commerce Site - Ebooks' },
    { selector: '.carte-projet:nth-of-type(3) .project-description', fr: 'Site de vente en ligne avec gestion des produits, panier et paiement sécurisé.', en: 'Online store with product management, shopping cart, and secure payment.' },

    // CONTACT
    { selector: '#contact .section-title', fr: 'Me contacter', en: 'Contact Me' },
    { selector: '.info-contact h3', fr: 'Discutons ensemble', en: 'Let’s Talk' },
    { selector: '.info-contact p:first-of-type', fr: 'Vous avez un projet ou une collaboration en tête ? Laissez-moi un message,\net je reviendrai vers vous rapidement.', en: 'Do you have a project or collaboration in mind? Leave me a message and I will get back to you soon.' },
    { selector: '.formulaire-contact h3', fr: 'Envoyez-moi un message', en: 'Send Me a Message' },
    { selector: 'label[for="name"]', fr: 'Nom complet', en: 'Full Name' },
    { selector: 'label[for="email"]', fr: 'Adresse e-mail', en: 'Email Address' },
    { selector: 'label[for="message"]', fr: 'Message', en: 'Message' },
    { selector: '#name', fr: 'Votre nom', en: 'Your Name' },
    { selector: '#email', fr: 'Votre email', en: 'Your Email' },
    { selector: '#message', fr: 'Votre message...', en: 'Your Message...' },
    { selector: '.btn-full', fr: 'Envoyer le message', en: 'Send Message' },

    // FOOTER
    { selector: '.pied-page p', fr: 'Code avec passion et determination.', en: 'Coding with passion and determination.' }
];

// Fonction pour changer la langue
function changeLanguage(lang) {
    translations.forEach(item => {
        if (item.selector === '.titre-accueil') {
            const titreAccueil = document.querySelector('.titre-accueil');
            const spanNom = titreAccueil.querySelector('.surligne');
            if (titreAccueil && spanNom) {
                // ne changer que le texte avant le span
                titreAccueil.firstChild.textContent = lang === 'fr' ? item.fr : item.en;
            }
        } else {
            const el = document.querySelector(item.selector);
            if (el) {
                el.textContent = lang === 'fr' ? item.fr : item.en;
            }
        }
    });
}

// Événement du bouton
toggleLangBtn.addEventListener('click', () => {
    if (currentLang === 'fr') {
        currentLang = 'en';
        toggleLangBtn.textContent = 'FR';
        changeLanguage('en');
    } else {
        currentLang = 'fr';
        toggleLangBtn.textContent = 'EN';
        changeLanguage('fr');
    }
});
